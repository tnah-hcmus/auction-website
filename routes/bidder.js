var express = require('express');
const bidderModel = require('../models/bidder.model');
var router = express.Router();
var session      = require('express-session')
var passport     = require('passport');
var bcrypt = require('bcryptjs');
var moment = require('moment');
const guestModel = require('../models/guest.model');
var mail = require('../utils/mail-server.js');

router.post('/bidder-wonproduct/reviewLike', async(req, res, next) => {
     const user=req.session.user;
    var idSeller = req.body.id_seller;
    var review = req.body.review;
    var status = req.body.status;
     console.log("review ne");
    console.log(idSeller);
    console.log(review);
    console.log(status);
    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    var result = await bidderModel.insertReview(idSeller, user.id, review, now, status);
    res.send('true');
});

router.post('/bidder-wonproduct/reviewDislike', async(req, res, next) => {
    const user=req.session.user;
    var idSeller = String(req.body.id_seller);
    var review = String(req.body.review);
    var status = String(req.body.status);
    console.log("review ne");
    console.log(idSeller);
    console.log(review);
    console.log(status);
    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    var result = await bidderModel.insertReview(idSeller, user.id, review,now, status);
    res.send('true');
});

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
        pages: Math.ceil(length.length/dataPerPage),
        logged: req.isLogged
    });
});

router.get('/bidder-detail-product/', async(req,res) => {
  const user=req.session.user;
  const id = String(req.query.id);
  const categoryList = await bidderModel.getListCategory();
  var filter = String(req.query.filter);
  if (filter == 'undefined') filter = 'name';
  console.log("day ne "+ id);
  var result = await bidderModel.getProductbyID(id);
    const one = JSON.parse(JSON.stringify(result))[0];
  result = await bidderModel.getOwnerbyID(id);  
    const seller = JSON.parse(JSON.stringify(result))[0];
    var items = await bidderModel.getRelateItembyID(id);
  var now = moment();
  var start = one.dateStart;
  var end = one.dateEnd;
  one.dayStart = now.diff(start,'days');
  one.hourStart = now.diff(start, 'hours') - one.dayStart*24;
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
        filter: filter,
        logged: req.isLogged
    });
});

//List of product page
router.get('/list-view/:page', async(req, res, next) => {
    const user = req.session.user;
    var catID = String(req.query.category);
    var search = String(req.query.search);
    if (search == 'undefined') search = 'name';
    const categoryList = await bidderModel.getListCategory();
    var dataPerPage = 12;
    var page = req.params.page || 1;
    var skip = dataPerPage*(page - 1);
    switch(catID)
    {
        case 'laptop':
            catID = 4;
            var items = await bidderModel.getProductbyCategory(catID, dataPerPage, skip);
            var result = await bidderModel.getInfoCategory(catID);
            var category = JSON.parse(JSON.stringify(result))[0];
            break;
        case 'smartphone':
            catID= 5;
            var items = await bidderModel.getProductbyCategory(catID, dataPerPage, skip);
            var result = await bidderModel.getInfoCategory(catID);
            var category = JSON.parse(JSON.stringify(result))[0];
            break;
        case 'all':
            var items =  await bidderModel.getAllProduct(dataPerPage, skip);
            var numPro = await bidderModel.getNumProduct();
            var json = JSON.parse(JSON.stringify(numPro));
            var category = {name: 'Tất cả sản phẩm', description: 'Tất cả các sản phẩm hiện có', length: json[0].num};
            break;
        default:
            var items = await bidderModel.getProductbyCategory(catID, dataPerPage, skip);
            var result = await bidderModel.getInfoCategory(catID);
            var category = JSON.parse(JSON.stringify(result))[0];
    }
  var recent = 3600;
    res.render('bidder-views/bidder-list-view', { 
        user: user,
        category: category,
        filter: search,
        list: items,
        catList: categoryList,
        catID: catID,
        current: page,
        pages: Math.ceil(category.length/dataPerPage),
        recent: recent,
        logged: req.isLogged
    });
});


router.post('/bidder-detail-product/Bid', async(req, res) => {
  const user=req.session.user;
  const productId = String(req.body.productId);
  var temp3= await bidderModel.getProductbyID(productId);
  var price = String(req.body.price);
  var maxPrice = String(req.body.maxPrice);
  maxPrice = parseInt(maxPrice);
  var exist = await bidderModel.checkExistAuto(productId);
  console.log(exist);
  if (exist[0].bool == 1) 
  {
        var result = await bidderModel.getAutoBid(productId);
        var bidder = result[0].id_bidder;
        var maxAuto = result[0].max_price;
  }
  else
  {
        var maxAuto = 0;
        var bidder = user.id;
        var insert = await bidderModel.insertAutoBid(productId, bidder, maxAuto);
  }
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
   if (product.auctioned == 0)
   {
    if (point>=80 || temp==0)
     {
        if (price>product.price)
        {
            product.auctionTime+=1;
            if(price>=product.buynow)
            {
                var update = await bidderModel.BuyNowProduct(user.id,productId,price,product.auctionTime);
                var biding = await bidderModel.updateBiddingList(user.id,productId,price,now);
                var product = await guestModel.getProductbyID(productId);
                var info = { // thiết lập đối tượng, nội dung gửi mail
                    from: 'Hello Auction',
                    to: String(user.username),
                    subject: 'Success buy',
                    text: 'Buy success ' + String(product[0].name),
                }
            }
            else
            {
                var biding = await bidderModel.updateBiddingList(user.id,productId,price,now);
            
                if(maxPrice > maxAuto)
                {
                    var update = await bidderModel.updateAutoBid(productId, user.id, maxPrice);
                    if (maxAuto != 0)
                    {

                        var biding = await bidderModel.updateBiddingList(bidder,productId,maxAuto,now);
                        if (price < maxPrice && price < maxAuto) 
                            price = maxAuto + temp3[0].bidStep;
                        var biding = await bidderModel.updateBiddingList(user.id,productId,price,now);
                    }
                    var update = await bidderModel.BidProduct(user.id,productId,price,product.auctionTime);
                }
                else
                {
                    price =  maxPrice + temp3[0].bidStep;
                    var biding = await bidderModel.updateBiddingList(bidder,productId,price,now);
                    var update = await bidderModel.BidProduct(bidder,productId,price,product.auctionTime);
                }
                var product = await guestModel.getProductbyID(productId);
                var info = { // thiết lập đối tượng, nội dung gửi mail
                    from: 'Hello Auction',
                    to: String(user.username),
                    subject: 'Success bid',
                    text: 'Bid ' + String(product[0].name),
                }
            }
            var sender = new mail(info);
            sender.send();
        res.send('true');
        }
        else
        {
             res.send('falsePrice');
        }
        
     }
    else
    {
        res.send('falsePoint');
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
    var userReq =req.session.user;
    var json = await bidderModel.getCountRequestToSeller(userReq.id);
    
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log(count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addRequestToSeller(userReq.id);
        res.send('true');
    }
    else
    {
        res.send('false');
    }    
});

router.post('/bidder-wonproduct/request', async(req,res) => {
    var userReq =req.session.user;
    var json = await bidderModel.getCountRequestToSeller(userReq.id);
    
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log(count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addRequestToSeller(userReq.id);
        res.send('true');
    }
    else
    {
        res.send('false');
    }    
});

router.post('/bidder-review/request', async(req,res) => {
   var userReq =req.session.user;
    var json = await bidderModel.getCountRequestToSeller(userReq.id);
    
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log(count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addRequestToSeller(userReq.id);
        res.send('true');
    }
    else
    {
        res.send('false');
    }    
});

router.post('/bidder-watchlist/request', async(req,res) => {
    var userReq =req.session.user;
    var json = await bidderModel.getCountRequestToSeller(userReq.id);
    
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log(count.count);
    if (count.count < 1)
    {    
        var insert = await bidderModel.addRequestToSeller(userReq.id);
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
    var user= req.session.user;
    console.log(user);
    var productId = String(req.body.productId);
    var json = await bidderModel.getCountWatchListProduct(user.id,productId); 
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log("watch list add"+count.count);
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

router.post('/bidder-bidding/addWatchList', async(req,res) => {
   var user= req.session.user;
    console.log(user);
    var productId = String(req.body.productId);
    var json = await bidderModel.getCountWatchListProduct(user.id,productId); 
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log("watch list add"+count.count);
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

router.post('/bidder-wonproduct/addWatchList', async(req,res) => {
    var user= req.session.user;
    console.log(user);
    var productId = String(req.body.productId);
    var json = await bidderModel.getCountWatchListProduct(user.id,productId); 
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log("watch list add"+count.count);
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

router.post('/bidder-review/addWatchList', async(req,res) => {
   var user= req.session.user;
    console.log(user);
    var productId = String(req.body.productId);
    var json = await bidderModel.getCountWatchListProduct(user.id,productId); 
    var count = JSON.parse(JSON.stringify(json))[0];
    console.log("watch list add"+count.count);
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

router.get('/review/:page', async(req, res, next) =>{
 var id = req.query.id;
 var user = req.session.user;
 var temp1 = await bidderModel.getBidderbyID(id);
 var user1 = JSON.parse(JSON.stringify(temp1))[0];
 const category = await bidderModel.getListCategory();
 var filter = 'name';
 var dataPerPage = 9;
 var page = req.params.page || 1;
 var skip = dataPerPage*(page - 1);
 json = await bidderModel.getTotalLike(id);
 var totalLike =  JSON.parse(JSON.stringify(json))[0];
 var result = await bidderModel.getTotalDislike(id);
 var totalDislike =  JSON.parse(JSON.stringify(result))[0];
 var temp = totalLike.totalLike + totalDislike.totalDisLike;
 var point =  totalLike.totalLike + "/" +  temp;
 var percentLike = (totalLike.totalLike/temp)*100;
 var percentDislike = 100-percentLike;
 var review = await bidderModel.getReviewList(id, dataPerPage, skip); 
 var temp1 = await bidderModel.getLengthReviewList(id);
 var length =  JSON.parse(JSON.stringify(temp1))[0];
 console.log(user);
 console.log(page);
 console.log(skip);
 var filter = 'name';
 res.render('bidder-views/bidder-userReview', {
        catList: category,
        reviews: review,
        user: user,
        user1:user1,
        uid: id,
        totalLike: totalLike, 
        totalDislike: totalDislike,
        point: point,
        filter: filter,
        percentLike: percentLike,
        percentDislike: percentDislike,
        current: page,
        pages: Math.ceil(length.length/dataPerPage),
        logged: req.isLogged
    });
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
        pages: Math.ceil(length.length/dataPerPage),
        logged: req.isLogged
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
        pages: Math.ceil(length.length/dataPerPage),
        logged: req.isLogged
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
        pages: Math.ceil(length.length/dataPerPage),
        logged: req.isLogged
    });
});

router.get('/bidder-account-setting', async(req, res, next)=> {
 var user = req.session.user;
  console.log("get account settign userId " +user.id);
 const category = await bidderModel.getListCategory();
 var filter ='name';
  res.render('bidder-views/bidder-account-setting', {
        catList: category,
        user: user,
        filter: filter,
        logged: req.isLogged
    });
});

router.post('/bidder-account-setting/updateInfo', async(req, res, next)=> {
 var user = req.session.user;
 var name = req.body.name;
 var phone = req.body.phone;
 var email = req.body.email;
 var date = req.body.date;
 console.log("id here "+ user.id);
 var dateUpdate = date.substring(6,10) +'-'+ date.substring(3,5) +'-' + date.substring(0,2)
 console.log("server" + name+"  " +phone + "  " +email + "  " +dateUpdate);
 var update = await bidderModel.updateInfo(user.id,name,email,phone,dateUpdate);
 res.send('true');
 res.redirect('/bidder-watchlist/1');

});


router.post('/bidder-account-setting/updatePass', async(req, res, next)=> {
 var user = req.session.user;
 var currentPass = req.body.currentPass;
 var newPass = req.body.newPass;
 var newPass2 = req.body.newPass;
 var json = await bidderModel.getCurrentPass(user.id);
 var userPass = JSON.parse(JSON.stringify(json))[0];
 console.log("id here "+ user.id);
 console.log("current pass" + currentPass);
 console.log("fr server" + userPass.password+"  " +currentPass + "  " +newPass + "  " +newPass2);
 if (bcrypt.compareSync(currentPass, userPass.password)){
    if (newPass===newPass2)
         {
            newPass = bcrypt.hashSync(newPass, bcrypt.genSaltSync(10), null);
            var update = await bidderModel.updatePass(user.id,newPass);
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

//Homepage
router.get(/\/index|\//, async(req, res, next) => {
 try {
    const user=req.session.user;
    const faqs = await bidderModel.faq();
    const category = await bidderModel.getListCategory();
    const type = String(req.query.sort);
    var search = String(req.query.search);
    if (search == 'undefined') search = 'name';
    var nearest = '';
    var hottest = '';
    var highest = '';
    var best = '';
    switch(type) 
    {
        case 'nearest':
            var items = await bidderModel.topNearestAuction();
            nearest = 'active';
            break;
        case 'hottest':
            var items = await bidderModel.topAuctionTime();
            hottest = 'active';
            break;
        case 'best':
            var items = await bidderModel.topDeAuctionPrice();
            best = 'active';
            break;
        default:
            var items = await bidderModel.topAuctionPrice();
            highest = 'active';
    } 
    res.render('bidder-views/bidder-index', {
        user:user,
        items: items,
        faqs:faqs,
        nearest:nearest,
        highest:highest,
        hottest:hottest,
        best:best,
        catList:category,
        filter: search,
        logged: req.isLogged
    });
  } catch (err) {
    console.log(err);
    res.end('View error log in console.');
  }
});

module.exports = router;