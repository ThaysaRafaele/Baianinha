document.querySelector(".hamburguer").addEventListener("click", () =>
    document.querySelector(".container").classList.toggle("show-menu"));


const Modal = {
    open(id, title){

        // Abrir modal

        document.querySelector('.produtoWindowArea').style.display = 'flex';

        if(id == "comprar1"){
            document.querySelector('.produtoBig img').src = document.querySelector("#produto1").src;
            document.querySelector('.produtoInfo h1').innerHTML = title;
        }

        if(id == "comprar2"){
            document.querySelector('.produtoBig img').src = document.querySelector("#produto2").src;
            document.querySelector('.produtoInfo h1').innerHTML = title;
        }

        if(id == "comprar3"){
            document.querySelector('.produtoBig img').src = document.querySelector("#produto3").src;
            document.querySelector('.produtoInfo h1').innerHTML = title;
        }

    }
}


// fechar o modal

document.querySelector('.produtoInfo--cancelButton').addEventListener('click', () => {
    document.querySelector('.produtoWindowArea').style.display = 'none'
})

document.querySelector('.produtoInfo--cancelMobileButton').addEventListener('click', () => {
    document.querySelector('.produtoWindowArea').style.display = 'none'
})