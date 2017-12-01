import { TOGGLE_READ_MORE_PANEL } from '../constants/mutation_types';
import store from '../store'

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

var inAppBrowserRef;
const openInAppBrowser = (url) => {
    console.log('inside in app browser', url);
    var url = url;
    var target = '_blank';
    var options = "hardwareback=no,location=no,hidden=yes,zoom=no"
    inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);

    inAppBrowserRef.addEventListener('loadstart', loadstartCallback);
    inAppBrowserRef.addEventListener('loadstop', loadstopCallback);
    inAppBrowserRef.addEventListener('loadloaderror', loaderrorCallback);
    inAppBrowserRef.addEventListener('exit', exitCallback);

    function loadstartCallback(event) {
        console.log('Loading started: ' + event.url)
    }
    
    function loadstopCallback(event) {
        console.log('Loading finished: ' + event.url)
        inAppBrowserRef.show();
    }

    function loaderrorCallback(error) {
        alert('Loading error: ' + error.message)
    }
    
    function exitCallback() {
        console.log('Browser is closed...')
        store.commit('TOGGLE_READ_MORE_PANEL')
    }
}
const stopInAppBrowser =() => {
        alert("called stopInAppbrowser function");
        if (inAppBrowserRef) {
          alert('yes ref exist');
          inAppBrowserRef.close();
          alert('read more before');
        store.commit('TOGGLE_READ_MORE_PANEL')
          alert('read more after');
        }
      };

export { _toWhiteSpace, whiteSpaceTo_, newsSourcetoApiString, shuffleArray, openInAppBrowser, stopInAppBrowser, stringifyArray, hyphenToSpace };