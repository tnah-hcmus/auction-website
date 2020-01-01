const db = require('../utils/db');

module.exports = {
	getBidderbyID(id) {return db.load("SELECT u.name as name, u.email as email, u. FROM user u where u.id = "+id)},
	getTotalLike(id) {return db.load("SELECT Count(r.status) as totalLike FROM review r WHERE r.id_user="+id+" AND r.status=1")},	
	getTotalDisLike(id) {return db.load("SELECT Count(r.status) as totalLike FROM review r WHERE r.id_user="+id+" AND r.status=0")},
}