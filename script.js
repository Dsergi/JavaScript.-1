/*  1. Продолжаем реализовывать модуль корзины:
Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.

2.* У товара может быть несколько изображений. Нужно:
Реализовать функционал показа полноразмерных картинок товара в модальном окне;
Реализовать функционал перехода между картинками внутри модального окна.*/


var basket = {    
    products: [],    
    basketText: function(){
        if (this.products.length == 0){
            return "Ваша корзина пуста";
        } else{
            return "В корзине: " + this.countBasketCount() + " товаров на сумму " + this.countBasketPrice() + " рублей";    
        }
    },
    
    countBasketPrice: function(){
        var sum = 0;
        for(var i = 0; i < this.products.length; i++){
            sum = sum + this.products[i].price * this.products[i].count;
        }
        return sum;
    },
    
    countBasketCount: function(){
        var sum = 0;
        for(var i = 0; i < this.products.length; i++){
            sum = sum + this.products[i].count;
        }
        return sum;
    },
    
    addProduct: function(product){        
        var foundProduct = this.products.find(x => x.id == product.id);         
        if ( foundProduct === undefined){
            this.products.push(product);        
        } else{
            ++foundProduct.count;    
        }
    }
}

products = [];
productImg = [];
$modalImg = "";
$modalOverlay = "";

window.addEventListener("load",init);

function init(){
    basket.products = [];
    $cart = document.getElementById("cart");
    $cart.classList.add("cart");    
    displayText($cart,basket.basketText());

    products = [
        {name: 'Товар-1', price: 1000, count: 1, src:"img/ProductPreview1.jpg", id: 0}, 
        {name: 'Товар-2', price: 2000, count: 1, src:"img/ProductPreview2.jpg", id: 1}, 
        {name: 'Товар-3', price: 3000, count: 1, src:"img/ProductPreview3.jpg", id: 2},
    ];

    productImg = [
        {src: ["img/Product1.jpg", "img/Product4.jpg", "img/Product5.jpg"], id: 0},
        {src: ["img/Product2.jpg", "img/Product6.jpg", "img/Product7.jpg", "img/Product8.jpg"], id: 1}, 
        {src: ["img/Product3.jpg", "img/Product9.jpg"], id: 2}, 
    ];
    
    displayCatalog(products);

    var $catalog = document.querySelector("#catalog");
    $catalog.addEventListener('click', handleCatalogClick);

    $modalImg = document.getElementById('modal-img');
    $modalOverlay = document.querySelector("#modal-overlay"),

    $closeButton = document.querySelector("#close-button");
    $closeButton.addEventListener("click", handleModalClick);

    $leftButton = document.querySelector("#left-button");
    $leftButton.addEventListener("click", handleLeftClick);

    $rightButton = document.querySelector("#right-button");
    $rightButton.addEventListener("click", handRightClick);
}

function handleModalClick(event){
    $modalOverlay.classList.toggle("closed");   
}

function handleLeftClick(event){    
    idImg = +$modalImg.dataset.idImg -1;
    displayProductImg($modalImg.dataset.id, idImg);
}


function handRightClick(event){    
    idImg = +$modalImg.dataset.idImg +1;
    displayProductImg($modalImg.dataset.id, idImg);
}


function displayProductImg(id, idImg){
    var id = id;    
    var foundProductImg = productImg.find(x => x.id == id);
    if (foundProductImg != undefined){        
        src = foundProductImg.src[idImg];
        if (src != undefined){
            $modalImg.innerHTML = "";
            var $productImg = document.createElement("img");
            $productImg.classList.add("productImg");
            $productImg.src = src;
            $modalImg.dataset.id = id;
            $modalImg.dataset.idImg = idImg;
            $modalImg.appendChild($productImg);          
        }
    }

    $rightButton = document.querySelector("#right-button");
    if (foundProductImg.src[idImg + 1] === undefined){
        $rightButton.disabled = true;
    }else{
        $rightButton.disabled = false;
    }

    $leftButton = document.querySelector("#left-button");
    if (foundProductImg.src[idImg - 1] === undefined){
        $leftButton.disabled = true;
    } else{
        $leftButton.disabled = false;
    }
}

function handleCatalogClick(event){
    if (event.target.tagName === "BUTTON"){
        var id = event.target.dataset.id;
        var foundProduct = products.find(x => x.id == id);
        if (foundProduct != undefined){
            basket.addProduct(foundProduct);
            $cart = document.getElementById("cart");
            $cart.classList.add("cart");    
            displayText($cart,basket.basketText());
        }        
    } else if (event.target.tagName === "IMG"){
        $modalOverlay.classList.toggle("closed");
        displayProductImg(event.target.dataset.id, 0)
    }
}

function displayText($dom,text){
    $dom.textContent = text;    
}

function displayCatalog(products){
    $productBox = document.getElementById("catalog");
    $productBox.classList.add("catalog");

    for(var i = 0; i < products.length; i++){

        var $product = document.createElement("div");
        $product.classList.add("product");
    
        var $productName = document.createElement("div");
        $productName.classList.add("productName");
    
        var $productImg = document.createElement("img");
        $productImg.classList.add("productImg");
    
        var $productPrise = document.createElement("div");
        $productPrise.classList.add("productPrise");
    
        var $productButton = document.createElement("button");
        $productButton.classList.add("productButton");

        $productName.textContent = products[i].name;
        $productImg.src = products[i].src;
        $productImg.dataset.id = products[i].id;
        $productPrise.textContent = products[i].price;
        $productButton.textContent = "добавить в корзину";
        $productButton.dataset.id = products[i].id;

        $productBox.appendChild($product);
        $product.appendChild($productName);
        $product.appendChild($productImg);
        $product.appendChild($productPrise);
        $product.appendChild($productButton);   
    }
    displayText($cart,basket.basketText());
}
