module.exports = function(req, res){
	req.assert('nome', 'Informe o nome do prato.').noEmpty();
	req.assert('preco', 'Informe o preço.').noEmpty();

	var validacaoErros = req.validationErrors() || [];

	if(validacaoErros.length > 0){
		validacaoErros.forEach(function(e){
			req.flash('erro', msg);
		});

		return false;
	}
	return true;
}