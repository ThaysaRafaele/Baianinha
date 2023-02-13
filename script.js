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

let modalKey = 0;
let quantProdutos = 1;
let cart = [];

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

const adicionarNoCarrinho = () => {
    seleciona('.produtoInfo--addButton').addEventListener('click', () => {

        // pegar dados da janela modal atual
    	// qual produto? pegue o modalKey para usar produtoJson[modalKey]
    	// console.log("produto " + modalKey)
    	// tamanho
	    let size = seleciona('.produtoInfo--size.selected').getAttribute('data-key')
	    // console.log("Tamanho " + size)
	    // quantidade
    	// console.log("Quant. " + quantprodutos)
        // preco
        let price = seleciona('.produtoInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
    
        // crie um identificador que junte id e tamanho
	    // concatene as duas informacoes separadas por um símbolo, vc escolhe
	    let identificador = produtoJson[modalKey].id+'t'+size

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let key = cart.findIndex( (item) => item.identificador == identificador )
        // console.log(key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantprodutos
        } else {
            // adicionar objeto produto no carrinho
            let produto = {
                identificador,
                Nome: produtoJson[modalKey].name,
                id: produtoJson[modalKey].id,
                size, // size: size
                qt: quantprodutos,
                price: parseFloat(price) // price: price
            }
            cart.push(produto)
            // console.log(produto)
            // console.log('Sub total R$ ' + (produto.qt * produto.price).toFixed(2))
        }

        fecharModal();
        abrirCarrinho();
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    // console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('.aside-carrinho').classList.add('show')
        seleciona('.produtos-header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('.aside-carrinho').classList.add('show')
            seleciona('.aside-carrinho').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('.aside-carrinho').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('.produtos-header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	seleciona('.menu-openner span').innerHTML = cart.length
	
	// mostrar ou nao o carrinho
	if(cart.length > 0) {

		// mostrar o carrinho
		seleciona('.aside-carrinho').classList.add('show')

		// zerar meu .cart para nao fazer insercoes duplicadas
		seleciona('.cart').innerHTML = ''

        // crie as variaveis antes do for
		let subtotal = 0
		let desconto = 0
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
		for(let i in cart) {
			// use o find para pegar o item por id
			let produtoItem = produtoJson.find( (item) => item.id == cart[i].id )
			// console.log(produtoItem)

            // em cada item pegar o subtotal
        	subtotal += cart[i].price * cart[i].qt
            //console.log(cart[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let produtoSizeName = cart[i].size

			let produtoName = `${produtoItem.name} (${produtoSizeName})`

			// preencher as informacoes
			cartItem.querySelector('img').src = produtoItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = produtoName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			// selecionar botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				// console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				// console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('.produtos-header').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		} // fim do for

		// fora do for
		// calcule desconto 10% e total
		//desconto = subtotal * 0.1
		desconto = subtotal * 0
		total = subtotal - desconto

		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		// ocultar o carrinho
		seleciona('.aside-carrinho').classList.remove('show')
		seleciona('.aside-carrinho').style.left = '100vw'
	}
}


const finalizarCompra = () => {


    
    seleciona('.cart--finalizar').addEventListener('click', () => {
        // console.log('Finalizar compra')
        // console.log(cart.length)
        // console.log(cart)
        
        let total = 0;

        let message = "Olá, gostaria de fechar o pedido de: ";
        let pedidoMsg = "";
        for(let i = 0; i < cart.length; i++){           
            pedidoMsg = pedidoMsg +  cart[i].Nome +" - "+ cart[i].qt + " unidades" + " - valor: "+ cart[i].price+ " - tamanho: " + cart[i].size + " / ";
            total += cart[i].qt * cart[i].price;
        };

        let totalMsg = "Valor Total do pedido: "+ total;
        message = message + pedidoMsg + totalMsg;
        message = message.replace(/\s/g, '%20');

        seleciona('.linkFinalizar').href += message;         

        console.log(seleciona(".linkFinalizar").href)

        seleciona('.aside-carrinho').classList.remove('show')
        seleciona('.aside-carrinho').style.left = '100vw'
        seleciona('.produtos-header').style.display = 'flex'
    })
}

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
mudarQuantidade();

// após selecionar tamanho e quantidade, adicionar ao carrinho

adicionarNoCarrinho();
atualizarCarrinho();
fecharCarrinho();
finalizarCompra();
