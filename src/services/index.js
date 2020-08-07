function sendRequest(path, data, type) {
  // Not sending anything for GET methods in bodies
  if (!data) return sendGetRequest(path);

  if (data.id) path = `${path}/${data.id}`;

  return httpRequest(path, data, type);
}

function sendGetRequest(path) {
  const jwt = getCookie('token');

  return fetch(path, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    }
  });
}

function httpRequest(path, data, type) {
  const jwt = getCookie('token');

  return fetch(path, {
    method: `${type}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify(data)
  });
}

function getCookie(cookieName) {
  var name = cookieName + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
}

module.exports = {
  sendRequest
};
