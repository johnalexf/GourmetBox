string = decodeURI(encodeURIComponent(string));
    console.log(string);
    var newString = '', char, nextChar, combinedCharCode;

    for (var i = 0; i < string.length; i += 2) {
        char = string.charCodeAt(i);

        if ((i + 1) < string.length) {
            nextChar = string.charCodeAt(i + 1) - 31;
            combinedCharCode = char + "" + nextChar.toLocaleString('en', {
                minimumIntegerDigits: 2
            });
            newString += String.fromCharCode(parseInt(combinedCharCode, 10));
        } else {
            newString += string.charAt(i);
        }
    }
    return newString.split("").reduce((hex,c)=>hex+=c.charCodeAt(0).toString(16).padStart(4,"0"),"");