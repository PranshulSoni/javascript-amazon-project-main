import { formatCurrency } from "../utils/money.js";
console.log('test suite : formatCurrency');



if(formatCurrency(2095)=='20.95'){
    console.log('passed');
}
else{
    console.log('failed');
}


if(formatCurrency(2000.4)=='20.00'){
    console.log('passed');
}
else{
    console.log('failed');
}

