/*1. Создать функцию, генерирующую шахматную доску. 
При этом можно использовать любые html-теги по своему желанию. 
Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. 
Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
2. Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру, например К – король, Ф – ферзь и т.п., 
причем все фигуры должны стоять на своих местах и быть соответственно черными и белыми.
3. *Заменить буквы, обозначающие фигуры картинками.*/
function chessboard() {
    var newTable = document.createElement( 'table' ),
        let = [ '','A','B','C','D','E','F','G','H','' ],
        black1 = [ '8','♜','♞','♝','♛','♚','♝','♞','♜','8' ],
        white1 = [ '1','♖','♘','♗','♕','♔','♗','♘','♖','1' ],
        black2 = [ '7','♟','♟','♟','♟','♟','♟','♟','♟','7' ],
        white2 = [ '2','♙','♙','♙','♙','♙','♙','♙','♙','2' ];
        
    for ( var i = 0, a = 9; i < 10, a >= 0; i++, a-- ) {
        var newTr = newTable.insertRow(i);
        for ( var j = 0; j < 10; j++ ) {            
            var newTd = newTr.insertCell( j );
            if ((i + j) % 2 == 0) {
                newTd.style.backgroundColor ="white";
            } else if (j!=0 & j!=9 & i!=0 & i!=9) {
                newTd.style.backgroundColor = "gray";
            }    
                    switch (i) {
                case 0:
                    newTd.innerText = let[ j ];
                    break;
                case 1:
                    newTd.innerHTML = black1[ j ];
                    break;
                case 2:
                    newTd.innerHTML = black2[ j ];
                    break;
                case 7:
                    newTd.innerHTML = white2[ j ];
                    break;
                case 8:
                    newTd.innerHTML = white1[ j ];
                    break;
                case 9:
                    newTd.innerText = let[ j ];
                    break;
                   
                default:
                    if ( j === 0 || j === 9 ) {
                        newTd.innerHTML = a;                        
                    }
                    break;
            }  
                

        }
    }
    document.body.appendChild( newTable );
};

chessboard();



/*4. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. 
Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
Пустая корзина должна выводить строку «Корзина пуста»;
Наполненная должна выводить «В корзине: n товаров на сумму m рублей».*/
var basket = {
    products: [],
    basketText: function(){
        if (this.products.length == 0){
            return "Корзина пуста";
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
            sum = sum + this.products[i].count; // почему кол-во при выводе несумируется? немогу понять...
        }
        return sum;
    }
}


function displayText(dom,text){
dom.textContent = text;    
}

var products = [
    {name: 'товар1', price: 1000, count: prompt ("товар1: укажите кол-во товара")}, 
    {name: 'товар2', price: 2000, count: prompt ("товар2: укажите кол-во товара")}, 
    {name: 'товар3', price: 3000, count: prompt ("товар3: укажите кол-во товара")},
];

basket.products = products;


cart = document.getElementById("cart");
cart.classList.add("cart");
cart.style.backgroundColor = "gray"
displayText(cart,basket.basketText());

/* 5.* Сделать так, чтобы товары в каталоге выводились при помощи JS:
Создать массив товаров (сущность Product);
При загрузке страницы на базе данного массива генерировать вывод из него. 
HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.*/

function displayCatalog(products){          
            
    productBox = document.getElementById("catalog");
    productBox.classList.add("catalog");
    
    var product = document.createElement("div");
    product.classList.add("product");

    var productName = document.createElement("div");
    productName.classList.add("productName");
    productName.classList.add("productHeadline");
    
    var productPrise = document.createElement("div");
    productPrise.classList.add("productPrise");
    productPrise.classList.add("productHeadline");
    
    productName.textContent = "Наименование Товара";
    productPrise.textContent = "Цена";
    
    productBox.appendChild(product);
    product.appendChild(productName);    
    product.appendChild(productPrise);
        
    for(var i = 0; i < products.length; i++){

        var product = document.createElement("div");
        product.classList.add("product");
    
        var productName = document.createElement("div");
        productName.classList.add("productName");
                
        var productPrise = document.createElement("div");
        productPrise.classList.add("productPrise");
               
        productName.textContent = products[i].name;
        productPrise.textContent = products[i].price;        

        productBox.appendChild(product);
        product.appendChild(productName);
        product.appendChild(productPrise);
           
    }
    displayText(cart,basket.basketText());
}

var products = [
    {name: 'товар1', price: 1000}, 
    {name: 'товар2', price: 2000}, 
    {name: 'товар3', price: 3000},
];

displayCatalog(products);
