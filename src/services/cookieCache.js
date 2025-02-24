class CookieCache {
  constructor() {
    this.cookie = '';
  }

  getCookie() {
    if (!this.cookie) this.cookie = this.generateCookie();
    return this.cookie;
  }

  resetCookie() {
    this.cookie = '';
  }

  generateCookie() {
    const name = 'token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }
}

export default new CookieCache();
