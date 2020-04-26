let isMomHappy = true;
let phone = {
    brand : 'Samsung',
    color : 'black'
};

var willIGetNewPhone = new Promise((resolve, reject)=>{
    if (isMomHappy){
        resolve(console.log(phone));
    }
    else {
        reject('mom is not happy');
    }
})

willIGetNewPhone;