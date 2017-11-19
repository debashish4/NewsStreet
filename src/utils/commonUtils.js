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
    let newStr = str.replace(/[\d\s\(\)\/]/g, '_'); // the h/in(d)u.st3an t/im.e2s (In)
    return newStr.toLowerCase();
};

const hyphenToSpace = (str) => {
    let newStr = str.replace(/-/g, " ");
    return newStr.toUpperCase()
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

const stringifyArray = (array) => {
    console.log({array});
    return array.join(",");
}

const shuffleArray = (array) => {
     for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const openInAppBrowser = () => {
    console.log('inside in app browser')
    var url = 'https://cordova.apache.org';
    var target = '_blank';
    var options = "location=no,hidden=yes,clearcache=yes,clearsessioncache=yes,zoom=no"
    var ref = cordova.InAppBrowser.open(url, target, options);

    ref.addEventListener('loadstart', loadstartCallback);
    ref.addEventListener('loadstop', loadstopCallback);
    ref.addEventListener('loadloaderror', loaderrorCallback);
    ref.addEventListener('exit', exitCallback);

    function loadstartCallback(event) {
        console.log('Loading started: ' + event.url)
    }

    function loadstopCallback(event) {
        console.log('Loading finished: ' + event.url)
        ref.show();
    }

    function loaderrorCallback(error) {
        console.log('Loading error: ' + error.message)
    }

    function exitCallback() {
        console.log('Browser is closed...')
    }
}



export { _toWhiteSpace, whiteSpaceTo_, newsSourcetoApiString, shuffleArray, openInAppBrowser, stringifyArray, hyphenToSpace };