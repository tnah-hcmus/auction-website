var express = require('express');
const bidderModel = require('../models/bidder.model');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//bidding product   
router.get('/bidder-bidding', function(req, res, next) {
 var catID = String(req.query.category);
 var dataPerPage = 1;
 var page = req.params.page || 1;
 var skip = dataPerPage*(page - 1);
 var items = [
        { name: 'Laptop A', tag: 'chart-item-1', imgID:'01', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop B', tag: 'chart-item-2', imgID:'02', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}, 
        { name: 'Laptop C', tag: 'chart-item-3', imgID:'03', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop D', tag: 'chart-item-4', imgID:'04', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop E', tag: 'chart-item-5', imgID:'05', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}
    ];
var user = { name: 'Tuyết Chung',point :"5/10",totalLike: "50",totalDislike: "100"};
    res.render('bidder-views/bidder-bidding', {
        list: items,
        user: user
    });
});





router.get('/bidder-watchlist', function(req, res, next) {
 var items = [
        { name: 'Laptop A', tag: 'chart-item-1', imgID:'01', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop B', tag: 'chart-item-2', imgID:'02', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}, 
        { name: 'Laptop C', tag: 'chart-item-3', imgID:'03', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop D', tag: 'chart-item-4', imgID:'04', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop E', tag: 'chart-item-5', imgID:'05', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}
    ];
var user = { name: 'Tuyết Chung',point :"5/10",totalLike: "50",totalDislike: "100"};
    res.render('bidder-views/bidder-watchlist', {
        list: items,
        user: user
    });
});


router.get('/bidder-wonproduct', function(req, res, next) {
 var items = [
        { name: 'Laptop A', tag: 'chart-item-1', imgID:'01', wonPrice: 600, wonUser: 'Lucifer', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop B', tag: 'chart-item-2', imgID:'02', wonPrice: 600, wonUser: 'Lucifer', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}, 
        { name: 'Laptop C', tag: 'chart-item-3', imgID:'03', wonPrice: 600, wonUser: 'Lucifer', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop D', tag: 'chart-item-4', imgID:'04', wonPrice: 600, wonUser: 'Lucifer', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop E', tag: 'chart-item-5', imgID:'05', wonPrice: 600, wonUser: 'Lucifer', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}
    ];
var user = { name: 'Tuyết Chung',point :"5/10",totalLike: "50",totalDislike: "100"};
    res.render('bidder-views/bidder-wonproduct', {
        list: items,
        user: user
    });
});

router.get('/bidder-review', function(req, res, next) {
 var review = [
        { userName: 'Laptop A', review: 'Sản phẩm tuyệt vời !', time: '07/12/2019'},
        { userName: 'Laptop A', review: 'Sản phẩm tuyệt vời !', time: '07/12/2019'},
        { userName: 'Laptop A', review: 'Sản phẩm tuyệt vời !', time: '07/12/2019'},
        { userName: 'Laptop A', review: 'Sản phẩm tuyệt vời !', time: '07/12/2019'},
        { userName: 'Laptop A', review: 'Sản phẩm tuyệt vời !', time: '07/12/2019'}
         ];
var user = { name: 'Tuyết Chung',point :"5/10",totalLike: "50",totalDislike: "100"};
    res.render('bidder-views/bidder-review', {
        list: review,
        user: user
    });
});

router.get('/bidder-account-setting', function(req, res, next) {
 
    res.render('bidder-views/bidder-account-setting', {
      
    });
});


//bidding product   
router.get('/', function(req, res, next) {
 var items = [
        { name: 'Laptop A', tag: 'chart-item-1', imgID:'01', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop B', tag: 'chart-item-2', imgID:'02', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}, 
        { name: 'Laptop C', tag: 'chart-item-3', imgID:'03', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop D', tag: 'chart-item-4', imgID:'04', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop E', tag: 'chart-item-5', imgID:'05', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}
    ];
var user = { name: 'Tuyết Chung',point :"5/10",totalLike: "50",totalDislike: "100"};
    res.render('bidder-views/bidder-bidding', {
        list: items,
        user: user
    });
});

module.exports = router;
