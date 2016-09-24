function xhr({ method, url }) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.onerror = () => reject(Error('Network Error'));
    req.onload = () => {
      if (req.status >= 200 && req.status < 300) resolve(req.responseText);
      else reject(Error(req.statusText));
    };
    req.open(method, url, true);
    req.send();
  });
}
xhr.get = (url, opts = {}) => xhr(Object.assign({ method: 'GET', url }, opts));


export default xhr;
