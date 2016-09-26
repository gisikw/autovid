import axios from 'axios';
const BASE_URL = process.env.NODE_ENV === 'production'
                   ? 'http://10.0.0.12'
                   : 'http://10.0.0.12:4000';
const SERIES_URL = `${BASE_URL}/series`;
const VIDEOS_URL = `${BASE_URL}/videos`;

const all = (url) => () => axios.get(url);
const create = (url) => (data) => axios.post(url, data);
const update = (url) => (id, data) => axios.put(`${url}/${id}`, data);
const destroy = (url) => (id) => axios.delete(`${url}/${id}`);

module.exports = {
  series: {
    all: all(SERIES_URL),
    create: create(SERIES_URL),
    update: update(SERIES_URL),
    destroy: destroy(SERIES_URL),
  },
  videos: {
    all: all(VIDEOS_URL),
    create: create(VIDEOS_URL),
    update: update(VIDEOS_URL),
    destroy: destroy(VIDEOS_URL),
  }
};
