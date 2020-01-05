var express = require('express');
var router = express.Router();
const sellerModel = require('../models/seller.model.js');


//Login page

router.get('/login', function(req, res, next) {
    res.render('../main-views/login', { title: 'Login page' });
});


//Detail product-view page
router.get('/detailsProduct-seller', async(req, res, next) => {
    const id = String(req.query.id);
    var history = await sellerModel.getHistorybyID(id);
    const categoryList = await sellerModel.getListCategory();
    var filter = String(req.query.filter);
    if (filter == 'undefined') filter = 'name';
    var result = await sellerModel.getProductbyID(id);
    const one = JSON.parse(JSON.stringify(result))[0];
    result = await sellerModel.getOwnerbyID(id);
    const own = JSON.parse(JSON.stringify(result))[0];

    res.render('seller-layout/detailsProduct-seller', {
        product: one,
        catList: categoryList,
        user: own,
        history: history,
        filter: filter
    });
});

//Profile page
router.get('/profile-seller', async(req, res, next) => {
    const idU = String(req.query.idU);
    var json = await sellerModel.getSellerbyID(idU);
    var user = JSON.parse(JSON.stringify(json))[0];
    json = await sellerModel.getTotalLike(idU);
    var totalLike = JSON.parse(JSON.stringify(json))[0];
    var result = await sellerModel.getTotalDislike(idU);
    var totalDislike = JSON.parse(JSON.stringify(result))[0];
    var temp = totalLike.totalLike + totalDislike.totalDisLike;
    var point = totalLike.totalLike + "/" + temp;
    var percentLike = (totalLike.totalLike / temp) * 100;
    var percentDislike = 100 - percentLike;
    json = await sellerModel.getdateJoinbyID(idU);
    var dateJoin = JSON.parse(JSON.stringify(json))[0];
    const categoryList = await sellerModel.getListCategory();

    res.render('seller-layout/profile-seller', {
        catList: categoryList,
        user: user,
        idU: idU,
        totalLike: totalLike,
        totalDislike: totalDislike,
        point: point,
        percentLike: percentLike,
        percentDislike: percentDislike,
        dateJoin: dateJoin,
    });
});

//Auctioned product - seller page
router.get('/auctionedProduct-seller/:page', async(req, res, next) => {
    const idU = String(req.query.idU);
    var json = await sellerModel.getSellerbyID(idU);
    var user = JSON.parse(JSON.stringify(json))[0];
    json = await sellerModel.getTotalLike(idU);
    var totalLike = JSON.parse(JSON.stringify(json))[0];
    var result = await sellerModel.getTotalDislike(idU);
    var totalDislike = JSON.parse(JSON.stringify(result))[0];
    var temp = totalLike.totalLike + totalDislike.totalDisLike;
    var point = totalLike.totalLike + "/" + temp;
    var percentLike = (totalLike.totalLike / temp) * 100;
    var percentDislike = 100 - percentLike;
    json = await sellerModel.getdateJoinbyID(idU);
    var dateJoin = JSON.parse(JSON.stringify(json))[0];
    const categoryList = await sellerModel.getListCategory();
    var page = req.params.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * 6;
    var items = await sellerModel.getListAuctionedProduct(idU, offset);
    var json = await sellerModel.countauctionedPro(idU);
    var length = JSON.parse(JSON.stringify(json))[0].total;



    res.render('seller-layout/auctioned-product-seller', {
        catList: categoryList,
        auctionedPro: items,
        user: user,
        idU: idU,
        totalLike: totalLike,
        totalDislike: totalDislike,
        point: point,
        percentLike: percentLike,
        percentDislike: percentDislike,
        dateJoin: dateJoin,
        reviewPro: items,
        current: page,
        length: length,
        pages: Math.floor(length / 6)
    });
});


//Watch list product - seller page
router.get('/watchList-seller/:page', async(req, res, next) => {
    const idU = String(req.query.idU);
    var json = await sellerModel.getSellerbyID(idU);
    var user = JSON.parse(JSON.stringify(json))[0];
    json = await sellerModel.getTotalLike(idU);
    var totalLike = JSON.parse(JSON.stringify(json))[0];
    var result = await sellerModel.getTotalDislike(idU);
    var totalDislike = JSON.parse(JSON.stringify(result))[0];
    var temp = totalLike.totalLike + totalDislike.totalDisLike;
    var point = totalLike.totalLike + "/" + temp;
    var percentLike = (totalLike.totalLike / temp) * 100;
    var percentDislike = 100 - percentLike;
    json = await sellerModel.getdateJoinbyID(idU);
    var dateJoin = JSON.parse(JSON.stringify(json))[0];
    const categoryList = await sellerModel.getListCategory();
    var page = req.params.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * 6;
    var items = await sellerModel.getwatchListbyID(idU, offset);
    var json = await sellerModel.countwatchListPro(idU);
    var length = JSON.parse(JSON.stringify(json))[0].total;

    res.render('seller-layout/watchList-seller', {
        user: user,
        idU: idU,
        totalLike: totalLike,
        totalDislike: totalDislike,
        point: point,
        percentLike: percentLike,
        percentDislike: percentDislike,
        dateJoin: dateJoin,
        watchPro: items,
        modalPro: items,
        current: page,
        length: length,
        pages: Math.floor(length / 6),
        catList: categoryList
    });
});

//review - seller page
router.get('/review-seller/:page', async(req, res, next) => {
    const idU = String(req.query.idU);
    var json = await sellerModel.getSellerbyID(idU);
    var user = JSON.parse(JSON.stringify(json))[0];
    json = await sellerModel.getTotalLike(idU);
    var totalLike = JSON.parse(JSON.stringify(json))[0];
    var result = await sellerModel.getTotalDislike(idU);
    var totalDislike = JSON.parse(JSON.stringify(result))[0];
    var temp = totalLike.totalLike + totalDislike.totalDisLike;
    var point = totalLike.totalLike + "/" + temp;
    var percentLike = (totalLike.totalLike / temp) * 100;
    var percentDislike = 100 - percentLike;
    json = await sellerModel.getdateJoinbyID(idU);
    var dateJoin = JSON.parse(JSON.stringify(json))[0];
    const categoryList = await sellerModel.getListCategory();
    var page = req.params.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * 6;
    var review = await sellerModel.getReview(idU, offset);
    var json = await sellerModel.countReview(idU);
    var length = JSON.parse(JSON.stringify(json))[0].total;
    res.render('seller-layout/review-seller', {
        user: user,
        idU: idU,
        totalLike: totalLike,
        totalDislike: totalDislike,
        point: point,
        percentLike: percentLike,
        percentDislike: percentDislike,
        dateJoin: dateJoin,
        review: review,
        current: page,
        length: length,
        pages: Math.floor(length / 6),
        catList: categoryList
    });
});

//Won product - seller page
router.get('/wonProduct-seller/:page', async(req, res, next) => {
    const idU = String(req.query.idU);
    var json = await sellerModel.getSellerbyID(idU);
    var user = JSON.parse(JSON.stringify(json))[0];
    json = await sellerModel.getTotalLike(idU);
    var totalLike = JSON.parse(JSON.stringify(json))[0];
    var result = await sellerModel.getTotalDislike(idU);
    var totalDislike = JSON.parse(JSON.stringify(result))[0];
    var temp = totalLike.totalLike + totalDislike.totalDisLike;
    var point = totalLike.totalLike + "/" + temp;
    var percentLike = (totalLike.totalLike / temp) * 100;
    var percentDislike = 100 - percentLike;
    json = await sellerModel.getdateJoinbyID(idU);
    var dateJoin = JSON.parse(JSON.stringify(json))[0];
    const categoryList = await sellerModel.getListCategory();
    var page = req.params.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * 6;
    var items = await sellerModel.getwonProductbyID(idU, offset);
    var json = await sellerModel.countwonPro(idU);
    var length = JSON.parse(JSON.stringify(json))[0].total;

    res.render('seller-layout/wonProduct-seller', {
        user: user,
        idU: idU,
        totalLike: totalLike,
        totalDislike: totalDislike,
        point: point,
        percentLike: percentLike,
        percentDislike: percentDislike,
        dateJoin: dateJoin,
        wonPro: items,
        reviewItem: items,
        current: page,
        length: length,
        pages: Math.floor(length / 6),
        catList: categoryList
    });
});

//Bidding product - seller page
router.get('/bidding-seller/:page', async(req, res, next) => {
    const idU = String(req.query.idU);
    var json = await sellerModel.getSellerbyID(idU);
    var user = JSON.parse(JSON.stringify(json))[0];
    json = await sellerModel.getTotalLike(idU);
    var totalLike = JSON.parse(JSON.stringify(json))[0];
    var result = await sellerModel.getTotalDislike(idU);
    var totalDislike = JSON.parse(JSON.stringify(result))[0];
    var temp = totalLike.totalLike + totalDislike.totalDisLike;
    var point = totalLike.totalLike + "/" + temp;
    var percentLike = (totalLike.totalLike / temp) * 100;
    var percentDislike = 100 - percentLike;
    json = await sellerModel.getdateJoinbyID(idU);
    var dateJoin = JSON.parse(JSON.stringify(json))[0];
    const categoryList = await sellerModel.getListCategory();
    var page = req.params.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * 6;
    var items = await sellerModel.getbiddingProductbyID(idU, offset);
    var json = await sellerModel.countbiddingPro(idU);
    var length = JSON.parse(JSON.stringify(json))[0].total;

    res.render('seller-layout/bidding-seller', {
        user: user,
        idU: idU,
        totalLike: totalLike,
        totalDislike: totalDislike,
        point: point,
        percentLike: percentLike,
        percentDislike: percentDislike,
        dateJoin: dateJoin,
        biddingPro: items,
        modalPro: items,
        current: page,
        length: length,
        pages: Math.floor(length / 6),
        catList: categoryList
    });
});

//My product - seller page
router.get('/myProduct-seller/:page', async(req, res, next) => {
    const idU = String(req.query.idU);
    var json = await sellerModel.getSellerbyID(idU);
    var user = JSON.parse(JSON.stringify(json))[0];
    json = await sellerModel.getTotalLike(idU);
    var totalLike = JSON.parse(JSON.stringify(json))[0];
    var result = await sellerModel.getTotalDislike(idU);
    var totalDislike = JSON.parse(JSON.stringify(result))[0];
    var temp = totalLike.totalLike + totalDislike.totalDisLike;
    var point = totalLike.totalLike + "/" + temp;
    var percentLike = (totalLike.totalLike / temp) * 100;
    var percentDislike = 100 - percentLike;
    json = await sellerModel.getdateJoinbyID(idU);
    var dateJoin = JSON.parse(JSON.stringify(json))[0];
    const categoryList = await sellerModel.getListCategory();
    var page = req.params.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * 6;
    var items = await sellerModel.getListmyProductbyID(idU, offset);
    var json = await sellerModel.countmyPro(idU);
    var length = JSON.parse(JSON.stringify(json))[0].total;


    res.render('seller-layout/myProduct-seller', {
        user: user,
        idU: idU,
        totalLike: totalLike,
        totalDislike: totalDislike,
        point: point,
        percentLike: percentLike,
        percentDislike: percentDislike,
        dateJoin: dateJoin,
        myProduct: items,
        modalPro: items,
        current: page,
        length: length,
        pages: Math.floor(length / 6),
        catList: categoryList
    });
});

//Post product
router.get('/postProduct-seller', function(req, res, next) {
    var product = { id: 'product-01' };

    res.render('seller-layout/postProduct-seller', {
        product: product,
    });
});


//Homepage
router.get(/\/index|\//, async(req, res, next) => {
    try {
        const faqs = await sellerModel.faq();
        const category = await sellerModel.getListCategory();
        const type = String(req.query.sort);
        var search = String(req.query.search);
        if (search == 'undefined') search = 'name';
        var nearest = '';
        var hottest = '';
        var highest = '';
        var best = '';
        switch (type) {
            case 'nearest':
                var items = await sellerModel.topNearestAuction();
                nearest = 'active';
                break;
            case 'hottest':
                var items = await sellerModel.topAuctionTime();
                hottest = 'active';
                break;
            case 'best':
                var items = await sellerModel.topDeAuctionPrice();
                best = 'active';
                break;
            default:
                var items = await sellerModel.topAuctionPrice();
                highest = 'active';
        }
        res.render('main-views/index', {
            items: items,
            faqs: faqs,
            nearest: nearest,
            highest: highest,
            hottest: hottest,
            best: best,
            catList: category,
            filter: search
        });
    } catch (err) {
        console.log(err);
        res.end('View error log in console.');
    }
});



module.exports = router;