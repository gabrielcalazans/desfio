module.exports = function(app){
	var validacao = require('../validation/restaurantes');

	var Restaurante = app.models.restaurantes;

	var RestaurantesController = {
		index: function(req, res){
			Restaurante.find(function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao buscar dados: ' + err);
					res.redirect('/restaurantes');
				}else{
					res.render('restaurantes/index', {lista: dados});
				}
			});
			//res.render('restaurantes/index')
		},

		search: function(req, res){

			Restaurante.find({nome: new RegExp(req.body.nome, 'i')}, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao buscar restaurante: ' + err);
					res.redirect('/restaurantes');
				}else{
					res.render('restaurantes/index', {lista: data});
				}
			});
		},

		create: function(req, res){
			res.render('restaurantes/create', {rest: new Restaurante()})
		},

		post: function(req, res){
			if(validacao(req, res)){
				var model = Restaurante();
				model.nome = req.body.nome;

				Restaurante.findOne({'nome': model.nome}, function(err, data){
					if(data){
						req.flash('erro', 'Este restaurante já está cadastrado, tente outro');
						res.render('restaurantes/create', {rest: model});
					}else{
						model.save(function(err){
							if(err){
								res.flash('erro', 'Erro ao cadastrar.' + err);
								res.render('restaurantes/create', {rest: req.body});
							}else{
								req.flash('info', 'Restaurante cadastrado com sucesso!');
								res.redirect('/restaurantes');
							}
						});
					}
				});

			}else{
				res.render('restaurantes/create', {rest: req.body});
			}
			
		},

		show: function(req, res){
			Restaurante.findById(req.params.id, function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao visualizar.' + err);
					res.redirect('/restaurantes');
				}else{
					res.render('restaurantes/show', {dados: dados});
				}
			});
		},

		delete: function(req, res){
			Restaurante.remove({_id: req.params.id}, function(err){
				if(err){
					req.flash('erro', 'Erro ao excluir.' + err);
					res.redirect('/restaurantes');
				}else{
					req.flash('info', 'Registro excluido com sucesso.');
					res.redirect('/restaurantes');
				}
			});
		},

		edit: function(req, res){
			Restaurante.findById(req.params.id, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao editar.' + err);
					res.redirect('/restaurantes');
				}else{
					res.render('restaurantes/edit', {dados: data});
				}
			});
		},

		update: function(req, res){
			if(validacao(req, res)){
				Restaurante.findById(req.params.id, function(err, data){
					var model = data;
					model.nome = req.body.nome;

					model.save(function(err){
						if(err){
							req.flash('erro', 'Erro ao editar.' + err);
							res.render('restaurantes/edit', {dados: model});
						}else{
							req.flash('info', "Registro editado com sucesso.");
							res.redirect('/restaurantes');
						}
					})
				});
			}else{
				res.render('restaurantes/edit', {rest: req.body});
			}
		}
	}

	return RestaurantesController;
}