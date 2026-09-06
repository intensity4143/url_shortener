const BASE = 62;
const BASE62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const encodeBase62 = (id) =>{
    if(id == 0)
        return BASE62_CHARS[0];

    let shortCode = ""

    while(id > 0){
        let rm = id % BASE;
        const ch = BASE62_CHARS[rm];
        shortCode = ch + shortCode;
        id = Math.floor(id / BASE);
    }

    return shortCode;
}

module.exports = encodeBase62
