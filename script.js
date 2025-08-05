
function mostrarEndereco() {
  const tipo = document.getElementById("tipo").value;
  document.getElementById("enderecoContainer").style.display = tipo === "Delivery" ? "block" : "none";
}

const precos = {
  "Brigadeirudo": { "P": 198.00 }
};

const fatias = { "Mini": "1kg / 6 fatias", "P": "1.5kg / 15 fatias", "M": "2.5kg / 22 fatias", "G": "3.5kg / 30 fatias" };

function atualizarPreco() {
  const sabor = document.getElementById("sabor").value;
  const tamanho = document.getElementById("tamanho").value;
  if (precos[sabor] && precos[sabor][tamanho]) {
    return precos[sabor][tamanho];
  }
  return 0;
}

function gerarComprovante() {
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const tipo = document.getElementById("tipo").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const sabor = document.getElementById("sabor").value;
  const tamanho = document.getElementById("tamanho").value;
  const taxa = parseFloat(document.getElementById("taxaEntrega").value || 0);
  const adiantamento = parseFloat(document.getElementById("adiantamento").value || 0);
  const preco = atualizarPreco();

  let endereco = "";
  if (tipo === "Delivery") {
    endereco = `\n${document.getElementById("rua").value}, ${document.getElementById("numero").value}\n${document.getElementById("bairro").value}`;
  }

  const subtotal = preco + taxa;
  const total = subtotal - adiantamento;

  const comprovante = `*CONFIRMAÇÃO DO PEDIDO*

Cliente: *${nome}*
Telefone: *${telefone}*

${tipo === "Delivery" ? `*Endereço de entrega:*${endereco}` : ""}

${tipo}: ${data} às ${hora}

*Pedido:*
1 - Bolo ${sabor} (${tamanho}) - R$ ${preco.toFixed(2)}
${taxa > 0 ? `1 - Taxa de Entrega = R$ ${taxa.toFixed(2)}` : ""}

==========================
Subtotal: R$ ${subtotal.toFixed(2)}
Adiantamento: R$ ${adiantamento.toFixed(2)}
*Total a pagar: R$ ${total.toFixed(2)}*
==========================

_Estamos preparando o seu pedido._
_Agradecemos a preferência._`;

  document.getElementById("comprovante").innerText = comprovante;
}
