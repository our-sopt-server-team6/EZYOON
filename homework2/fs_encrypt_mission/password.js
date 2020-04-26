const fs = require('fs');
const crypto = require('crypto');


const title = 'password';
const data = `leejiyun`;
fs.writeFile (`${__dirname}/${title}.txt`, data, (err, data) => {
    if (err) return console.log (err.message);
    console.log(`${title} 비밀번호가 들어있어요`);
});

const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 1,32,'sha512',(err,derivedkey)=>{
        if (err) throw err;
        const hashed = derivedkey.toString('hex');
        console.log('salt : ', salt);
        console.log('hashed : ', hashed);

        fs.writeFile(`${__dirname}/hashed.txt`,hashed,(err,hashed)=>{
            if (err) return console.log (err.message);
            console.log(`hashed.txt안에 해쉬된 비밀번호가 들어있어요`);
        })
    });
}


fs.readFile(`${__dirname}/${title}.txt`, (err, data) => {
    if (err) return console.log (err.message);
    console.log(`${title}.txt 파일에는 아래의 데이터가 있습니다. \n"${data}"\n`);

    const password = data;
    const salt = crypto.randomBytes(32).toString('hex');
    encrypt(salt,password);
});