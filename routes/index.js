var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({dest:'./public/uploads'}).array('imgfile',5);

var uploadfile = multer({dest:'./public/uploads'}).array('file',5);

var NewsDao = require('../module/newsdao');

router.get('/',function(req,res){
	res.render('index');
});

// 新闻增加
router.get('/add',function(req,res){
	res.render('add_news');
});
var n;
router.post('/addd',function(req,res){
	upload(req,res,function(err){
		if(err){
			res.send('上传失败！');
		}else{
			var t = req.body.title;
			var c = req.body.content;
			var uid=uuid();
			var date=new Date();
			var year=date.getFullYear();
			var month=date.getMonth()+1;
			var day=date.getDate();
			var hours=date.getHours();
			var minutes=date.getMinutes();
			var seconds=date.getSeconds();
			var r=year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
			var news={
				newsId:uid,
				title:t,
				content:c,
				date:r
			}
			var len = req.files.length;
			news.imgs=[];
			for(var i=0;i<len;i++){
				news.imgs[i]='/uploads/'+req.files[i].filename;
			}

		// mongoClient.connect(url,function(error,db){
			// 	if(db){
			// 		var news=db.collection('news');
			// 		news.insertOne(news,function(err,r){
			// 			db.close();
			// 			res.redirect('./newslist');
			// 		})
			// 	}
		// })

			// 用模块化写
			var newsDao= new NewsDao(news);
			newsDao.save(function(err,r){
				res.redirect('./page');

			})
		}
	});
})
// 新闻列表
router.post('/newslist',function(req,res){
	var newsDao= new NewsDao();
	newsDao.findAll(function(err,arr){
		 // res.render('news_list',{n:arr,pages:totalPage});
		 res.redirect('./page');
	})
});
router.get('/newslist',function(req,res){
	var newsDao= new NewsDao();
	newsDao.findAll(function(err,arr){
		 res.redirect('./page');
	})
})

// get功能传参的删除 自身_id删除
router.get('/delNews',function(req,res){
	var id= req.query.newsId;
	var newsDao= new NewsDao();
	newsDao.del(id,function(err,r){
		res.redirect('./newslist');
	})
});

//分页查询
//每页显示的数量 2 pageSize
//符合条件的数据总数 total
//total%pageSize==0    pages = total/pageSize
//pages=total/pageSize+1

// router.get('/page',function(req,res){
// 	//请求的页码
// 	var pageNo= req.query.pageNo;
// 	var skip= (pageNo-1)*4;
// 	var newsDao = new NewsDao();
// 	newsDao.page(4,skip,function(err,arr,count){
// 		var totalPage = 0;
// 		if(count%4==0){
// 			totalPage = count/4;
// 		}else{
// 			totalPage = count/4+1;
// 		}
// 		res.render('news_list',{n:arr,pages:totalPage});
// 	});
// });

router.get('/page',function(req,res){
	  //请求的页码
	  var pageNo= req.query.pageNo;
	  var pr=null;
	  if(pageNo==undefined){
	    pageNo=1;
	  }
	  if (pageNo>1){
	    pr=pageNo-1;
	  }else{
	    pr=1;
	  }
	  var skip= (pageNo-1)*2;
	  var newsDao = new NewsDao();
	  console.log("**************");
	  console.log(pageNo);
	  console.log(skip);

	  newsDao.page(4,skip,function(err,arr,count){
	      console.log(count);
	      var totalPage = 0;
	      if(count%4==0){
				totalPage = count/4;
			}else{
				totalPage = count/4+1;
			}
	      var ne=null;
	      if (pageNo<totalPage-1) {
	        ne=parseInt(pageNo)+1;
	      }else{
	        ne=pageNo;
	      }
	      console.log(totalPage);
	      res.render('news_list',{n:arr,pages:totalPage,pre:pr,next:ne});
	  });

      
});









// 以下为文件的部分
// 添加文件
router.get('/addfile',function(req,res){
	res.render('add_file');
})

router.post('/adddf',function(req,res){
	uploadfile(req,res,function(err){
		if(err){
			res.send('上传失败！');
		}else{
			var news = req.body;
			news.newsId=uuid();

			var date=new Date();
			var year=date.getFullYear();
			var month=date.getMonth()+1;
			var day=date.getDate();
			var hours=date.getHours();
			var minutes=date.getMinutes();
			var seconds=date.getSeconds();
			news.date=year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;

			var len = req.files.length;
			news.imgs=[];
			for(var i=0;i<len;i++){
				news.imgs[i]='/uploads/'+req.files[i].filename;
			}

			var newsDao= new NewsDao(news);
			newsDao.save(function(err,r){
				res.redirect('./filelist');
			})
		}
	});
})

// 文件列表
var m;
router.post('/filelist',function(req,res){
	var newsDao= new NewsDao();
	newsDao.findAll(function(err,arr){
		 res.redirect('./pagef');
	})
})
router.get('/filelist',function(req,res){
	var newsDao= new NewsDao();
	newsDao.findAll(function(err,arr){
		 // res.render('files_list',{m:arr});
		  res.redirect('./pagef');
	})
})

router.get('/delNews1',function(req,res){
	var id= req.query.newsId;
	var newsDao= new NewsDao();
	newsDao.del(id,function(err,r){
		res.redirect('./filelist');
	})
});



//分页查询
//每页显示的数量 2 pageSize
//符合条件的数据总数 total
//total%pageSize==0    pages = total/pageSize
//pages=total/pageSize+1

router.get('/pagef',function(req,res){
	//请求的页码
	var pageNo= req.query.pageNo;
	var skip= (pageNo-1)*3;
	var newsDao = new NewsDao();
	newsDao.page(3,skip,function(err,arr,count){
		var totalPage1 = 0;
		if(count%3==0){
			totalPage1 = count/3;
		}else{
			totalPage1 = count/3+1;
		}
		res.render('files_list',{m:arr,pages:totalPage1});
	});
});



function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}



module.exports = router;
