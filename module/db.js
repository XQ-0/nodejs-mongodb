
// 连接数据库模块
var MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost:27017/jredu';

module.exports=function(callback){
	MongoClient.connect(url,function(err,db){
		callback(err,db)
	})
}
