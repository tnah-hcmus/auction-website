var express = require('express');
const bidderModel = require('../models/bidder.model');
var router = express.Router();

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
 const category = await bidderModel.getListCategory();
    res.render('bidder-views/bidder-account-setting', {
      catList: category,
    });
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
