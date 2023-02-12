/************** DECLARANDO CONSTANTES ***************/
const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

// Abrir modal
const abrirModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0
    seleciona('.produtoWindowArea').style.display = 'flex'
    setTimeout(() => {
        seleciona('.produtoWindowArea').style.opacity = 1
    }, 150)
}

// FECHAR MODAL
const fecharModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0
    setTimeout(() => {
        seleciona('.produtoWindowArea').style.display = 'none'
    }, 500)
}

const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.produtoInfo--cancelButton, .produtoInfo--cancelMobileButton').forEach((item) => {
        item.addEventListener('click', fecharModal)
    })
}

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

const getKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passei
    let key =  e.target.closest(".card").getAttribute('data-key')
    
    // garantir que a quantidade inicial de produtos é 1
    quantprodutos = 1;

    // Para manter a informação de qual produto foi clicado
    modalKey = key;

    return key;
}

const preencherTamanhos = (key) => {
    // tirar a selecao de tamanho atual e selecionar o tamanho grande
    seleciona('.produtoInfo--size.selected').classList.remove('selected');

    // selecionar todos os tamanhos
    selecionaTodos('.produtoInfo--size').forEach((size, sizeIndex) => {
        // selecionar o tamanho grande
        (sizeIndex == 2) ? size.classList.add('selected') : '';
    });
}

const escolherTamanhoPreco = (key) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    selecionaTodos('.produtoInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
            // tirar a selecao de tamanho atual e selecionar o tamanho grande
            seleciona('.produtoInfo--size.selected').classList.remove('selected')
            // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

            // mudar o preço de acordo com o tamanho
            // seleciona('.produtoInfo--actualPrice').innerHTML = formatoReal(produtoJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.produtoInfo--qtmais').addEventListener('click', () => {
        quantprodutos++
        seleciona('.produtoInfo--qt').innerHTML = quantprodutos
    });

    seleciona('.produtoInfo--qtmenos').addEventListener('click', () => {
        if(quantprodutos > 1) {
            quantprodutos--
            seleciona('.produtoInfo--qt').innerHTML = quantprodutos	
        }
    });
}

const preencheDadosDosProdutos = (produtoItem, item, index) => {
    produtoItem.setAttribute('data-key', index);
    produtoItem.querySelector(".card-img-wrapper img").src = item.img;
    produtoItem.querySelector(".produto-item--name h2").innerHTML = item.name;
    produtoItem.querySelector(".produto-item--desc p").innerHTML = item.description;

}

const preencheDadosModal = (item) => {
    seleciona('.produtoBig img').src = item.img;
    seleciona('.produtoInfo h1').innerHTML = item.name;
    seleciona('.produtoInfo--desc').innerHTML = item.description;
    seleciona('.produtoInfo--actualPrice').innerHTML = formatoReal(item.price);
}

let modalKey = 0;
let quantProdutos = 1;
let cart = [];

/************** FIM DECLARAÇÕES ***************/

//Preenchendo os produtos nos cards de forma dinâmica
produtoJson.map((item, index) => {

    let produtoItem = seleciona(".models .card").cloneNode(true);
    seleciona(".produtos").append(produtoItem);

    //preencher os dados de cada produto
    preencheDadosDosProdutos(produtoItem, item, index);
    
    produtoItem.querySelector('.card-info button').addEventListener("click", (e) => {
        e.preventDefault();

        let chave = getKey(e);

        // Abrir modal
        abrirModal();
        
        // preenchimento dos dados na modal de forma dinâmica
        preencheDadosModal(item);

        // pegar tamanho selecionado
        preencherTamanhos(chave);
        
        // definir quantidade inicial como 1
		seleciona('.produtoInfo--qt').innerHTML = quantprodutos

        // selecionar o tamanho e preco(vai mudar o preço de acordo com a numeração??) com o clique no botao
        escolherTamanhoPreco(chave)
    })

    botoesFechar();
})

// mudar quantidade com os botoes + e -
mudarQuantidade()
