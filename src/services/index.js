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

    if (data) req.body = JSON.stringify(data);

    return req;
  }

  sendRequest(type, data) {
  // Not sending anything for GET methods in bodies
    let path = this.basePath;

    if (data && data.id) path = `${path}/${data.id}`;
    const req = this.setRequestObject(type, data);

    return fetch(path, req);
  }
}
export default Request;
