const smallCharStart = 'a'.charCodeAt(0);
const smallCharEnd = 'z'.charCodeAt(0);
const bigCharStart = "A".charCodeAt(0);
const numCharStart = "0".charCodeAt(0);

const charRange = smallCharEnd - smallCharStart;
const numCharRange = 10;

const totalRange = charRange * 2 + numCharRange;

function charFromNumber(code:number){
    code = code % totalRange;
    if(code < charRange){
        return String.fromCharCode(smallCharStart + code);
    } else if(code < charRange * 2){
        return String.fromCharCode(bigCharStart + code - charRange);
    } else {
        return String.fromCharCode(numCharStart + code - charRange * 2);
    }
}

export function randomId(length:number){
    let result = '';
    for(let i = 0; i < length; i++){
        result += charFromNumber(Math.floor(Math.random() * totalRange));
    }
    return result;
}