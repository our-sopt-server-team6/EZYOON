const calculate = require('./calculator');

var result;
result = calculate.add(1,4);
console.log("add result : ", result);

result = calculate.substract(10,1);
console.log("substract result : ", result);

result = calculate.multiply(2,5);
console.log("multiply result : ", result);


result = calculate.divide(30,6);
console.log("divide result : ", result);


