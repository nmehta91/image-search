'use strict';

var path = process.cwd();


module.exports = function (app) {

	app.get('/', function(req, res){
		res.redirect(process.env.APP_URL + "api/imagesearch/lolcats%20funny?offset=2");
	});
};
