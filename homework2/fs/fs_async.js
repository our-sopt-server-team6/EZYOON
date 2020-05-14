const fs = require('fs');

const numArr = [1,2,3,4,5];
/*
    fs.writeFile (file, data, [options], callback) {}
    비동기 방식으로 파일 불러오기 - 순서 확인해보기
*/
numArr.forEach((num)=>{
    const title = 'async' + num;
    const data = `파일이 잘만들어졌어요!\n제이름은 '${title}.txt'입니다~`;
    fs.writeFile (`${__dirname}/${title}.txt`, data, (err, data) => {
        if (err) return console.log (err.message);
        console.log(`${__dirname}/${title} 비동기라 순서가 뒤죽박죽`);
    });
})

/*
    fs.writeFile (file, data, [options], callback) {}
    비동기 방식으로 파일 불러오기 - 순서 확인해보기
*/
numArr.forEach((num) => {
    const title = 'async' + num;
    fs.readFile(`${__dirname}/${title}.txt`, (err, data) => {
        if (err) return console.log (err.message);
        console.log(`${__dirname}/${title}.txt 파일에는 아래의 데이터가 있습니다. \n"${data}"\n`);
    });
});