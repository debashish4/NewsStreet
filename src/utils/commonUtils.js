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
    console.log({ array });
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
const stopInAppBrowser = () => {
    if (inAppBrowserRef) {
        inAppBrowserRef.close();
        store.commit('TOGGLE_READ_MORE_PANEL')
    }
};

const cordovaShare = (socialShareData) => {
    console.log({socialShareData});
    const {
        description,
        title,
        url,
        } = socialShareData;
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
        message:
            `
    ${title}
                                  
${description}
                  
To read full story visit:
` || null, // not supported on some apps (Facebook, Instagram)
        subject: title, // fi. for email
        files: null, // an array of filenames either locally or remotely
        url: url || null,
        chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }

    var onSuccess = function (result) {
        console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
        console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    }

    var onError = function (msg) {
        console.log("Sharing failed with message: " + msg);
    }
    try {
        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
    } catch (err) {
        console.log(err);
    }
}



export { cordovaShare, _toWhiteSpace, whiteSpaceTo_, newsSourcetoApiString, shuffleArray, openInAppBrowser, stopInAppBrowser, stringifyArray, hyphenToSpace };