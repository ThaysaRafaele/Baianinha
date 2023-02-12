/************** DECLARANDO CONSTANTES ***************/

const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);

// Abrir modal
const abrirModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0
    seleciona('.produtoWindowArea').style.display = 'flex'
    setTimeout(() => {
        seleciona('.produtoWindowArea').style.opacity = 1
    }, 150)
};

// FECHAR MODAL
const fecharModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0
    setTimeout(() => {
        seleciona('.produtoWindowArea').style.display = 'none'
    }, 500)
};

const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.produtoInfo--cancelButton, .produtoInfo--cancelMobileButton').forEach((item) => {
        item.addEventListener('click', fecharModal)
    })
};

//abrir e fechar o menu lateral
seleciona(".hamburguer").addEventListener("click", () =>
    seleciona(".container").classList.toggle("show-menu"));

    
//declarando os produtos 
let produtoJson = [
    {id:1, name:'Biquini rosa - zebra', img:'./assets/produtos/biquini-rosa-zebra.jpeg', price:65.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo XXXXXXX'},
    {id:2, name:'Biquini laranja e branco', img:'./assets/produtos/biquini-laranja-branco.jpeg', price:76.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo YYYYYYYYY'},
    {id:3, name:'Biquini rosa - onça', img:'./assets/produtos/biquini-rosa-onça.jpeg', price:58.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo ZZZZZZZZZZZ'},
    // {id:4, name:'Biquini rosa - onça', img:'./assets/produtos/biquini-rosa-onça.jpeg', price:58.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo ZZZZZZZZZZZ'},
    // {id:5, name:'Biquini rosa - onça', img:'./assets/produtos/biquini-rosa-onça.jpeg', price:58.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo ZZZZZZZZZZZ'},
    // {id:6, name:'Biquini rosa - onça', img:'./assets/produtos/biquini-rosa-onça.jpeg', price:58.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo ZZZZZZZZZZZ'}
];

const preencheDadosDosProdutos = (produtoItem, item) => {
    produtoItem.querySelector(".card-img-wrapper img").src = item.img;
    produtoItem.querySelector(".produto-item--name h2").innerHTML = item.name;
    produtoItem.querySelector(".produto-item--desc p").innerHTML = item.description;

};

const preencheDadosModal = (item) => {
    seleciona('.produtoBig img').src = item.img;
    seleciona('.produtoInfo h1').innerHTML = item.name;
    seleciona('.produtoInfo--desc').innerHTML = item.description;
    seleciona('.produtoInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;
};

/************** FIM DECLARAÇÕES ***************/

//Preenchendo os produtos nos cards de forma dinâmica
produtoJson.map((item, index) => {

    let produtoItem = seleciona(".models .card").cloneNode(true);

    seleciona(".produtos").append(produtoItem);

    //preencher os dados de cada produto
    preencheDadosDosProdutos(produtoItem, item);
    
    produtoItem.querySelector('.card-info button').addEventListener("click", () => {
        
        // Abrir modal
        abrirModal();
        
        // preenchimento dos dados na modal de forma dinâmica
        preencheDadosModal(item);
    })

    botoesFechar();
})
