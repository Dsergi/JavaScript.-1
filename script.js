//1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100
var n = 1;
var Arr = [];

    while (n <= 100) {
        if (n == 1) {
            Arr.push(1)
        } else {
            var result = 2;
            var i = 2;
            while (n % i !== 0 ){
                i += 1;
                result +=1;
                } 
            if (result == n) {
                Arr.push(result);
            }
        }
        n += 1;
    }

    console.log(Arr);


//2. С этого урока начинаем работать с функционалом интернет-магазина. 
//Предположим, есть сущность корзины. 
//Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
//Товары в корзине хранятся в массиве. 
//Задачи:
//a) Организовать такой массив для хранения товаров в корзине;
//b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.

function countBasketPrice(basket){
    var s = 0;

    for(var i = 0; i < basket.length; i++){
        s = s + basket[i][1];
    }
    return s;
}

var basket = [["товар1" , 1000], ["товар2", 2000], ["товар3", 3000]];  
a = countBasketPrice(basket);
console.log("сумма корзины: " + a);

//4.Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.    
    for (var i = 0; i < 9; i++, console.log(i)) {}

//5. Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
var x = "";
 for(var i = 0; i < 20 ; i++){
     x = x + "x";
     console.log(x);
 } 