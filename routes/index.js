var express = require('express');
const guestModel = require('../models/guest.model');
var cookieParser = require('cookie-parser');
var passport 	 = require('passport');
var session      = require('express-session')
var flash    = require('connect-flash');
var moment = require('moment');
var Recaptcha = require('express-recaptcha').RecaptchaV2;
const userModel = require('../models/user.model');
var router = express.Router();

//import Recaptcha from 'express-recaptcha'
var recaptcha = new Recaptcha('6Lf5cswUAAAAADGJaL_6T1teTwQRxjSRLV7Ia1TP', '6Lf5cswUAAAAAJOuMnedrEBVeGbTqQGI2iRoUCtX');
require('../config/passport')(passport);
router.use(cookieParser());

router.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

router.use(passport.initialize());
router.use(passport.session()); 
router.use(flash()); 

//Login page

router.get('/login', recaptcha.middleware.render, async(req, res, next) => {
  const categoryList = await guestModel.getListCategory();
  console.log(req.session.passport);
  res.render('main-views/login', { 
    title: 'Login page',
    catList: categoryList,
    captcha : res.recaptcha
  });
});

router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login', 
        failureFlash : true
    }));

router.post('/login/check', async(req, res) => {
  var username = req.body.username;
  const users = await userModel.findUserByName(username);
  if (users.length) {
    res.send('already');
  } 
})

router.post('/signup', recaptcha.middleware.verify, captchaVerification, passport.authenticate('local-signup', {
        successRedirect : '/profile', // Điều hướng tới trang hiển thị profile
        failureRedirect : '/signup', // Trở lại trang đăng ký nếu lỗi
        failureFlash : true 
    }));
router.get('/profile', isLoggedIn, async(req, res) => {
        const categoryList = await guestModel.getListCategory();
        console.log(req.session.passport.user);
        var filter = String(req.query.filter);
        if (filter == 'undefined') filter = 'name';
        res.render('main-views/profile', {
            user : req.user, // truyền đối tượng user cho profile.ejs để hiển thị lên view
            filter: filter,
            catList: categoryList
        });
    });
router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        })
    );
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

//Product-view process.memoryUsage();
router.get('/detailsProduct', async(req, res, next) => {
  const id = String(req.query.id);
  const categoryList = await guestModel.getListCategory();
  var filter = String(req.query.filter);
  if (filter == 'undefined') filter = 'name';
  var result = await guestModel.getProductbyID(id);
	const one = JSON.parse(JSON.stringify(result))[0];
  result = await guestModel.getOwnerbyID(id);  
	const seller = JSON.parse(JSON.stringify(result))[0];
	var items = await guestModel.getRelateItembyID(id);
  var now = moment();
  var start = one.dateStart;
  var end = one.dateEnd;
  one.dayStart = now.diff(start,'days');
  one.hourStart = now.diff(start, 'hours'); - one.dayStart*24;
  one.minStart = now.diff(start, 'minutes') - one.hourStart*60 - one.dayStart*24*60;
  one.dayEnd = -now.diff(end,'days');
  one.hourEnd = -now.diff(end, 'hours') - one.dayEnd*24;
  one.minEnd = -now.diff(end, 'minutes') - one.hourEnd*60 - one.dayEnd*24*60;

	res.render('main-views/detail-product', { 
		product: one,
    catList: categoryList,
		own: seller,
		relateItems: items,
    filter: filter
	});
});
//Search page
router.get('/search/:page', async(req, res, next) => {
  var input = req.cookies["input"] || "";
  console.log(input);
  var filter = String(req.query.filter);
  if (filter == 'undefined') filter = String(req.query.search);
  const categoryList = await guestModel.getListCategory();
  var dataPerPage = 1;
  var page = req.params.page || 1;
  var skip = dataPerPage*(page - 1);
  if(filter == 'name')
  {
  	var result = await guestModel.searchProductByName(input, dataPerPage, skip);
  	var json = await guestModel.getNumSeachByName(input);
    var length = JSON.parse(JSON.stringify(json))[0].num;
  }
  if(filter == 'category') 
  {
  	var result = await guestModel.searchProductByCategory(input, dataPerPage, skip);
  	var json = await guestModel.getNumSeachByCategory(input);
  	var length = JSON.parse(JSON.stringify(json))[0].num;
  }
  var recent = 3600;
  res.render('main-views/search', { 
  	catList: categoryList,
  	filter: filter,
  	list: result,
  	current:page,
  	length:length,
  	pages: Math.floor(length/dataPerPage),
    recent: recent
  });
});
router.post('/search/:page', async(req, res, next) => {
  var page = req.params.page || 1;
  var input = String(req.body.input);
  const filter = String(req.query.filter);
  res.cookie("input", input, { httpOnly: true }, {maxAge : 9999});
  res.redirect("/search/"+page+"?filter="+filter);
});
//List of product page
router.get('/list-view/:page', async(req, res, next) => {
	var catID = String(req.query.category);
	var search = String(req.query.search);
    if (search == 'undefined') search = 'name';
	const categoryList = await guestModel.getListCategory();
	var dataPerPage = 1;
	var page = req.params.page || 1;
	var skip = dataPerPage*(page - 1);
	switch(catID)
	{
		case 'laptop':
			catID = 4;
			var items = await guestModel.getProductbyCategory(catID, dataPerPage, skip);
			var result = await guestModel.getInfoCategory(catID);
			var category = JSON.parse(JSON.stringify(result))[0];
			break;
		case 'smartphone':
			catID= 5;
			var items = await guestModel.getProductbyCategory(catID, dataPerPage, skip);
			var result = await guestModel.getInfoCategory(catID);
			var category = JSON.parse(JSON.stringify(result))[0];
			break;
		case 'all':
			var items =  await guestModel.getAllProduct(dataPerPage, skip);
			var numPro = await guestModel.getNumProduct();
			var json = JSON.parse(JSON.stringify(numPro));
			var category = {name: 'Tất cả sản phẩm', description: 'Tất cả các sản phẩm hiện có', length: json[0].num};
			break;
		default:
			var items = await guestModel.getProductbyCategory(catID, dataPerPage, skip);
			var result = await guestModel.getInfoCategory(catID);
			var category = JSON.parse(JSON.stringify(result))[0];
	}
  var recent = 3600;
	res.render('main-views/list-view', { 
		category: category,
		filter: search,
		list: items,
		catList: categoryList,
		catID: catID,
		current: page,
		pages: Math.floor(category.length/dataPerPage),
    recent: recent
	});
});

//Homepage
router.get(/\/index|\//, async(req, res, next) => {
 try {
    const faqs = await guestModel.faq();
    const category = await guestModel.getListCategory();
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
    		var items = await guestModel.topNearestAuction();
    		nearest = 'active';
    		break;
  		case 'hottest':
    		var items = await guestModel.topAuctionTime();
    		hottest = 'active';
   			break;
  		case 'best':
    		var items = await guestModel.topDeAuctionPrice();
    		best = 'active';
   			break;
  		default:
    		var items = await guestModel.topAuctionPrice();
    		highest = 'active';
	} 
    res.render('main-views/index', {
        items: items,
        faqs:faqs,
        nearest:nearest,
        highest:highest,
        hottest:hottest,
        best:best,
        catList:category,
        filter: search
    });
  } catch (err) {
    console.log(err);
    res.end('View error log in console.');
  }
});
function captchaVerification(req, res, next) {
    if (req.recaptcha.error) {
        req.flash('signupMessage','reCAPTCHA Incorrect');
        res.redirect('back');
    } else {
        return next();
    }
}


module.exports = router;
