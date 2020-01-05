var express = require('express');
const bidderModel = require('../models/bidder.model');
var router = express.Router();
var bcrypt = require('bcryptjs');

//bidding product   
router.get('/bidder-bidding/:page', async(req, res, next) => {
 var userID = String(req.query.id);
 const category = await bidderModel.getListCategory();
 var dataPerPage = 9;
 var page = req.params.page || 1;
 var skip = dataPerPage*(page - 1);
 var item = await bidderModel.getBiddingList(userID, dataPerPage, skip);
 var json = await bidderModel.getBidderbyID(userID);
 var user = JSON.parse(JSON.stringify(json))[0];
 json = await bidderModel.getTotalLike(userID);
 var totalLike =  JSON.parse(JSON.stringify(json))[0];
 var result = await bidderModel.getTotalDislike(userID);
 var totalDislike =  JSON.parse(JSON.stringify(result))[0];

 var temp = totalLike.totalLike + totalDislike.totalDisLike;
 var point =  totalLike.totalLike + "/" +  temp;
 var percentLike = (totalLike.totalLike/temp)*100;
 var percentDislike = 100-percentLike;
 var temp1 = await bidderModel.getLengthBiddingList(userID);
 var length =  JSON.parse(JSON.stringify(temp1))[0];
 console.log(dataPerPage);
 console.log(page);
 console.log(length.length);
 var filter = 'name';
 res.render('bidder-views/bidder-bidding', {
        catList: category,
        items: item,
        user: user,
        uid: userID,
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

router.post('/bidder-watchlist/addWatchList', async(req,res) => {
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
 var userID = String(req.query.id);
 const category = await bidderModel.getListCategory();
 var dataPerPage = 9;
 var page = req.params.page || 1;
 var skip = dataPerPage*(page - 1);
 var item = await bidderModel.getWatchList(userID, dataPerPage, skip);
 var json = await bidderModel.getBidderbyID(userID);
 var user = JSON.parse(JSON.stringify(json))[0];
 json = await bidderModel.getTotalLike(userID);
 var totalLike =  JSON.parse(JSON.stringify(json))[0];
 var result = await bidderModel.getTotalDislike(userID);
 var totalDislike =  JSON.parse(JSON.stringify(result))[0];
 
 var temp = totalLike.totalLike + totalDislike.totalDisLike;
 var point =  totalLike.totalLike + "/" +  temp;
 var percentLike = (totalLike.totalLike/temp)*100;
 var percentDislike = 100-percentLike;
 var temp1 = await bidderModel.getLengthWatchList(userID);
 var length =  JSON.parse(JSON.stringify(temp1))[0];
 console.log(dataPerPage);
 console.log(page);
 console.log(length.length);
 var filter = 'name';
 res.render('bidder-views/bidder-watchlist', {
        catList: category,
        items: item,
        user: user,
        uid: userID,
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
 var userID = String(req.query.id);
 const category = await bidderModel.getListCategory();
 var dataPerPage = 9;
 var page = req.params.page || 1;
 var skip = dataPerPage*(page - 1);
 var item = await bidderModel.getWonProductList(userID, dataPerPage, skip);
 var json = await bidderModel.getBidderbyID(userID);
 var user = JSON.parse(JSON.stringify(json))[0];
 json = await bidderModel.getTotalLike(userID);
 var totalLike =  JSON.parse(JSON.stringify(json))[0];
 var result = await bidderModel.getTotalDislike(userID);
 var totalDislike =  JSON.parse(JSON.stringify(result))[0];
 var temp = totalLike.totalLike + totalDislike.totalDisLike;
 var point =  totalLike.totalLike + "/" +  temp;
 var percentLike = (totalLike.totalLike/temp)*100;
 var percentDislike = 100-percentLike;
 var temp1 = await bidderModel.getLengthWonProductList(userID);
 var length =  JSON.parse(JSON.stringify(temp1))[0];
 console.log(dataPerPage);
 console.log(page);
 console.log(skip);
 var filter = 'name';
 res.render('bidder-views/bidder-wonproduct', {
        catList: category,
        items: item,
        user: user,
        uid: userID,
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
 var userID = String(req.query.id);
 const category = await bidderModel.getListCategory();
 var dataPerPage = 9;
 var page = req.params.page || 1;
 var skip = dataPerPage*(page - 1);
 var review = await bidderModel.getReviewList(userID, dataPerPage, skip);
 var json = await bidderModel.getBidderbyID(userID);
 var user = JSON.parse(JSON.stringify(json))[0];
 json = await bidderModel.getTotalLike(userID);
 var totalLike =  JSON.parse(JSON.stringify(json))[0];
 var result = await bidderModel.getTotalDislike(userID);
 var totalDislike =  JSON.parse(JSON.stringify(result))[0];
 var temp = totalLike.totalLike + totalDislike.totalDisLike;
 var point =  totalLike.totalLike + "/" +  temp;
 var percentLike = (totalLike.totalLike/temp)*100;
 var percentDislike = 100-percentLike;
 var temp1 = await bidderModel.getLengthReviewList(userID);
 var length =  JSON.parse(JSON.stringify(temp1))[0];
 console.log(dataPerPage);
 console.log(page);
 console.log(skip);
 var filter = 'name';
 res.render('bidder-views/bidder-review', {
        catList: category,
        reviews: review,
        user: user,
        uid: userID,
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
 res.redirect('back');

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
   
 res.redirect('/bidder-watchlist/1?id='+userId);

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
