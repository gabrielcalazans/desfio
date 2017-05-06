$(document).ready(function(){
	$("#submit").click(function(){

		var erro = "";

		if($("#nome").val() == ""){
			erro += "<p>O campo nome deve ser informado</p>"
		}

		if(erro != null){
			$("#frm").attr("action","");
			$("#frm").submit();
			$("#erro").html(erro);
			$("#erro").css("color", "red");
			$("#erro").css("font-size", "14px");
		}else{
			$("#erro").hide();
		}

	});
});