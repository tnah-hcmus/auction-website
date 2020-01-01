var express = require('express');
var router = express.Router();
const sellerModel = require('../models/seller.model.js');


//Login page

router.get('/login', function(req, res, next) {
    res.render('../main-views/login', { title: 'Login page' });
});

//Detail product-view page

router.get('/detailsProduct-seller', function(req, res, next) {
    var product = { id: 'product-01', name: 'Laptop A', price: 600, status: 'New', dateStart: '07/12/2019', dateEnd: '08/12/2019' };
    var history = [
        { date: '07/12/2019', price: 300, user: 'BlackPink', note: '' },
        { date: '07/12/2019', price: 400, user: 'BlackPink1', note: '' },
        { date: '07/12/2019', price: 500, user: 'BlackPink2', note: '' }
    ];
    var own = { name: 'BlackPink0', address: 'Cairo', rating: 4.9 };
    var items = [
        { name: 'Laptop A', tag: 'chart-item-1', imgID: '01', price: 600 },
        { name: 'Laptop B', tag: 'chart-item-2', imgID: '02', price: 600 },
        { name: 'Laptop C', tag: 'chart-item-3', imgID: '03', price: 600 },
        { name: 'Laptop D', tag: 'chart-item-4', imgID: '04', price: 600 },
        { name: 'Laptop E', tag: 'chart-item-5', imgID: '05', price: 600 }
    ];
    res.render('seller-layout/detailsProduct-seller', {
        product: product,
        history: history,
        user: own,
        relateItems: items
    });
});



//List of product page
router.get('/detailsProduct-seller/laptop-list', function(req, res, next) {
    var category = { name: 'Laptop', description: 'Máy tính xách tay giá rẻ', length: 5 };
    var items = [
        { name: 'Laptop A', tag: 'chart-item-1', imgID: '01', price: 600, own: 'BlackPink', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019' },
        { name: 'Laptop B', tag: 'chart-item-2', imgID: '02', price: 600, own: 'BlackPink', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019' },
        { name: 'Laptop C', tag: 'chart-item-3', imgID: '03', price: 600, own: 'BlackPink', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019' },
        { name: 'Laptop D', tag: 'chart-item-4', imgID: '04', price: 600, own: 'BlackPink', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019' },
        { name: 'Laptop E', tag: 'chart-item-5', imgID: '05', price: 600, own: 'BlackPink', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019' }
    ];
    res.render('main-views/list-view-laptop', {
        category: category,
        list: items
    });
});
//Auctioned product - seller page
router.get('/auctionedProduct-seller', function(req, res, next) {
    var own = { ID: '02', name: 'BlackPink', address: 'Cairo', rating: 4.9, numLike: 150, numDislike: 20, dateJoin: '01/01/2018' };
    var items = [
        { ID: '1', name: 'Laptop A', tag: 'chart-item-1', imgID: '01', currentBid: 600, buyNow: 700, ownerID: '01', ownerName: 'BlackPink1', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '2', name: 'Laptop B', tag: 'chart-item-2', imgID: '02', currentBid: 700, buyNow: 800, ownerID: '01', ownerName: 'BlackPink2', cat: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '3', name: 'Laptop C', tag: 'chart-item-3', imgID: '03', currentBid: 800, buyNow: 900, ownerID: '01', ownerName: 'BlackPink3', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '4', name: 'Laptop D', tag: 'chart-item-4', imgID: '04', currentBid: 900, buyNow: 1000, ownerID: '01', ownerName: 'BlackPink4', cat: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '5', name: 'Laptop E', tag: 'chart-item-5', imgID: '05', currentBid: 1000, buyNow: 1100, ownerID: '01', ownerName: 'BlackPink5', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' }
    ];
    var page = [
        { number: 1 },
        { number: 2 },
        { number: 3 },
        { number: 4 }
    ]
    res.render('seller-layout/auctioned-product-seller', {
        user: own,
        auctionedPro: items,
        reviewPro: items,
        pagination: page
    });
});

//Watch list product - seller page
router.get('/watchList-seller', function(req, res, next) {
    var own = { ID: '02', name: 'BlackPink', address: 'Cairo', rating: 4.9, numLike: 150, numDislike: 20, dateJoin: '01/01/2018' };
    var items = [
        { ID: '1', name: 'Laptop A', tag: 'chart-item-1', imgID: '01', currentBid: 600, buyNow: 700, ownerID: '01', ownerName: 'BlackPink1', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '2', name: 'Laptop B', tag: 'chart-item-2', imgID: '02', currentBid: 700, buyNow: 800, ownerID: '01', ownerName: 'BlackPink2', cat: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '3', name: 'Laptop C', tag: 'chart-item-3', imgID: '03', currentBid: 800, buyNow: 900, ownerID: '01', ownerName: 'BlackPink3', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '4', name: 'Laptop D', tag: 'chart-item-4', imgID: '04', currentBid: 900, buyNow: 1000, ownerID: '01', ownerName: 'BlackPink4', cat: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '5', name: 'Laptop E', tag: 'chart-item-5', imgID: '05', currentBid: 1000, buyNow: 1100, ownerID: '01', ownerName: 'BlackPink5', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' }
    ];
    var page = [
        { number: 1 },
        { number: 2 },
        { number: 3 },
        { number: 4 }
    ]
    res.render('seller-layout/watchList-seller', {
        user: own,
        watchPro: items,
        modalPro: items,
        pagination: page
    });
});

//review - seller page
router.get('/review-seller', function(req, res, next) {
    var own = { ID: '02', name: 'BlackPink', address: 'Cairo', rating: 4.9, numLike: 150, numDislike: 20, dateJoin: '01/01/2018' };
    var review = [
        { userID: '01', userName: 'BlackPink', time: '5 hour later' },
        { userID: '01', userName: 'BlackPink1', time: '6 hour later' },
        { userID: '01', userName: 'BlackPink2', time: '7 hour later' },
        { userID: '01', userName: 'BlackPink3', time: '8 hour later' }
    ]
    var page = [
        { number: 1 },
        { number: 2 },
        { number: 3 },
        { number: 4 }
    ]
    res.render('seller-layout/review-seller', {
        user: own,
        review: review,
        pagination: page
    });
});

//Won product - seller page
router.get('/wonProduct-seller', function(req, res, next) {
    var own = { ID: '02', name: 'BlackPink', address: 'Cairo', rating: 4.9, numLike: 150, numDislike: 20, dateJoin: '01/01/2018' };
    var items = [
        { ID: '1', name: 'Laptop A', tag: 'chart-item-1', imgID: '01', finalBid: 600, buyNow: 700, ownerID: '01', ownerName: 'BlackPink1', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '2', name: 'Laptop B', tag: 'chart-item-2', imgID: '02', finalBid: 700, buyNow: 800, ownerID: '01', ownerName: 'BlackPink2', cat: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '3', name: 'Laptop C', tag: 'chart-item-3', imgID: '03', finalBid: 800, buyNow: 900, ownerID: '01', ownerName: 'BlackPink3', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '4', name: 'Laptop D', tag: 'chart-item-4', imgID: '04', finalBid: 900, buyNow: 1000, ownerID: '01', ownerName: 'BlackPink4', cat: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '5', name: 'Laptop E', tag: 'chart-item-5', imgID: '05', finaltBid: 1000, buyNow: 1100, ownerID: '01', ownerName: 'BlackPink5', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' }
    ];
    var page = [
        { number: 1 },
        { number: 2 },
        { number: 3 },
        { number: 4 }
    ]
    res.render('seller-layout/wonProduct-seller', {
        user: own,
        reviewItem: items,
        wonPro: items,
        pagination: page
    });
});

//Bidding product - seller page
router.get('/bidding-seller', function(req, res, next) {
    var own = { ID: '02', name: 'BlackPink', address: 'Cairo', rating: 4.9, numLike: 150, numDislike: 20, dateJoin: '01/01/2018' };
    var items = [
        { ID: '1', name: 'Laptop A', tag: 'chart-item-1', imgID: '01', currentBid: 600, buyNow: 700, ownerID: '01', ownerName: 'BlackPink1', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '2', name: 'Laptop B', tag: 'chart-item-2', imgID: '02', currentBid: 700, buyNow: 800, ownerID: '01', ownerName: 'BlackPink2', cat: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '3', name: 'Laptop C', tag: 'chart-item-3', imgID: '03', currentBid: 800, buyNow: 900, ownerID: '01', ownerName: 'BlackPink3', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '4', name: 'Laptop D', tag: 'chart-item-4', imgID: '04', currentBid: 900, buyNow: 1000, ownerID: '01', ownerName: 'BlackPink4', cat: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '5', name: 'Laptop E', tag: 'chart-item-5', imgID: '05', currentBid: 1000, buyNow: 1100, ownerID: '01', ownerName: 'BlackPink5', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' }
    ];
    var page = [
        { number: 1 },
        { number: 2 },
        { number: 3 },
        { number: 4 }
    ]
    res.render('seller-layout/bidding-seller', {
        user: own,
        biddingPro: items,
        modalPro: items,
        pagination: page
    });
});

//My product - seller page
router.get('/myProduct-seller', function(req, res, next) {
    var own = { ID: '02', name: 'BlackPink', address: 'Cairo', rating: 4.9, numLike: 150, numDislike: 20, dateJoin: '01/01/2018' };
    var items = [
        { ID: '1', name: 'Laptop A', tag: 'chart-item-1', imgID: '01', currentBid: 600, ownerID: '02', ownerName: 'BlackPink1', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '2', name: 'Laptop B', tag: 'chart-item-2', imgID: '02', currentBid: 700, ownerID: '02', ownerName: 'BlackPink2', cat: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '3', name: 'Laptop C', tag: 'chart-item-3', imgID: '03', currentBid: 800, ownerID: '02', ownerName: 'BlackPink3', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '4', name: 'Laptop D', tag: 'chart-item-4', imgID: '04', currentBid: 900, ownerID: '02', ownerName: 'BlackPink4', cat: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' },
        { ID: '5', name: 'Laptop E', tag: 'chart-item-5', imgID: '05', currentBid: 1000, ownerID: '02', ownerName: 'BlackPink5', cat: 'PC', dateStart: '07/12/2019', dateEnd: '08/12/2019', dateRelease: '05/12/1999' }
    ];
    var page = [
        { number: 1 },
        { number: 2 },
        { number: 3 },
        { number: 4 }
    ]
    res.render('seller-layout/myProduct-seller', {
        user: own,
        myProduct: items,
        modalPro: items,
        pagination: page
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
router.get(/\/index|\//, function(req, res, next) {
    var items = [
        { name: 'Laptop A', tag: 'chart-item-1', imgID: '01', price: 600, own: 'BlackPink', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019' },
        { name: 'Laptop B', tag: 'chart-item-2', imgID: '02', price: 600, own: 'BlackPink', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019' },
        { name: 'Laptop C', tag: 'chart-item-3', imgID: '03', price: 600, own: 'BlackPink', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019' },
        { name: 'Laptop D', tag: 'chart-item-4', imgID: '04', price: 600, own: 'BlackPink', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019' },
        { name: 'Laptop E', tag: 'chart-item-5', imgID: '05', price: 600, own: 'BlackPink', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019' }
    ];
    var faqs = [
        { name: 'question-1', question: 'How does this work', answer: 'It works using the Bootstrap 4 collapse component with cards to make a vertical accordion that expands and collapses as questions are toggled.' },
        { name: 'question-2', question: 'What is Bootstrap 4', answer: 'Bootstrap is the most popular CSS framework in the world. The latest version released in 2018 is Bootstrap 4. Bootstrap can be used to quickly build responsive websites.' },
        { name: 'question-3', question: 'What is another question', answer: 'The answer to the question can go here.' },
        { name: 'question-4', question: 'What is the next question', answer: 'The answer to this question can go here. This FAQ example can contain all the Q/A that is needed.' }
    ];
    res.render('main-views/index', {
        items: items,
        faqs: faqs
    });
});



module.exports = router;