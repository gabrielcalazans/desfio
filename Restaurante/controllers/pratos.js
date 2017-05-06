module.exports = function(app){
	var validacao = require('../validation/pratos');

	var Restaurante = app.models.restaurantes;

	var PratosController = {
		index: function(req, res){
			var _id = req.params.id;
			Restaurante.findById(_id, function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao buscar dados.');
					res.render('pratos/index/', {lista: null} );
				}
				res.render('pratos/index', {lista: dados.pratos, id: _id});
			});
		},

		create: function(req, res){
			res.render('pratos/create', {model: new Restaurante(), id: req.params.id});
		},

		post: function(req,res){
			var _id = req.params.id;
			Restaurante.findById(_id, function(err,dados){
				var prato = req.body.pratos;
				dados.pratos.push(prato);
				dados.save(function(err){
					if(err){
						req.flash('erro', 'Erro ao cadastrar prato: '+err);						
					}
					res.redirect('/pratos/'+_id);
				});
			});			
		},

		delete: function(req, res){
			var _id = req.params.restaurante;
			Restaurante.findById(_id, function(err,dados){
				if(err){
					res.json(400, 'Erro ao excluir contato: '+err);
				}
				var pratoId = req.params.id;
				dados.pratos.id(pratoId).remove();
				dados.save(function(err){
					if(err){
						res.json(400, 'Erro ao excluir prato: '+err);
					}
					res.json(200, 'Registro excluído com sucesso!');
				});
			});
		},
	}

	return PratosController;

}