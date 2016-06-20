module.exports=function(req,res,next){
	if(!req.session.curUser){
		res.render('login');
	}else{
		next();
	}
}


