var express = require('express');
const bidderModel = require('../models/bidder.model');
var router = express.Router();
var session      = require('express-session')
var passport     = require('passport');
var bcrypt = require('bcryptjs');
var moment = require('moment');

//bidding product   
router.get('/bidder-bidding/:page', async(req, res, next) => {
 var user = req.session.user;
 const category = await bidderModel.getListCategory();
 console.log("tui here");
 console.log(req.session.user);
 console.log(user.id);
 var filter = 'name';
 var dataPerPage = 9;
 var page = req.params.page || 1;
 var skip = dataPerPage*(page - 1);
 json = await bidderModel.getTotalLike(user.id);
 var totalLike =  JSON.parse(JSON.stringify(json))[0];
 var result = await bidderModel.getTotalDislike(user.id);
 var totalDislike =  JSON.parse(JSON.stringify(result))[0];
 var temp = totalLike.totalLike + totalDislike.totalDisLike;
 var point =  totalLike.totalLike + "/" +  temp;
 var percentLike = (totalLike.totalLike/temp)*100;
 var percentDislike = 100-percentLike;
 var item = await bidderModel.getBiddingList(user.id, dataPerPage, skip);
 var temp1 = await bidderModel.getLengthBiddingList(user.id);
 var length =  JSON.parse(JSON.stringify(temp1))[0];
 console.log(dataPerPage);
 console.log(page);
 console.log(length.length);
 var filter = 'name';
 res.render('bidder-views/bidder-bidding', {
        catList: category,
        items: item,
        user: user,
        totalLike: totalLike, 
        totalDislike: totalDislike,
        point: point,
        filter: filter,
        percentLike: percentLike,
        percentDislike: percentDislike,
        current: page,
        pages: Math.ceil(length.length/dataPerPage)
    });
});

router.get('/bidder-detail-product/', async(req,res) => {
  const user=req.session.user;
  const id = String(req.query.id);
  console.log("tui ne "+id);
  const categoryList = await bidderModel.getListCategory();
  var filter = String(req.query.filter);
  if (filter == 'undefined') filter = 'name';
  var result = await bidderModel.getProductbyID(id);
    const one = JSON.parse(JSON.stringify(result))[0];
  result = await bidderModel.getOwnerbyID(id);  
    const seller = JSON.parse(JSON.stringify(result))[0];
    var items = await bidderModel.getRelateItembyID(id);
  var now = moment();
  var start = one.dateStart;
  var end = one.dateEnd;
  one.dayStart = now.diff(start,'days');
  one.hourStart = now.diff(start, 'hours'); - one.dayStart*24;
  one.minStart = now.diff(start, 'minutes') - one.hourStart*60 - one.dayStart*24*60;
  one.dayEnd = -now.diff(end,'days');
  one.hourEnd = -now.diff(end, 'hours') - one.dayEnd*24;
  one.minEnd = -now.diff(end, 'minutes') - one.hourEnd*60 - one.dayEnd*24*60;
  var nextStep = one.price+one.bidStep; 
  var history = await bidderModel.getHistory(id);
    var json = await bidderModel.getTotalLike(user.id);
    var totalLike =  JSON.parse(JSON.stringify(json))[0];
    var result = await bidderModel.getTotalDislike(user.id);
    var totalDislike =  JSON.parse(JSON.stringify(result))[0];
    var temp = totalLike.totalLike + totalDislike.totalDisLike;
    var point =  totalLike.totalLike + "/" +  temp;
    var percentLike = (totalLike.totalLike/temp)*100;
    var percentDislike = 100-percentLike;
    res.render('bidder-views/bidder-detail-product', { 
        user: user,
        product: one,
        point: point,
        lists: history,
        nextStep: nextStep,
        catList: categoryList,
        own: seller,
        relateItems: items,
        filter: filter
    });
});


router.post('/bidder-detail-product/Bid', async(req,res) => {
  const user=req.session.user;
  const productId = String(req.body.productId);
  const price = String(req.body.price);
  console.log(price +" gui roi ne "+productId );
  var temp1= await bidderModel.getProductbyID(productId);
  var product = JSON.parse(JSON.stringify(temp1))[0];
  console.log(product);
    var json = await bidderModel.getTotalLike(user.id);
    var totalLike =  JSON.parse(JSON.stringify(json))[0];
    var result = await bidderModel.getTotalDislike(user.id);
    var totalDislike =  JSON.parse(JSON.stringify(result))[0];
    var temp = totalLike.totalLike + totalDislike.totalDisLike;
    var point;
    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(now);
    if (temp==0) 
        point =0
    else 
        point =  (totalLike.totalLike/temp)*100;
    console.log("diem" + point);
   if (product.auctioned == 0)
   {
    if (point>=80 || point==0)
     {
        if (price>product.price)
        {
            product.auctionTime+=1;
            console.log(price);
            console.log(product.price);
            var update = await bidderModel.BidProduct(user.id,productId,price,product.auctionTime);
            var biding = await bidderModel.updateBiddingList(user.id,productId,price,now);
            res.send('true');
            res.redirect('/bidder/bidder-detail-product/?id='+productId);
        }
        else
        {
             res.send('falsePrice');
        }
        
     }
    else
    {
        res.send('false');
    } 
   }
   else {
     res.send('auctioned');
   }

   
  
});

router.post('/bidder-detail-product/buynow', async(req,res) => {
  const user=req.session.user;
  const productId = String(req.body.productId);
  console.log(" gui roi buynow "+productId );
  var temp1= await bidderModel.getProductbyID(productId);
  var product = JSON.parse(JSON.stringify(temp1))[0];
  console.log(product);
  var now = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(now);
   if (product.auctioned == 0)
   {
   
            product.auctionTime+=1;
            console.log(product.price);
            var update = await bidderModel.BuyNowProduct(user.id,productId,product.buynow,product.auctionTime);
            var biding = await bidderModel.updateBiddingList(user.id,productId,product.buynow,now);
            res.send('true');
            res.redirect('/bidder/bidder-detail-product/?id='+productId);
   
   }
   else {
     res.send('auctioned');
   }

   
  
});


router.post('/bidder-bidding/request', async(req,res) => {
    var userReq = String(req.body.userid);
    var json = await bidderModel.getCountRequestToSeller(userReq);
    
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log(count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addRequestToSeller(userReq);
        res.send('true');
    }
    else
    {
        res.send('false');
    }    
});

router.post('/bidder-wonproduct/request', async(req,res) => {
    var userReq = String(req.body.userid);
    var json = await bidderModel.getCountRequestToSeller(userReq);
    
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log(count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addRequestToSeller(userReq);
        res.send('true');
    }
    else
    {
        res.send('false');
    }    
});

router.post('/bidder-review/request', async(req,res) => {
    var userReq = String(req.body.userid);
    var json = await bidderModel.getCountRequestToSeller(userReq);
    
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log(count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addRequestToSeller(userReq);
        res.send('true');
    }
    else
    {
        res.send('false');
    }    
});

router.post('/bidder-watchlist/request', async(req,res) => {
    var userReq = String(req.body.userid);
    var json = await bidderModel.getCountRequestToSeller(userReq);
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log(count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addRequestToSeller(userReq);
        res.send('true');
    }
    else
    {
        res.send('false');
    }    
});

router.post('/bidder-detail-product/addWatchList', async(req,res) => {
    var user= req.session.user;
    console.log(user);
    var productId = String(req.body.productId);
     console.log(productId);
    var json = await bidderModel.getCountWatchListProduct(user.id,productId); 
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log("tui o day" + count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addWatchList(user.id,productId);
        res.send('true');
    }
    else
    {
        res.send('false');
    }  
});

router.post('/bidder-watchlist/addWatchList', async(req,res) => {
    var userId= String(req.body.userId);
    var productId = String(req.body.productId);
    var json = await bidderModel.getCountWatchListProduct(userId,productId); 
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log("watch list add"+count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addWatchList(userId,productId);
        res.send('true');
    }
    else
    {
        res.send('false');
    }  
});

router.post('/bidder-bidding/addWatchList', async(req,res) => {
    var userId= String(req.body.userId);
    var productId = String(req.body.productId);
    console.log(userId+"  "+ productId);
    var json = await bidderModel.getCountWatchListProduct(userId,productId); 
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log(count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addWatchList(userId,productId);
        res.send('true');
    }
    else
    {
        res.send('false');
    }  
});

router.post('/bidder-wonproduct/addWatchList', async(req,res) => {
    var userId= String(req.body.userId);
    var productId = String(req.body.productId);
    var json = await bidderModel.getCountWatchListProduct(userId,productId); 
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log(count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addWatchList(userId,productId);
        res.send('true');
    }
    else
    {
        res.send('false');
    }  
});

router.post('/bidder-review/addWatchList', async(req,res) => {
    var userId= String(req.body.userId);
    var productId = String(req.body.productId);
    var json = await bidderModel.getCountWatchListProduct(userId,productId); 
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log(count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addWatchList(userId,productId);
        res.send('true');
    }
    else
    {
        res.send('false');
    }  
});

router.get('/bidder-watchlist/:page', async(req, res, next) => {
 var user = req.session.user;
 const category = await bidderModel.getListCategory();
 console.log("tui here");
 console.log(req.session.user);
 console.log(user.id);
 var filter = 'name';
 var dataPerPage = 9;
 var page = req.params.page || 1;
 var skip = dataPerPage*(page - 1);
 json = await bidderModel.getTotalLike(user.id);
 var totalLike =  JSON.parse(JSON.stringify(json))[0];
 var result = await bidderModel.getTotalDislike(user.id);
 var totalDislike =  JSON.parse(JSON.stringify(result))[0];
 var temp = totalLike.totalLike + totalDislike.totalDisLike;
 var point =  totalLike.totalLike + "/" +  temp;
 var percentLike = (totalLike.totalLike/temp)*100;
 var percentDislike = 100-percentLike;
  console.log(dataPerPage);
 console.log(page);
 console.log(skip);
 var item = await bidderModel.getWatchList(user.id, dataPerPage, skip);
 var temp1 = await bidderModel.getLengthWatchList(user.id);
 var length =  JSON.parse(JSON.stringify(temp1))[0];
 res.render('bidder-views/bidder-watchlist', {
        catList: category,
        items: item,
        user: user,
        totalLike: totalLike, 
        totalDislike: totalDislike,
        point: point,
        filter: filter,
        percentLike: percentLike,
        percentDislike: percentDislike,
        current: page,
        pages: Math.ceil(length.length/dataPerPage)
    });
});

router.get('/bidder-wonproduct/:page', async(req, res, next)=> {
 var user = req.session.user;
 const category = await bidderModel.getListCategory();
 console.log("tui here");
 console.log(req.session.user);
 console.log(user.id);
 var filter = 'name';
 var dataPerPage = 9;
 var page = req.params.page || 1;
 var skip = dataPerPage*(page - 1);
 json = await bidderModel.getTotalLike(user.id);
 var totalLike =  JSON.parse(JSON.stringify(json))[0];
 var result = await bidderModel.getTotalDislike(user.id);
 var totalDislike =  JSON.parse(JSON.stringify(result))[0];
 var temp = totalLike.totalLike + totalDislike.totalDisLike;
 var point =  totalLike.totalLike + "/" +  temp;
 var percentLike = (totalLike.totalLike/temp)*100;
 var percentDislike = 100-percentLike;
 var item = await bidderModel.getWonProductList(user.id, dataPerPage, skip);
 var temp1 = await bidderModel.getLengthWonProductList(user.id);
 var length =  JSON.parse(JSON.stringify(temp1))[0];
 console.log(dataPerPage);
 console.log(page);
 console.log(skip);
 var filter = 'name';
 res.render('bidder-views/bidder-wonproduct', {
        catList: category,
        items: item,
        user: user,
        totalLike: totalLike, 
        totalDislike: totalDislike,
        point: point,
        filter: filter,
        percentLike: percentLike,
        percentDislike: percentDislike,
        current: page,
        pages: Math.ceil(length.length/dataPerPage)
    });
});

router.get('/bidder-review/:page', async(req, res, next) =>{
     var user = req.session.user;
 const category = await bidderModel.getListCategory();
 console.log("tui here");
 console.log(req.session.user);
 console.log(user.id);
 var filter = 'name';
 var dataPerPage = 9;
 var page = req.params.page || 1;
 var skip = dataPerPage*(page - 1);
 json = await bidderModel.getTotalLike(user.id);
 var totalLike =  JSON.parse(JSON.stringify(json))[0];
 var result = await bidderModel.getTotalDislike(user.id);
 var totalDislike =  JSON.parse(JSON.stringify(result))[0];
 var temp = totalLike.totalLike + totalDislike.totalDisLike;
 var point =  totalLike.totalLike + "/" +  temp;
 var percentLike = (totalLike.totalLike/temp)*100;
 var percentDislike = 100-percentLike;
 var review = await bidderModel.getReviewList(user.id, dataPerPage, skip); 
 var temp1 = await bidderModel.getLengthReviewList(user.id);
 var length =  JSON.parse(JSON.stringify(temp1))[0];
 console.log(dataPerPage);
 console.log(page);
 console.log(skip);
 var filter = 'name';
 res.render('bidder-views/bidder-review', {
        catList: category,
        reviews: review,
        user: user,
        totalLike: totalLike, 
        totalDislike: totalDislike,
        point: point,
        filter: filter,
        percentLike: percentLike,
        percentDislike: percentDislike,
        current: page,
        pages: Math.ceil(length.length/dataPerPage)
    });
});

router.get('/bidder-account-setting', async(req, res, next)=> {
 const userId= String(req.query.id);
  console.log("get account settign userId " +userId);
 const category = await bidderModel.getListCategory();
 var filter ='name';
 var json = await bidderModel.getBidderbyID(userId);
 var user = JSON.parse(JSON.stringify(json))[0];
 console.log("get account settign " + user);
  res.render('bidder-views/bidder-account-setting', {
        catList: category,
        user: user,
        uid: userId,
        filter: filter
    });
});

router.post('/bidder-account-setting/updateInfo', async(req, res, next)=> {
 var userId= req.body.userId;
 var name = req.body.name;
 var phone = req.body.phone;
 var email = req.body.email;
 var date = req.body.date;
 console.log("id here "+ userId);
 var dateUpdate = date.substring(6,10) +'-'+ date.substring(3,5) +'-' + date.substring(0,2)
 console.log("server" + name+"  " +phone + "  " +email + "  " +dateUpdate);
 var update = await bidderModel.updateInfo(userId,name,email,phone,dateUpdate);
 res.send('true');
 res.redirect('/bidder-watchlist/1');

});


router.post('/bidder-account-setting/updatePass', async(req, res, next)=> {
 var userId= req.body.userId;
 var currentPass = req.body.currentPass;
 var newPass = req.body.newPass;
 var newPass2 = req.body.newPass;
 var json = await bidderModel.getCurrentPass(userId);
 var userPass = JSON.parse(JSON.stringify(json))[0];
 console.log("id here "+ userId);
 console.log("current pass" + currentPass);
 console.log("fr server" + userPass.password+"  " +currentPass + "  " +newPass + "  " +newPass2);
 if (bcrypt.compareSync(currentPass, userPass.password)){
    if (newPass===newPass2)
         {
            newPass = bcrypt.hashSync(newPass, bcrypt.genSaltSync(10), null);
            var update = await bidderModel.updatePass(userId,newPass);
            res.send('0');
         }
    else{
        res.send('1'); 
    }
 }
 else
    res.send('2');
   
 res.redirect('/bidder-watchlist/1');

});

//bidding product   
router.get('/', async(req, res, next)=> {
    const category = await bidderModel.getListCategory();
 var items = [
        { name: 'Laptop A', tag: 'chart-item-1', imgID:'01', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop B', tag: 'chart-item-2', imgID:'02', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}, 
        { name: 'Laptop C', tag: 'chart-item-3', imgID:'03', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop D', tag: 'chart-item-4', imgID:'04', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop E', tag: 'chart-item-5', imgID:'05', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}
    ];
var user = { name: 'Tuyết Chung',point :"5/10",totalLike: "50",totalDislike: "100"};
    res.render('bidder-views/bidder-bidding', {
        catList: category,
        list: items,
        user: user
    });
});

module.exports = router;
