module.exports=function(app){
	app.locals.users=[
		{account:'admin',pwd:'123'},
		{account:'zhangsan',pwd:'123'}
	];

	app.locals.news = new Array();
}