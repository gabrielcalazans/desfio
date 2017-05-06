module.exports = function(app){

	var restaurante = app.controllers.restaurantes;

	app.route('/restaurantes').get(restaurante.index)
		.post(restaurante.search);
		
	app.route('/restaurantes/create')
		.get(restaurante.create)
		.post(restaurante.post);

	app.route('/restaurantes/show/:id').get(restaurante.show);
	app.route('/restaurantes/delete/:id').post(restaurante.delete);
	app.route('/restaurantes/edit/:id').get(restaurante.edit).post(restaurante.update);
	//app.route('/restaurantes').post(restaurante.search);
}