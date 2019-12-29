var express = require('express');
var router = express.Router();

//Login page

router.get('/login', function(req, res, next) {
  res.render('main-views/login', { title: 'Login page' });
});

//Product-view page
router.get('/detailsProduct', function(req, res, next) {
	var product = {id:'product-01', name: 'Laptop A', price: 600, status: 'New', dateStart: '07/12/2019', dateEnd: '08/12/2019' };
	var history = [
			{date: '07/12/2019', price: 300, user: 'Lucifer', note: ''},
			{date: '07/12/2019', price: 400, user: 'Lucifer1', note: ''},
			{date: '07/12/2019', price: 500, user: 'Lucifer2', note: ''}
		];
	var own = {name:  'Lucifer0', address: 'Cairo', rating: 4.9};
	 var items = [
        { name: 'Laptop A', tag: 'chart-item-1', imgID:'01', price: 600},
        { name: 'Laptop B', tag: 'chart-item-2', imgID:'02', price: 600},
        { name: 'Laptop C', tag: 'chart-item-3', imgID:'03', price: 600},
        { name: 'Laptop D', tag: 'chart-item-4', imgID:'04', price: 600},
        { name: 'Laptop E', tag: 'chart-item-5', imgID:'05', price: 600}
    ];
	res.render('main-views/detail-product', { 
		product: product,
		history: history,
		user: own,
		relateItems: items 
	});
});

//List of product page
router.get('/laptop-list', function(req, res, next) {
	var category = {name: 'Laptop', description: 'Máy tính xách tay giá rẻ', length: 5};
	var items = [
        { name: 'Laptop A', tag: 'chart-item-1', imgID:'01', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop B', tag: 'chart-item-2', imgID:'02', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}, 
        { name: 'Laptop C', tag: 'chart-item-3', imgID:'03', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop D', tag: 'chart-item-4', imgID:'04', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop E', tag: 'chart-item-5', imgID:'05', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}
    ];
	res.render('main-views/list-view-laptop', { 
		category: category,
		list: items	
	});
});

//Homepage
router.get(/\/index|\//, function(req, res, next) {
 var items = [
        { name: 'Laptop A', tag: 'chart-item-1', imgID:'01', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop B', tag: 'chart-item-2', imgID:'02', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}, 
        { name: 'Laptop C', tag: 'chart-item-3', imgID:'03', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop D', tag: 'chart-item-4', imgID:'04', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'},
        { name: 'Laptop E', tag: 'chart-item-5', imgID:'05', price: 600, own: 'Lucifer', type: 'Laptop', dateStart: '07/12/2019', dateEnd: '08/12/2019'}
    ];
var faqs = [
		{ name: 'question-1', question: 'How does this work', answer:'It works using the Bootstrap 4 collapse component with cards to make a vertical accordion that expands and collapses as questions are toggled.'},
		{ name: 'question-2', question: 'What is Bootstrap 4', answer:'Bootstrap is the most popular CSS framework in the world. The latest version released in 2018 is Bootstrap 4. Bootstrap can be used to quickly build responsive websites.'},
		{ name: 'question-3', question: 'What is another question', answer:'The answer to the question can go here.'},
		{ name: 'question-4', question: 'What is the next question', answer:'The answer to this question can go here. This FAQ example can contain all the Q/A that is needed.'}
	];
    res.render('main-views/index', {
        items: items,
        faqs:faqs
    });
});



module.exports = router;
