(function() {
    var e = document.createElement('script');
    e.type = 'text/javascript';
    e.id = 'janrainAuthWidget';
    var protocol = document.location.protocol;
    var url;
    if (protocol === 'https:') {
        url = 'https://rpxnow.com/load/login.oreilly.com';
    } else if (protocol === 'http:') {
        url = 'http://widget-cdn.rpxnow.com/load/login.oreilly.com';
    }
    if (url) {
        e.src = url;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(e, s);	
    }
})();
