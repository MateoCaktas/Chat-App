class Request {
  constructor(path, data, type) {
    this.jwt = this.getCookie('token');
    this.path = data && data.id ? `${path}/${data.id}` : path;
    this.data = data;
    this.type = type;
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

  sendGetRequest() {
    return fetch(this.path, {
      method: `${this.type}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.jwt}`
      }
    });
  }

  sendHttpRequest() {
    return fetch(this.path, {
      method: `${this.type}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.jwt}`
      },
      body: JSON.stringify(this.data)
    });
  }
}

module.exports = {
  Request
};
