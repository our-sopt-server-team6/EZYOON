const crypto = require('crypto');

const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 5,32,'sha512',(err,derivedkey)=>{
        if (err) throw err;
        const hashed = derivedkey.toString('hex');
        console.log('salt : ', salt);
        console.log('hashed : ', hashed);
    });
}

const password = 'leejiyun';
const salt = crypto.randomBytes(32).toString('hex');
encrypt(salt,password);