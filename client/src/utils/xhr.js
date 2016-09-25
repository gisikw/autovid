function xhr({ method, url, data }) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.onerror = () => reject(Error('Network Error'));
    req.onload = () => {
      if (req.status >= 200 && req.status < 300) resolve(req.responseText);
      else reject(Error(req.statusText));
    };
    req.open(method, url, true);
    console.debug("Sending with data: ", data);
    req.send(data);
  });
}
xhr.get = (url, opts = {}) => xhr(Object.assign({ method: 'GET', url }, opts));
xhr.post = (url, opts = {}) => xhr(Object.assign({ method: 'POST', url }, opts));
xhr.delete = (url, opts = {}) => xhr(Object.assign({ method: 'DELETE', url:`${url}/${opts.id}` }, opts));

export default xhr;
