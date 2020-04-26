function greet() {
    console.log('HELLO!');
}

function timer(){
    return setTimeout(() => {
        console.log('End!');
    }, 3000);
}

greet();
timer();