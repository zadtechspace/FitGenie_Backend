const crypto = require('crypto');

const generateRandomString = (num=6)=>{
    const finalNum  = num/2;
    
    const string  = crypto.randomBytes(finalNum).toString("hex")

    return string;

}


module.exports = generateRandomString;