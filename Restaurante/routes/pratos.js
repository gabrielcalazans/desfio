module.exports = function(app){

	var prato = app.controllers.pratos;

	app.route('/pratos/:id')
		.get(prato.index);
	app.route('/pratos/create/:id')
		.get(prato.create)
		.post(prato.post);
	app.route('/pratos/delete/:id/:restaurante').post(prato.delete);
}