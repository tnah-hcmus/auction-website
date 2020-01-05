const db = require('../utils/db');

module.exports = {
	getListCategory() {return db.load("SELECT c.id as ID, c.NAME as name FROM category c WHERE c.id != '4' AND c.id != '5'")},
	getBidderbyID(id) {return db.load("SELECT u.name as name, u.email as email, u.phone as phone, u.dob as dob, u.password as password FROM user u where u.id = "+id)},
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
	getCountRequestToSeller(id){return db.load("select count(r.id_bidder) as count from requesttoseller r where r.id_bidder= "+id)},
	addRequestToSeller(id) {return db.load("insert into requesttoseller value("+id+")")},
	getCountWatchListProduct(id_user, id_product){return db.load("select count(w.id_product) as count from watchlist w where w.id_user= "+id_user+" and w.id_product=" + id_product)},
	addWatchList(id_user,id_product) {return db.load("insert into watchlist value ("+id_user+","+id_product+")")},
	updateInfo(id,name,email,phone,dob) {return db.load("update user u set u.name='" +name + "' ,u.email= '"+email+"', u.phone='" +phone+"', u.dob ='" + dob +"' where u.id=" +id)},
	updatePass(id,pass) {return db.load("update user u set u.password='" + pass +"' where u.id = "+id)},
	getCurrentPass(id) {return db.load("select u.password as password from user u where u.id="+id)}
}