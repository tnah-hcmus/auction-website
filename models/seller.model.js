const db = require('../utils/db');
module.exports = {
    getSellerbyID(id) { return db.load("SELECT u.name as name FROM user u, product p where p.id_owner = u.id AND p.id = " + id) },
    getProductbyID(id) { return db.load("SELECT p.name as name, p.current_price as price, p.id as id, p.auctionTime as auctionTime, p.details as detail,  p.startDate as dateStart, p.endDate as dateEnd, c.NAME as category, u.NAME as hold, u.email as bidRating, u.email as bidLink FROM product p, category c, user u where p.id_bidder = u.id and p.category = c.id and p.id = " + id) },
    getTotalLike(id) { return db.load("SELECT Count(r.status) as totalLike FROM review r WHERE r.id_user=" + id + " AND r.status=1") },
    getTotalDisLike(id) { return db.load("SELECT Count(r.status) as totaldisLike FROM review r WHERE r.id_user=" + id + " AND r.status=0") },
}