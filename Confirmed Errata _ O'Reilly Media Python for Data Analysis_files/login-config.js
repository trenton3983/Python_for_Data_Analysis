function afterJanrainLogin(result)
{
 if (window.console && window.console.log) console.log(result);


  // close the modal

    janrain.capture.ui.modal.close();
//    window.location = result.redirectUri;
//    window.location = 'http://admin.oreilly.com/cs/user/janrainlive?code=' + result.authorizationCode;
//    alert( 'all good - here in the function code = ' + result.authorizationCode );
    sendAuthorizationCodeToServer(result.authorizationCode);
}

function afterJanrainLogout(result)
{
//      window.location = 'http://admin.oreilly.com/cs/user/login?logout=1&x-redirect=referer';
//    window.location.href = '#';
}


function janrainCaptureWidgetOnLoad() {
	janrain.settings.capture.flowName = 'signIn';
  	// we want an oauth code, not a single access token
	janrain.settings.capture.responseType = 'code';
	  // this setting is never used but crashes the widget if not present
//	janrain.settings.capture.redirectUri = 'http://oreilly.com/cs/user/janrain';
//	janrain.settings.capture.redirectUri = 'http://oreilly.com';
  
//	janrain.settings.tokenAction = 'event';
	janrain.settings.language = 'en';

// federate settings
//    janrain.settings.capture.federate = 'true';
//    janrain.settings.capture.federateServer = 'https://oreilly-dev.janrainsso.com';
//    janrain.settings.capture.federateXdReceiver = 'http://admin.oreilly.com/cs/user/janrain';
//    janrain.settings.capture.federateLogoutUri = 'http://admin.oreilly.com/cs/user/janrain?federate_logoutw=1';
//    janrain.settings.capture.federateLogoutUri = 'http://admin.oreilly.com/cs/user/janrain?federate_logoutw=1';

//    janrain.settings.capture.federateLogoutUri = 'https://membersstage.oreilly.com/account/logout';
//    janrain.settings.capture.federateEnableSafari = true;

	janrain.capture.ui.start();

//       alert( 'Right here in the widget load' );

//	janrain.events.onCaptureLoginSuccess.addHandler(afterJanrainLogin(result));
//	janrain.events.onCaptureRegistrationSuccess.addHandler(afterJanrainLogin(result));

	janrain.events.onCaptureLoginSuccess.addHandler(afterJanrainLogin);
	janrain.events.onCaptureRegistrationSuccess.addHandler(afterJanrainLogin);
    janrain.events.onCaptureSessionEnded.addHandler(afterJanrainLogout);

//	janrain.capture.ui.modal.close();
}

function sendAuthorizationCodeToServer(code) {
    // var query_string = window.location.search.replace(/^\?/, '');
    // var xurl = parseURLEncodedQuery(query_string)['x-url'];
    var params = {}
    params['code'] = code;
    // params['x-url'] = xurl;
    // if(/mobile/.test(window.location.pathname)) {
    //     params['mobile'] = true;
    // }
    $.ajax({
      type: 'POST',
      url: '/cs/user/janrain',
      data: params,
      success: function(results) {
        // we got a response back from our server
//        results = $.parseJSON(aresults);
//        alert( 'sendAuth json_parsed results = ' + results );
        if(results.access_token) {
            // the response from the server included a token;
            // use it to set a capture session
//            alert( 'sendAuth token = ' + results.access_token );
            janrain.capture.ui.createCaptureSession(results.access_token);
            // this is the part I was suggesting you might make
            // optional. Members requires a redirect_url to work, so
            // we display an error if it's not returned.
            // It wouldn't be necessary for the modal/popup login
            // widget, for example.
            if(results.redirect_url) {
              window.location.href = results.redirect_url;
            } else {
              displayError('Did not receive redirect back from server.');
            }
        } else {
          // no token found in what the server sent, so display a
          // friendlier error to the user instead of just letting
          // them hang.
          displayError('Did not receive token back from server.');
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        // the server threw an error during the AJAX call, likely due
        // to a Janrain timeout or something similar. Display a
        // friendly error.
        displayError('An error occurred while logging in.');
      }
    });
}


// Leaving this here as reference. We use it to get values from the
// query string before sending stuff along to our server. It's used
// in the code I commented out above.
// function parseURLEncodedQuery(query_string) {
//     if (query_string == "") return {};
//     var pairs = query_string.split('&');
//     var params = {};
//     $(pairs).each(function(i, pair) {
//         var key_value = pair.split("=", 2);
//         params[decodeURIComponent(key_value[0])] =
//            decodeURIComponent(key_value[1]);
//     });
//     return params;
// }


// This function displays an error in a little dialog box. It's used
// in the code sample above so included here for context.
function displayError(error) {
  error = error || 'An error occurred while logging in.';
  error += ' Please refresh the page and try again.';
  var popup = document.getElementById("captureRetrievingUserDataBuiltIn").firstChild
  popup.innerHTML = error;
  popup.style.backgroundImage = "url('//cdn.oreillystatic.com/members/images/warning.png')";
  popup.style.fontWeight = "bold";
}

