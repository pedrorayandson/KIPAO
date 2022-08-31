function validar_senha() {
	var username = document.getElementById("username").value;
	var passw = document.getElementById("password").value;
	for (var i = 0; i < functionarios.length; i++) {
		var aux = functionarios[i];
		if (aux.username == username) {
			if (aux.password == passw) {
				localStorage.removeItem(0);
				localStorage.setItem(0, aux.username);
				window.location.href = "Menu.html";
				return
			} else {
				alert("Usuário ou senha errado");
				return
			}
		}
	}
	alert("Não foi encontrado usuário ou senha compatíveis");
}
function adicionar_tabela_carrinho(produto, qnt, precP) {
  tabela = document.getElementById("tabela_carrinho");
	var nova_linha;
  nova_linha = "<tr class='rows' id ="+produto.serial+"><td>"+produto.serial+"</td> <td>"+produto.name+"</td> <td>R$"+produto.price+"</td> <td name ="+produto.serial+">"+qnt+"</td> <td class="+produto.serial+" class = 'priceT'>R$"+precP.toFixed(2)+"</td></tr>";
  tabela.innerHTML = tabela.innerHTML + nova_linha;
}
var total = 0;
var ax;
function adicionar_serial() {
  var serial = document.getElementById("serial_input").value;
  var qnt = document.getElementById("qnt_input").value;
	showT = document.getElementById("valorFinal");
	if(qnt <= 0){
		alert("Valor da quantidade inválido!")
	}else{
		for (var i = 0; i < produtos.length; i++) {
	    var pro = produtos[i];
	    if (pro.serial == serial) {
	      var preco_parcial = pro.price * qnt;
				mergeRow(serial, qnt, preco_parcial);
				if(ax == false){
	      adicionar_tabela_carrinho(pro, qnt, preco_parcial);
			}
				total += preco_parcial;
				showT.innerHTML = "R$"+total.toFixed(2);
	      return
	    }
	  }
	  alert("Produto não encontrado");
	}
}
function mergeRow(id, qnt, priceP0) {
	var rowsA = document.getElementsByClassName("rows");
	var howMuch = document.getElementsByName(id);
	var priceP = document.getElementsByClassName(id);
	for (var i = 0; i < rowsA.length; i++) {
		if(rowsA[i].id == id){
			var pricePStr = priceP[0].textContent;
			var pricePFlt = parseFloat(pricePStr.substring(2, 7));
			var hMT = parseInt(howMuch[0].textContent) + parseInt(qnt);
			howMuch[0].innerHTML = hMT;
			var priceTot = pricePFlt + priceP0;
			priceP[0].innerHTML = "R$"+priceTot.toFixed(2)
			return ax = true;
		}
	}
	return ax = false;
}
function reset() {
	window.location.href = "CarrinhoKiPao.html";
}
function Del() {
	var id = document.getElementById("inputId").value;
	var idP = document.getElementById(id);
	var value = document.getElementsByClassName(id);
	var pArray = document.getElementsByClassName("rows");
	for (var i = 0; i < pArray.length; i++) {
		if(pArray[i].id == id){
			var v = value[0].textContent;
			var val = v.substring(2, 7);
			var valueOff = parseFloat(val);
			total -= valueOff;
			document.getElementById("valorFinal").innerHTML = "R$"+total.toFixed(2);
			idP.remove();
			return
		}
	}
	alert("Produto não existe ou não foi adicionado no carrinho");
}
	function showPersonalData() {
		var n = document.getElementById("namesUser");
		var a = document.getElementById("agesUser");
		var nat = document.getElementById("nationalitysUser");
		var bthdate = document.getElementById("birthDatesUser");
		var p = document.getElementById("positionsUser");
		var z = localStorage.getItem(0);
		for (var i = 0; i < functionarios.length; i++) {
			var f = functionarios[i];
			if(f.username == z){
				n.innerHTML = "<b>Nome:</b>&nbsp;"+f.name;
				a.innerHTML = "<b>&nbsp;&nbsp;Idade:</b>&nbsp;"+f.age;
				nat.innerHTML = "<b>Nacionalidade:</b>&nbsp;"+f.nationality;
				bthdate.innerHTML = "<b>&nbsp;&nbsp;Data de nascimento:</b>&nbsp;"+f.birthDate;
				p.innerHTML = "<b>Cargo:</b>&nbsp;"+f.position;
				return
			}
		}
	}
function showAndCloseDiv(div) {
	var dv = document.getElementById(div);
  if(dv.style.display == "block"){
		dv.style.display = "none";
	}else{
		dv.style.display = "block";
	}
}
function finish() {
	showAndCloseDiv("change");
	showAndCloseDiv("all2");
	document.getElementById("valueT").innerHTML = "<label>Preco total:</label><br><h1>R$"+total.toFixed(2)+"</h1>";
}
function closeDiv() {
	showAndCloseDiv("change");
	showAndCloseDiv("all2");
}
function calculateChange() {
	var v = document.getElementById("valueGave").value;
	if (v != '') {
		if(v < total){
			alert("Valor insuficiente!")
		}else{
		 var change = v - total;
		 document.getElementsByClassName("finalChange")[0].innerHTML = "Troco:<br><h1>R$"+change.toFixed(2)+"</h1>";
	}
}else{
	alert("Digite um valor")
 }
}
function finishS() {
	var vl = document.getElementById("valueGave").value;
	var p = document.getElementsByClassName("finalChange")[0].textContent;
	if(p == ''){
		alert("Calcule o troco!")
	}else{
	if (vl < total || vl == 0 || total == 0) {
		alert("Venda não feita");
	}else{
		alert("Compra finalizada com sucesso!");
		window.location.href = "Menu.html"
	}
 }
}
function goToLogin() {
	window.location.href = "KiPao.html"
}
function finishC() {
	alert("Compra finalizada com sucesso!!");
	window.location.href = "Menu.html";
}
function moneyOption() {
	document.getElementById("change").innerHTML = "<span id='valueT'><label>Preco total:</label><br><h1>R$"+total.toFixed(2)+"</h1></span><input class = 'close' onclick='back()' type = 'button' value='↩'><p id='valueT'></p><label for='valueGave'>Valor entregue e troco:</label> <input id='valueGave' type='number'><button onclick='calculateChange()'>Calcular</button>"+
	"<p class='finalChange'></p><button onclick='finishS()'>Finalizar</button>";
}
function back() {
	document.getElementById("change").innerHTML = '<input class = "close" type="button" onclick="closeDiv()" value="X"><span id="valueT"><label>Preco total:</label><br><h1>R$'+total.toFixed(2)+'</h1></span><label>Formas de pagamento:</label>'+
	'<button onclick="moneyOption()" class = "moneyB"><i class="fa-solid fa-money-bill-wave"></i> A dinheiro</button>'+
	'<button onclick="cardOption()" class="cardB"><i class="fa-solid fa-credit-card"></i> Cartões</button><button onclick="pixOption()" class="pixB"><i class="fa-brands fa-pix"></i> Pix</button>';
}
function cardOption() {
	document.getElementById("change").innerHTML = "<span id='valueT'><label>Preco total:</label><br><h1>R$"+total.toFixed(2)+"</h1></span><input class = 'close' onclick='back()' type = 'button' value='↩'>"+
	"<ul><li>Insira o cartão na maquininha.</li><li>comfirme a compra após passar o cartão na maquininha.</li></ul><br><button onclick='finishC()'>Comfirmar compra</button>"
}
function pixOption(){
	document.getElementById("change").innerHTML = "<span id='valueT'><label>Preco total:</label><br><h1>R$"+total.toFixed(2)+"</h1></span><input class = 'close' onclick='back()' type = 'button' value='↩'>"+
	"<span class='spanO'><label>Chave pix CNPJ:</label><br><h2>29026341600</h2><br><ul><li>O cliente deve inserir e transferir para Ki Pão ltda.</li><li>Após a apresentação do comprovante aperte em Comfirmar compra.</li></ul></span><button onclick='finishC()'>Comfirmar compra</button>"
}
function adicionar_produto(){
	var nome = document.getElementById("Nome_Produto").value
	var preco = document.getElementById("Preco_Produto").value
	var serial = document.getElementById("Serial_Produto").value
	var Marca = document.getElementById("Marca_Produto").value
	var add = document.getElementById("add_product")
	if (nome == ""){
		alert("Não foi informado o nome do produto")
	}
	else if (preco == ""){
		alert("Não foi informado o preço do produto")
	}
	else if (serial == ""){
		alert("Não foi informado o serial/id do produto")
	}
	else if (Marca == ""){
		alert("Não foi informado a marca do produto")
	}
	else{
	adicionarProduto = "<tr><td>"+serial+"</td>   <td>"+nome+"</td>   <td>"+preco+"</td>  <td>"+Marca+"</td>   </tr>"
	add.innerHTML = add.innerHTML + adicionarProduto}
}
function Zerar() {
	window.location.href = "Ki Pão-Adicionar produto.html";
}
function checkInput() {
    var input = false
    var serial = document.getElementById("serial").value
    var name = document.getElementById("name").value
    var price = document.getElementById("price").value
    var brand = document.getElementById("brand").value

    if (serial === "") {
        alert("Serial não foi colocado no input");
        input = true
    } else if (name === "") {
        alert("Nome não foi colocado no input");
        input = true
    } else if (price === "") {
        alert("Preço não foi colocado no input");
        input = true
    } else if (brand == ""){
    	alert("Marca do Produto não foi colocado no input")
    	input = true
    }
    return input;
}

function EditarProduto(ad) {
    var posicao = parseInt(document.getElementById("posicao").value) - 1
    var serial = document.getElementById("serial").value
    var name = document.getElementById("name").value
    var price = document.getElementById("price").value
    var brand = document.getElementById("brand").value


    if (!checkInput()) {
        produtos[posicao]["name"] = name
        produtos[posicao]["price"] = price
        produtos[posicao]["serial"] = serial
        produtos[posicao]["brand"] = brand
        Mostra()
    }
}
function Salvar() {
	alert("Os produtos foram editado com sucesso")
	window.location.href = "Menu.html"
}
function zero(){
	window.location.href = "Ki Pão-Editar produto.html"
}
function Mostra() {
    var ad = document.getElementById("product")
    ad.innerHTML = "<th>Id do Produto</th><th>Nome do Produto</th><th>Preço do Produto</th><th>Marca do Produto"

    for (var i = 0; i < produtos.length; i++) {
        var produto = produtos[i]
        var a = "<tr><td>" + produto["serial"] + "</td>   <td>" + produto["name"] + "</td>   <td>" + produto["price"] + "</td>   <td> " + produto["brand"] + "</td>  </tr> "
        ad.innerHTML = ad.innerHTML + a
    }

    for (var i = 1; i < ad.rows.length; i++) {
        ad.rows[i].onclick = function() {
            document.getElementById("posicao").value = this.rowIndex
            document.getElementById("serial").value = this.cells[0].innerHTML;
            document.getElementById("name").value = this.cells[1].innerHTML;
            document.getElementById("price").value = this.cells[2].innerHTML;
            document.getElementById("brand").value = this.cells[3].innerHTML;
        }
    }
}
Mostra()
function Remover(){
    var posicao = document.getElementById("posicao").value
    if(posicao===""){
        alert("Esse produto não existe")
    }else{
        produtos.splice(parseInt(posicao)-1, 1)
        Mostra()
    }
}
function z(){
	window.location.href = "Ki Pão-Remover produto.html"
}
function savee(){
	alert("Os produtos foram removido com sucesso")
	window.location.href = "Menu.html"
}
function adicionar_usuario(){
	var nome = document.getElementById("Nome_Usuario").value
	var username = document.getElementById("Username_Usuario").value
	var pass = document.getElementById("Password_Usuario").value
	var age = document.getElementById("Age_Usuario").value
	var nationality = document.getElementById("nationality_Usuario").value
	var birthDate = document.getElementById("birthDate_Usuario").value
	var position = document.getElementById("position_Usuario").value
	var addd = document.getElementById("add_productt")
	if (nome == ""){
		alert("Não foi informado o nome do usuario")
	}
	else if (username == ""){
		alert("Não foi informado o username do usuario")
	}
	else if (pass == ""){
		alert("Não foi informado a senha do usuario")
	}
	else if (age == ""){
		alert("Não foi informado a idade do usuario")
	}
	else if (nationality == ""){
		alert("Não foi informado a nacionalidade do usuario")
	}
	else if (birthDate == ""){
		alert("Não foi informado a data de nascimento do usuario")
	}
	else if (position == ""){
		alert("Não foi informado a posição do usuario")
	}
	else{
		adicionarProdutoo = "<tr><td>"+nome+"</td>   <td>"+username+"</td>   <td>"+pass+"</td>  <td>"+age+"</td>  <td>"+nationality+"</td>  <td>"+birthDate+"</td>   <td>"+position+"</td>  </tr>"
		addd.innerHTML = addd.innerHTML + adicionarProdutoo
}
}
function zerarr(){
	window.location.href = "Ki Pão-Adicionar usuário.html"
}
function salvarr(){
		window.location.href = "Menu.html"
}
function check() {
    var input = false
    var name = document.getElementById("name").value
	var username = document.getElementById("username").value
	var password = document.getElementById("password").value
	var age = document.getElementById("password").value
	var nationality = document.getElementById("age").value
	var birth = document.getElementById("birth").value
	var position = document.getElementById("position").value

    if (name === "") {
        alert("O nome do usuario não foi colocado no input");
        input = true
    } else if (username === "") {
        alert("Username do usuario não foi colocado no input");
        input = true
    } else if (password === "") {
        alert("A senha do usuario não foi colocado no input");
        input = true
    } 
    else if (age === "") {
        alert("A idade do usuario não foi colocado no input");
        input = true
    } 
   else if (nationality == ""){
    	alert("A nacionalidade do usuario não foi colocado no input")
    	input = true
    }
    else if (birth == ""){
    	alert("A data de nascimento do usuario não foi colocado no input")
    	input = true
    }
    else if (position == ""){
    	alert("A posição que o ocupa o usuario não foi colocado no input")
    	input = true
    }
    return input;
}
function EditarUsuario(ado) {
	var posicaoo = parseInt(document.getElementById("posicao1").value) - 1
    var name = document.getElementById("name").value
	var username = document.getElementById("username").value
	var password = document.getElementById("password").value
	var age = document.getElementById("age").value
	var nationality = document.getElementById("nationality").value
	var birth = document.getElementById("birth").value
	var position = document.getElementById("position").value


    if (!check()) {
        functionarios[posicaoo]["name"] = name
        functionarios[posicaoo]["username"] = username
        functionarios[posicaoo]["password"] = password
        functionarios[posicaoo]["age"] = age
        functionarios[posicaoo]["nationality"] = nationality
        functionarios[posicaoo]["birthDate"] = birth
        functionarios[posicaoo]["position"] = position
        Mostraa()
    }
}
function Mostraa() {
    var ado = document.getElementById("product4")
    ado.innerHTML = "<th>Nome do Usuario</th><th>Username do Usuario</th><th>Senha do Usuario</th><th>Idade do Usuario</th><th>Nacionalidade do Usuario</th><th>Data de nascimento do Usuario</th><th>Função do Usuario"

    for (var i = 0; i < functionarios.length; i++) {
        var funcionario = functionarios[i]
        var a = "<tr><td>" + funcionario["name"] + "</td>   <td>" + funcionario["username"] + "</td>   <td>" + funcionario["password"] + "</td>  <td>" + funcionario["age"] + "</td>  <td> " + funcionario["nationality"] + "</td>  <td> " + funcionario["birthDate"] + "</td>  <td> " + funcionario["position"] + "</td> </tr> "
        ado.innerHTML = ado.innerHTML + a
    }

    for (var i = 1; i < ado.rows.length; i++) {
        ado.rows[i].onclick = function() {
            document.getElementById("posicao1").value = this.rowIndex;
            document.getElementById("name").value = this.cells[0].innerHTML;
            document.getElementById("username").value = this.cells[1].innerHTML;
            document.getElementById("password").value = this.cells[2].innerHTML;
            document.getElementById("age").value = this.cells[3].innerHTML;
            document.getElementById("nationality").value = this.cells[4].innerHTML;
            document.getElementById("birth").value = this.cells[5].innerHTML;
            document.getElementById("position").value = this.cells[6].innerHTML;
        }
    }
}
function Removerr(){
    var posicaoo = document.getElementById("posicao1").value
    if(posicaoo===""){
        alert("Esse produto não existe")
    }else{
        functionarios.splice(parseInt(posicaoo)-1, 1)
        Mostraa()
    }
}