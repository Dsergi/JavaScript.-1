var a = 1, b = 1, c, d; // обьявление переменных
    c = ++a; alert(c); // с = 2, a = 2 
    //из-за префиксного оператора к а прибавляется сначала 1, затем в с записывается значение
    d = b++; alert(d); // d = 1, b = 2
    //из-за постфиксного оператора в d записывается значение b, и лишь затем к b прибавляется 1.
    c = (2 + ++a); alert(c); // с = 5, а = 3
    // к  а прибавляется сначала 1 и записывается новое значение(3). Затем прибавляется 2 и новое значение записывается в с
    d = (2 + b++); alert(d); // d = 4, b = 3
    //к  b сначала прибавляется 2 и значение записывается в  d, и после этого в  b записывается ее старое значение +1
    alert("a = " + a); // 3
    alert("b = " + b); // 3
    //результат выполнения операций

var a = 2;
var x = 1 + (a *= 2);
    alert ("x = " + x); // x= 5, a = 4

var a = prompt("a = " );
var b = prompt("b = " );
    
    if (a >= 0 && b >= 0) {
        c = a - b;
        alert ("a - b = " + c );
    } else if (a < 0 && b < 0){
        c = a * b;
        alert ("a * b = " + c );
    } else{
        c = a + b;
        alert ("a + b =" + c); 
    } 
    
var a = 0;
    switch (a) {
        case 0:
            alert ("0");
        case 1:
            alert("1");
        case 2:
            alert("2");
        case 3:
            alert("3");
        case 4:
            alert("4");
        case 5:
            alert("5");
        case 6:
            alert("6");
        case 7:
            alert("7");
        case 8:
            alert("8");
        case 9:
            alert("9");
        case 10:
            alert("10");
        case 11:
            alert("11");
        case 12:
            alert("12");
        case 13:
            alert("13");
        case 14:
            alert("14");
        case 15:
            alert("15");                    
    }  

var a = prompt("a = " );
var b = prompt("b = " );
                
function operation1(a, b) {
    return a + b;
}
                
function operation2(a, b) {
    return a - b;
}
                
function operation3(a, b) {
    return a / b;
}
                
function operation4(a, b) {
    return a + b;
    }       

function mathOperation(arg1, arg2, operation){
    switch(operation){
        case 'сложение':
        return arg1 + arg2;
        break;
        case 'вычитание':
        return arg1 - arg2;
        break;
        case 'деление':
        return arg1 / arg2;
        break;
        case 'умножение':
        return arg1 * arg2;
        break;
    }
}    
