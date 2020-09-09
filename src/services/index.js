import cookieCache from './cookieCache';

class Request {
  constructor(basePath) {
    this.jwt = cookieCache.getCookie();
    this.basePath = basePath;
  }

  setRequestObject(type, data) {
    const req = {
      method: `${type}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.jwt}`
      }
    };
    if (type === 'get') return req;

    if (data) req.body = JSON.stringify(data);

    return req;
  }

  sendRequest(type, data) {
    let path = this.basePath;

    // Adding query parameters for get requests (if they have any)
    if (type === 'get' && data) path = `${path}?${data}`;

    else if (data && data.id) path = `${path}/${data.id}`;

    const req = this.setRequestObject(type, data);

    return fetch(path, req);
  }
}
export default Request;
