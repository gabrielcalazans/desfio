var url = require('url');

module.exports = function(req, res){
	var createUrl = url.parse(req.url).pathname == "/restaurantes/create";
	var updateUrl = !createUrl;

	req.assert('nome', 'Informe o nome do restaurante').notEmpty();

	var validateErros = req.validationErrors() || [];

	if(validateErros.length > 0){
		validateErros.forEach(function(e){
			req.flash('erro', e.msg);
		});
		return false;
	}else{
		return true;
	}
}