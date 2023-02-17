let modalKey = 0
// variavel para controlar a quantidade inicial de produtos na modal
let quantProdutos = 1

let cart = [] // carrinho

const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

//abrir e fechar o menu lateral
seleciona(".hamburguer").addEventListener("click", () =>
    seleciona("body").classList.toggle("show-menu"));

//fechar menu carrinho
seleciona(".menu-closer").addEventListener("click", () =>
    seleciona(".aside-carrinho").classList.remove("show"));

//declarando os produtos 
let produtoJson = [
    {id:1, name:'Biquini rosa - zebra', img:'./assets/produtos/biquini-rosa-zebra.jpeg', price:65.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo XXXXXXX'},
    {id:2, name:'Biquini laranja e branco', img:'./assets/produtos/biquini-laranja-branco.jpeg', price:76.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo YYYYYYYYY'},
    {id:3, name:'Biquini rosa - onça', img:'./assets/produtos/biquini-rosa-onça.jpeg', price:58.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo ZZZZZZZZZZZ'},
    {id:4, name:'Biquini preto - onça', img:'./assets/produtos/biquini-preto-onça-superior.jpeg', price:58.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo AAAAAAAAAA'},
    {id:5, name:'Biquini vermelho', img:'./assets/produtos/biquini-vermelho.jpeg', price:61.50, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo BBBBBBBBBBBBBBB'},
    {id:6, name:'Biquini rosa - onça', img:'./assets/produtos/biquini-rosa-onça.jpeg', price:58.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo ZZZZZZZZZZZ'},
    // {id:7, name:'Biquini laranja e branco', img:'./assets/produtos/biquini-laranja-branco.jpeg', price:76.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo YYYYYYYYY'},
    // {id:8, name:'Biquini rosa - onça', img:'./assets/produtos/biquini-rosa-onça.jpeg', price:58.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo ZZZZZZZZZZZ'},
    // {id:9, name:'Biquini preto - onça', img:'./assets/produtos/biquini-preto-onça-superior.jpeg', price:58.00, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo AAAAAAAAAA'},
    // {id:10, name:'Biquini vermelho', img:'./assets/produtos/biquini-vermelho.jpeg', price:61.50, sizes:['P', 'M', 'G'], description:'Produto indicado para formato de corpo BBBBBBBBBBBBBBB'},
];

const abrirModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0 // transparente
    seleciona('.produtoWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.produtoWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.produtoWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.produtoInfo--cancelButton, .produtoInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDosProdutos = (produtoItem, item, index) => {
	produtoItem.setAttribute('data-key', index)
    produtoItem.querySelector('.produto-item--img img').src = item.img
    produtoItem.querySelector('.produto-item--price').innerHTML = formatoReal(item.price)
    produtoItem.querySelector('.produto-item--name').innerHTML = item.name
    produtoItem.querySelector('.produto-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.produtoBig img').src = item.img
    seleciona('.produtoInfo h1').innerHTML = item.name
    seleciona('.produtoInfo--desc').innerHTML = item.description
    seleciona('.produtoInfo--actualPrice').innerHTML = formatoReal(item.price)
}

// aula 05
const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passei
    // do .produto-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.produto-item').getAttribute('data-key')

    // garantir que a quantidade inicial de produtos é 1
    quantprodutos = 1

    // Para manter a informação de qual produto foi clicada
    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    // tirar a selecao de tamanho atual e selecionar o tamanho grande
    seleciona('.produtoInfo--size.selected').classList.remove('selected')

    // selecionar todos os tamanhos
    selecionaTodos('.produtoInfo--size').forEach((size, sizeIndex) => {
        // selecionar o tamanho grande
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = produtoJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    selecionaTodos('.produtoInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o q clicou
            // tirar a selecao de tamanho atual e selecionar o tamanho grande
            seleciona('.produtoInfo--size.selected').classList.remove('selected')
            // marcar o que vc clicou, ao inves de usar e.target usar size, pois ele é o item dentro do loop
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
    })

    seleciona('.produtoInfo--qtmenos').addEventListener('click', () => {
        if(quantprodutos > 1) {
            quantprodutos--
            seleciona('.produtoInfo--qt').innerHTML = quantprodutos	
        }
    })
}

const adicionarNoCarrinho = () => {
    seleciona('.produtoInfo--addButton').addEventListener('click', () => {

        // pegar dados da janela modal atual
    	// qual produto? pegue o modalKey para usar produtoJson[modalKey]
    	// tamanho
	    let size = seleciona('.produtoInfo--size.selected').getAttribute('data-key')
	    // quantidade = quantprodutos
        // preco
        let price = seleciona('.produtoInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
    
        // um identificador que junte id e tamanho
	    // concatenar as duas informacoes separadas por um símbolo, vc escolhe
	    let identificador = produtoJson[modalKey].id+'t'+size

        // antes de adicionar verificar se ja tem aquele codigo e tamanho
        // para adicionar a quantidade
        let key = cart.findIndex( (item) => item.identificador == identificador )

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantprodutos
        } else {
            // adicionar objeto produto no carrinho
            let produto = {
                identificador,
                nome: produtoJson[modalKey].name,
                id: produtoJson[modalKey].id,
                size, // size: size
                qt: quantprodutos,
                price: parseFloat(price) // price: price
            }

            produto.price = (produto.price).toFixed(2)
            cart.push(produto)
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('.aside-carrinho').classList.add('show')
        seleciona('.header-Produtos').style.display = 'flex'
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('.aside-carrinho').classList.add('show')
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('.header-Produtos').style.display = 'flex'
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

        // criar as variaveis antes do for
		let subtotal = 0
		let desconto = 0
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
		for(let i in cart) {
			// use o find para pegar o item por id
			let produtoItem = produtoJson.find( (item) => item.id == cart[i].id )

            // em cada item pegar o subtotal
        	subtotal += cart[i].price * cart[i].qt

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
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('.header-Produtos').style.display = 'flex' : ''

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
	}
}

const finalizarCompra = () => {


    
    seleciona('.cart--finalizar').addEventListener('click', () => {
        
        let total = 0;

        let message = "Olá, gostaria de fechar o pedido de: ";
        let pedidoMsg = "";
        for(let i = 0; i < cart.length; i++){     
            pedidoMsg = pedidoMsg +  cart[i].nome +" - "+ cart[i].qt + " unidades" + " - valor: "+ cart[i].price+ " - tamanho: " + cart[i].size + " / ";
            total += cart[i].qt * cart[i].price;
        };

        let totalMsg = "Valor Total do pedido: "+ total;
        message = message + pedidoMsg + totalMsg;
        message = message.replace(/\s/g, '%20');

        seleciona('.linkFinalizar').href += message;   
        seleciona('.aside-carrinho').classList.remove('show')
    })
}

produtoJson.map((item, index) => {

    let produtoItem = seleciona(".models .produto-item").cloneNode(true);
    seleciona('.produto-area').append(produtoItem)
    //preencher os dados de cada produto
    preencheDadosDosProdutos(produtoItem, item, index);
    
    produtoItem.querySelector('.produto-item a').addEventListener('click', (e) => {
        e.preventDefault()

        let chave = pegarKey(e)

        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

        // pegar tamanho selecionado
        preencherTamanhos(chave)

		// definir quantidade inicial como 1
		seleciona('.produtoInfo--qt').innerHTML = quantprodutos

        // selecionar o tamanho e preco com o clique no botao
        escolherTamanhoPreco(chave)
    })

    botoesFechar()

}) // fim do MAPEAR produtoJson para gerar lista de produtos

// mudar quantidade com os botoes + e -
mudarQuantidade()
adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()