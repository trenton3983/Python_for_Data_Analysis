// Load on any page using a Janrain widget.
// See inline notes for application and environment-specific settings.

// The settings in this file are for the development Capture server.

function janrainDefaultSettings() {
    if (typeof window.janrain !== 'object') window.janrain = {};
    window.janrain.settings = {
//        janrain.settings.language = 'en',
        actionText: ' ',
        appUrl: 'https://login.oreilly.com',
        tokenAction: 'event',
        // Your application's URL; has it been whitelisted in the Janrain
        // dashboard?
        tokenUrl: 'http://admin.oreilly.com/',
        packages: ['login', 'capture'],
        capture: {
            // appID varies from development to production
//            appId: 'htp3wryqu3wphkadryjgk46tup',
            appId: 'xsnca5wmqe9vxv97ygh5vfejkd',
            // captureServer varies from development to production
//            captureServer: 'https://oreilly.janraincapture.com',
            captureServer: 'https://accounts.oreilly.com/',
            clientId: 'a4gcenuvapuh9xzunttzds4ragkbaynf',

            // your API client ID for the Janrain application
// Janice - Media - API - invalid auth code
//            clientId: '2sx7rcaqqmephmbubumxp4y7z78zaq58',
// CS api1  - invalid auth code
//            clientId: 'hh63a2fv4m5ex7dycdnhnkw9kmtrbwcu',
//   app owner client_id
//            clientId: '2r93653z2ajw2cvh3fzqvbg3pgkfb6mc',
            flowVersion: 'HEAD',
            keepProfileCookieAfterLogout: true,
            modalCloseHtml: '<span class="janrain-icon-16 janrain-icon-ex2"></span>',
//            redirectUri: 'http://requiredbyjanrain.com/',
            redirectUri: 'http://admin.oreilly.com',
            responseType: 'code',
            setProfileCookie: true,

// federate options
            federate: true,
            federateServer: 'https://oreilly.janrainsso.com',
            federateXdReceiver: 'http://admin.oreilly.com/cs/user/janrain',
            federateLogoutUri: 'http://admin.oreilly.com/cs/user/janrain?logout=1',
            federateEnableSafari: true,

            transactionTimeout: 10000,
            noModalBorderInlineCss: true,
            stylesheets: ['//cdn.oreillystatic.com/members/css/janrain.min.css'],
            mobileStylesheets: ['//cdn.oreillystatic.com/members/css/janrain-mobile.min.css'],
        }
    };
};

function janrainInitLoad() {
    function isReady() { janrain.ready = true; };
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", isReady, false);
    } else {
        window.attachEvent('onload', isReady);
    }
    var e = document.createElement('script');
    e.type = 'text/javascript';
    e.id = 'janrainAuthWidget'
    var url = document.location.protocol === 'https:' ? 'https://' : 'http://';
    url += 'd16s8pqtk4uodx.cloudfront.net/';
    url += 'login.oreilly.com'; // passed to settings.js from elsewhere
    url += '/load.js';
    e.src = url;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(e, s);
}
