/*1. Написать функцию, преобразующую число в объект.
 Передавая на вход число от 0 до 999, мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. 
 Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. 
 Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.*/
var max=999;
var digits = {
    numders: prompt ("Введите число от 0 до 999"),
    еденицы : 0,
    десятки : 0,
    сотни : 0,
};
if (digits <= 9) {
    digits.еденицы = digits.numders;
}
else if (digits.numders <= 999) {
    digits.еденицы = Math.floor (digits.numders % 10);
    digits.десятки = Math.floor (digits.numders / 10 % 10);
    digits.сотни = Math.floor (digits.numders /100 % 10);
}
else {
    digits.numders = 0;
    console.log ("Введено число не от 0 до 999");
}
console.log (digits);

/*4. *Продолжить работу с интернет-магазином:
В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
Реализуйте такие объекты.
Перенести функционал подсчета корзины на объектно-ориентированную базу.*/
var basket = {
    products: [],
    countBasketPrice: function(){
        var sum = 0;
        for(var i = 0; i < this.products.length; i++){
            sum = sum + this.products[i].price * this.products[i].count;
        }
        return sum;
    }
}

var products = [
    {name: 'товар1', price: 1000, count: prompt ("товар1: укажите кол-во товара")}, 
    {name: 'товар2', price: 2000, count: prompt ("товар2: укажите кол-во товара")}, 
    {name: 'товар3', price: 3000, count: prompt ("товар3: укажите кол-во товара")},
];

basket.products = products;

console.log("сумма корзины: " + basket.countBasketPrice());