async function carregar(){
  const res = await fetch('http://localhost:3000/contas');
  const data = await res.json();

  const fixas = document.getElementById('fixas');
  const variaveis = document.getElementById('variaveis');
  fixas.innerHTML=''; 
  variaveis.innerHTML='';

  data.forEach(c=>{
    let html = `
      <div class="item">
        <div class="left">
          <input type="checkbox" ${c.pago?'checked':''} onclick="toggle(${c.id})">
          <div>
            <div class="name">${c.nome}</div>
            <div class="sub">vence dia ${new Date(c.vencimento).getDate()}</div>
          </div>
        </div>
        <div class="value">
          <strong>R$ ${c.valor}</strong>
        </div>
      </div>`;

    if(c.tipo==='fixa') fixas.innerHTML += html;
    else variaveis.innerHTML += html;
  });
}

async function addConta(){
  const nome = document.getElementById('nome').value;
  const valor = document.getElementById('valor').value;
  const vencimento = document.getElementById('vencimento').value;
  const tipo = document.getElementById('tipo').value;

  await fetch('http://localhost:3000/contas',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({nome,valor,vencimento,tipo})
  });

  carregar();
}

async function toggle(id){
  await fetch(`http://localhost:3000/contas/${id}`,{method:'PUT'});
  carregar();
}

/* ✅ NOVO: MENU ATIVO AUTOMÁTICO */
function ativarMenu() {
  const itens = document.querySelectorAll('.menu p');

  itens.forEach(item => {
    item.addEventListener('click', () => {
      itens.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/* INIT */
carregar();
ativarMenu();