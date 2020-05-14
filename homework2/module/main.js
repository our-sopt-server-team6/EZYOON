//const sum = require('./sum');
const calculrateModule = require('./calculator');


var result = calculrateModule.add(1,3);
console.log("add result : ", result);

result = calculrateModule.substract(4,2);
console.log("substract result : ", result);

result = calculrateModule.multiply(5,2);
console.log("multiply result : ", result);

result = calculrateModule.divide(15,3);
console.log("divide result : ", result);