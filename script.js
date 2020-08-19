/*  1. Добавить возможность не только смотреть состав корзины, 
но и редактировать его (изменяя количество и удаляя товары), 
обновляя общую стоимость или выводя сообщение «Корзина пуста».
2. Реализовать сохранение состояния корзины между сессиями и его загрузку, 
используя localstorage, JSON.stringify и JSON.parse (https://learn.javascript.ru/localstorage), 
подумать в каком формате сохранять состав корзины (ссылка на товар).*/


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
        localStorage.setItem("myCart", JSON.stringify(this.products));
    }
}

products = [];
productImg = [];
$modalImg = "";
$modalOverlay = "";

window.addEventListener("load",init);

function init(){
    basket.products = [];

    cartProducts = JSON.parse(localStorage.getItem("myCart"));
    if (cartProducts.length > 0){
        basket.products = cartProducts;
    }

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

    cartProducts = JSON.parse(localStorage.getItem("myCart"));

    displayCart(cartProducts);

    var $order = document.querySelector("#order");

    $order.addEventListener('click', handleLeftRightClick);

    updateOrder();

    if (cartProducts.length === 0){
        document.querySelector("#buttonRight").disabled = true;
    } else{
        document.querySelector("#buttonRight").disabled = false;
    }
}

function updateOrder(){
    var $cart = document.querySelector("#cart");    
       
    console.log($cart.style.display );

    $cart.style.display = "none"    
    
}  

function handleCartsClick(event){
    
    if (event.target.tagName === "BUTTON"){
        var id = event.currentTarget.dataset.id;
        if (event.target.textContent === "-"){
            var foundProduct = cartProducts.find(x => x.id == id);
            if (foundProduct != undefined){
                --foundProduct.count; 
                if (foundProduct.count === 0){
                    
                    var index = cartProducts.indexOf(foundProduct);
                    if (index >= 0) {
                        cartProducts.splice(index, 1);
                        
                        event.currentTarget.remove();
                    } 
                }else {
                    event.currentTarget.querySelector(".count").textContent = foundProduct.count;
                    event.currentTarget.querySelector(".sum").textContent  = +foundProduct.price * foundProduct.count;
                }
                localStorage.setItem("myCart", JSON.stringify(cartProducts));
            }
        } else if (event.target.textContent === "+"){
            var foundProduct = cartProducts.find(x => x.id == id);
            if (foundProduct != undefined){
                ++foundProduct.count; 
                event.currentTarget.querySelector(".count").textContent = foundProduct.count;
                event.currentTarget.querySelector(".sum").textContent  = +foundProduct.price * foundProduct.count;
                localStorage.setItem("myCart", JSON.stringify(cartProducts));
            }
        } else if (event.target.textContent === "удалить"){
            var foundProduct = cartProducts.find(x => x.id == id);
            if (foundProduct != undefined){
                
                var index = cartProducts.indexOf(foundProduct);
                if (index >= 0) {
                    cartProducts.splice(index, 1);
                    
                    event.currentTarget.remove();
                    localStorage.setItem("myCart", JSON.stringify(cartProducts));
                } 
            }
        }

        if (cartProducts.length === 0){
            document.querySelector("#buttonRight").disabled = true;
        } else{
            document.querySelector("#buttonRight").disabled = false;
        }
    }
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

function refreshPage(){
    window.location.reload();
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
function displayCart(products){

    
    var $cart = document.getElementById("cart");
 
   
    for(var i = 0; i < products.length; i++){

        var $template = document.querySelector("#template").children[0].cloneNode(true);

        $template.querySelector(".productName").textContent = products[i].name;
        $template.querySelector(".productImg").src = products[i].src;
        $template.querySelector(".count").textContent = products[i].count;
        $template.querySelector(".productPrise").textContent = products[i].price;
        $template.querySelector(".productButtonAdd").textContent = "+";
        $template.querySelector(".productButtonRem").textContent = "-";
        $template.querySelector(".sum").textContent = +products[i].price * products[i].count;
        $template.querySelector(".productButtonDel").textContent = "удалить";
        $template.dataset.id = products[i].id;
        $cart.appendChild($template);
            
        $template.addEventListener('click', handleCartsClick);

    }
}
