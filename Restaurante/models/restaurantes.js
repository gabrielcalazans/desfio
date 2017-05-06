var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-node.js');

module.exports = function(){	

	var pratosSechema = mongoose.Schema({
		prato: {type: String, required: true, trim: true},
		preco: {type: String, required: true},
	});

	var restauranteSchema = mongoose.Schema({
		nome : {type: String, required: true, trim: true},
		pratos: [pratosSechema],
	});

	return mongoose.model('Restaurantes', restauranteSchema);
}