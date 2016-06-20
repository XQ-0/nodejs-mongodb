var express = require('express');
var router = express.Router();

var NewsDao = require('../module/newsdao');

// 首页登录
router.get('/',function(req,res){
	res.render('login');
});

router.get('/register',function(req,res){
	res.render('register');
});

router.post('/registerYes',function(req,res){
	var u = req.body;
	var newsDao= new NewsDao(u);
	newsDao.saveU(function(err,r){
		res.render('regYes');
	})
});


router.post('/dologin',function(req,res){

	var name = req.body.uname;
	var pwd = req.body.upwd;

	var newsDao= new NewsDao();

	newsDao.findU(name,function(err,arr){
		console.log(arr);
		console.log(err)
		if(arr!=null && arr.length>0){

				var users= req.app.locals.users;
	
				for(var i=0;i<users.length;i++){
					if(name==users[i].account
						&& pwd==users[i].pwd){
						//保存用户的session中
						req.session.curUser = users[i];
						break;
					}
				}


			res.render('index');
		}else{
			res.render('no');
		}
	})

	
});


// router.post('/dologin',function(req,res){
// 	var name = req.body.uname;
// 	var pwd = req.body.upwd;
// 	var users= req.app.locals.users;
// 	for(var i=0;i<users.length;i++){
// 		if(name==users[i].account
// 			&& pwd==users[i].pwd){
// 			//保存用户的session中
// 			req.session.curUser = users[i];
// 			break;
// 		}
// 	}
// 	if(req.session.curUser){
// 		res.render('index');
// 	}else{
// 		res.send('登录失败！请重新登录');
// 	}
// });

module.exports = router;