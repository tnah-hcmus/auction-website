const db = require('../utils/db');

module.exports = {
	getListCategory() {return db.load("SELECT c.id as ID, c.NAME as name FROM category c WHERE c.id != '4' AND c.id != '5'")},
	getBidderbyID(id) {return db.load("SELECT u.name as name, u.username as username, u.phone as phone, u.dob as dob, u.password as password FROM user u where u.id = "+id)},
	getTotalLike(id) {return db.load("SELECT Count(r.status) as totalLike FROM review r WHERE r.id_user="+id+" AND r.status=1")},	
	getTotalDislike(id) {return db.load("SELECT Count(r.status) as totalDisLike FROM review r WHERE r.id_user="+id+" AND r.status=0")},
	getWatchList(id, limit, offset) {return db.load("select distinct p.id_owner as holdId, p.name as name, p.current_price as price, p.buy_now_price as buynow, p.id as id, p.details as details,  p.startDate as dateStart, p.endDate as dateEnd, u1.NAME as hold, u2.name as owner FROM product p, watchlist w, user u1, user u2 WHERE w.id_user = "+id+" and u1.id=w.id_user and w.id_product=p.id and p.id_owner=u2.id LIMIT " + limit + " OFFSET " + offset)},
	getLengthWatchList(id) {return db.load("select count(*) as length from watchlist w where w.id_user = "+ id)},
	getBiddingList(id, limit, offset) {return db.load("select distinct p.id_owner as holdId, p.name as name, p.current_price as price, p.buy_now_price as buynow, p.id as id, p.details as details,  p.startDate as dateStart, p.endDate as dateEnd, u1.NAME as hold, u2.name as owner FROM product p, biddinglist b, user u1, user u2 WHERE b.id_user = "+id+" and u1.id=b.id_user and b.id_product=p.id and p.id_owner=u2.id and p.auctioned=0 LIMIT "+ limit + " OFFSET "+ offset)},
	getLengthBiddingList(id) {return db.load("select count(distinct b.id_product) as length from biddinglist b, product p where b.id_user= "+id+" and b.id_product=p.id and p.auctioned=0")},
	getWonProductList(id,limit,offset) {return db.load("select distinct p.id_owner as ownerId, p.name as name, p.current_price as wonPrice, p.buy_now_price as buynow, p.id as id, p.details as details,  p.startDate as dateStart, p.endDate as dateEnd, u1.NAME as wonUser, u2.name as owner from product p, user u1, user u2 where p.id_bidder= " + id +" and p.auctioned=1 and u1.id=p.id_bidder and u2.id=p.id_owner LIMIT " + limit + " OFFSET " + offset)},
	getLengthWonProductList(id) {return db.load("select count(*) as length from product where id_bidder= "+id+" and auctioned=1")},
	getReviewList(id, limit, offset) {return db.load("select r.id_reviewer as reviewerId, r.review as review, r.time as time, u.name as reviewerName from review r, user u where r.id_user= "+id+" and r.id_reviewer=u.id limit " + limit + " offset "+ offset)},
	getLengthReviewList(id) {return db.load("select count(*) as length from review r where r.id_user= "+id)},
	getCountRequestToSeller(id){return db.load("select count(r.bidder_id) as count from request r where r.bidder_id= "+id)},
	addRequestToSeller(id) {return db.load("insert into request(bidder_id) value("+id+")")},
	getCountWatchListProduct(id_user, id_product){return db.load("select count(w.id_product) as count from watchlist w where w.id_user= "+id_user+" and w.id_product=" + id_product)},
	addWatchList(id_user,id_product) {return db.load("insert into watchlist value ("+id_user+","+id_product+")")},
	updateInfo(id,name,email,phone,dob) {return db.load("update user u set u.name='" +name + "' ,u.username= '"+email+"', u.phone='" +phone+"', u.dob ='" + dob +"' where u.id=" +id)},
	updatePass(id,pass) {return db.load("update user u set u.password='" + pass +"' where u.id = "+id)},
	getCurrentPass(id) {return db.load("select u.password as password from user u where u.id="+id)},
	getProductbyID(id) {return db.load("SELECT p.auctioned as auctioned, p.bid_step as bidStep, p.name as name, p.current_price as price, p.buy_now_price as buynow, p.id as id, p.auctionTime as auctionTime, p.details as detail, p.startDate as dateStart, p.endDate as dateEnd, c.NAME as category, u.NAME as hold, u.username as bidRating, u.username as bidLink,  p.auctionTime as auctionTime FROM product p, category c, user u where p.id_bidder = u.id and p.category = c.id and p.id = "+id)},
  	getOwnerbyID(id) {return db.load("SELECT u.name as name, u.username as email FROM user u, product p where p.id_owner = u.id AND p.id = "+id)},
  	getRelateItembyID(id) {return db.load("SELECT p2.name as name, p2.id as id, p2.current_price as price FROM product p1, product p2 where p1.category = p2.category AND p1.id = "+id +" LIMIT 5")},
  	BidProduct(id_user,id_product,price,auctionTime) {return db.load("update product p set p.id_bidder= "+id_user+", p.current_price="+price+", p.auctionTime="+auctionTime+" where p.id="+id_product)},
  	BuyNowProduct(id_user,id_product,price,auctionTime) {return db.load("update product p set p.auctioned=1, p.id_bidder= "+id_user+", p.current_price="+price+", p.auctionTime="+auctionTime+" where p.id="+id_product)},
  	updateBiddingList(id_product,id_user,price,time){return db.load("insert into biddinglist value ("+id_user+","+id_product+","+price+",'"+time+"')")},
  	getHistory(id_product){return db.load("select u.name as biddername, b.id_product as id, b.id_user as bidder, b.bid_price as price, b.time as date from biddinglist b, user u where b.id_user=u.id and b.id_product=" +id_product)}
};