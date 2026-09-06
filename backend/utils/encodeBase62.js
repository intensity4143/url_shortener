const BASE = 62;
const BASE62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const encodeBase62 = (id) =>{
    if(id == 0)
        return BASE62_CHARS[0];

    let shortUrl = ""

    while(id > 0){
        let rm = id % 62;
        const ch = BASE62_CHARS[rm];
        shortUrl = ch + shortUrl;
        id = Math.floor(id / 62);
    }

    return shortUrl;
}

module.exports = {
    encodeBase62
};