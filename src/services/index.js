class Request {
  constructor(basePath) {
    this.jwt = this.getCookie('token');
    this.basePath = basePath;
  }

  setRequestObject(data, type) {
    const req = {
      method: `${type}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.jwt}`
      }
    };

    if (data) req.body = JSON.stringify(data);

    return req;
  }

  getCookie(cookieName) {
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

  sendRequest(data, type) {
    let path = this.basePath;

    if (data && data.id) path = `${path}/${data.id}`;

    const req = this.setRequestObject(data, type);

    return fetch(path, req);
  }
}

module.exports = {
  Request
};
