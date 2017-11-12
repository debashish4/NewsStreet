const _toWhiteSpace = (str) => {
    var item = str.match(/_/g);
    var newStr = str;
    if (item) {
        for (var i = 0; i < item.length; i++) {
            newStr = newStr.replace('_', " ");
        }
    };
    return newStr;
};

const whiteSpaceTo_ = (str) => {
    var newStr = str.replace(/[\d\s\(\)\/]/g, '_'); // the h/in(d)u.st3an t/im.e2s (In)
    return newStr.toLowerCase();
};


const newsSourcetoApiString = (source) => {
    console.log(source);
    return source.map((item, index, arr) => {
        return item.replace(/[\(\)]/g, "")
            .replace(/[\.\s\/]/g, "-")
            .replace(/--/g, "-")
            .toLowerCase();
    })
};

const shuffleArray = (arrays) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



export { _toWhiteSpace, whiteSpaceTo_, newsSourcetoApiString, shuffleArray };