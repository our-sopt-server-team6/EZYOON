const crypto = require('crypto');

const encrypt = (salt, password) => {
    return new Promise((res,rej)=>{
        crypto.pbkdf2(password, salt.toString(), 5,32,'sha512',(err,derivedkey)=>{
        if (err) throw err;
        const hashed = derivedkey.toString('hex');
        res(hashed);
        })
    })
}

module.exports = encrypt;