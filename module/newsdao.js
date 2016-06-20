
var connect = require('./db');

var ObjectId = require('mongodb').ObjectId;

// 新增
// 列表
// 删除

function NewsDao(news){
	this.news=news;
}

module.exports=NewsDao;

// 新增
// 用prototype一个save方法增加
NewsDao.prototype.save=function(callback){
	var n=this.news;
	//操作数据库
	connect(function(err,db){
		if(err){
			callback(err);
		}else{
			var collection=db.collection('News');
			collection.insertOne(n,function(err,r){
				db.close();
				callback(err,r);
			})
		}
	})
}

// 列表
NewsDao.prototype.findAll=function(callback){
	connect(function(err,db){
		if(err){
			callback(err);
		}else{
			var collection=db.collection('News');
			collection.find().toArray(function(err,arr){
				db.close();
				callback(err,arr);
			})
		}
	})
}

// 删除 用自身的_id
NewsDao.prototype.del = function(id,callback) {
    connect(function(err, db) {
        if (db) {
            var n = db.collection('News');
            n.deleteOne({_id:new ObjectId(id)},function(err,r){
            	db.close();
                callback(err,r);
            })
        }else{
        	 callback(err);
        }
    })
}

//分页查询
NewsDao.prototype.page = function(pageSize,skipSize,callback){
	connect(function(err,db){
		if(db){
			var collection = db.collection('News');
			collection.find().limit(pageSize).skip(skipSize).toArray(function(err,arr){
				collection.find().count(function(err,count){
					db.close();
					callback(err,arr,count);
				});
				
			});
		}else{
			callback(err);
		}
	});
}


// 保存注册用户的
NewsDao.prototype.saveU=function(callback){

	//操作数据库
	connect(function(err,db){
		if(err){
			callback(err);
		}else{
			var collection=db.collection('Users');
			collection.insertOne(n,function(err,r){
				db.close();
				callback(err,r);
			})
		}
	})
}
// 查找用户是否存在
NewsDao.prototype.findU=function(name,callback){
	connect(function(err,db){
		if(err){
			callback(err);
		}else{
			var collection=db.collection('Users');
			collection.find({uname:name}).toArray(function(err,arr){
				db.close();
				callback(err,arr);
			})
		}
	})
}
