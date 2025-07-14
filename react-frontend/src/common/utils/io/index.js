/**
 * @description request util
 * @author junshi clayton.wang@gmail.com
 */
import { message } from 'antd';
import axios from 'axios';
import { isString, isEmpty, cloneDeep } from 'lodash';
import qs from 'qs';
import { apiPrefix } from '@/common/utils/config';
import { parseUrl } from '../helper';

const codeMessage = {
  200: 'success',
  201: 'created or updated successfully.',
  401: 'authentication failed.',
  403: 'forbidden, you do not have permission to access this resource.',
  500: 'server error.',
  504: 'network timeout.',
};

/**
 * get global error object
 *
 * @param {string} message error message
 * @return {Object} global error object
 */
function getGlobalError(msg) {
  return {
    success: false,
    message: msg,
  };
}

const NETWORK_ERROR = getGlobalError('network error');

export class IO {
  axios = axios.create({
    responseType: 'json',
  });

  apis = {};

  hooks = {};

  me = null;

  /* eslint no-param-reassign: ["error", { "props": false }] */
  constructor() {
    this.axios.interceptors.request.use(
      (config) =>
        // you  can  add other requerst params
        config
    );
    this.axios.interceptors.response.use(
      (response) =>
        // you can handle response data
        response
    );
  }

  request(...args) {
    return this.axios(...args);
  }
  get(...args) {
    return this.axios.get(...args);
  }
  post(url, data, configs) {
    if (
      configs &&
      configs.headers &&
      configs.headers['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      return this.axios.post(url, qs.stringify(data), configs);
    }
    return this.axios.post(url, data, configs);
  }
  patch(url, data, configs) {
    return this.axios.patch(url, data, configs);
  }
  put(url, data, configs) {
    return this.axios.put(url, data, configs);
  }
  delete(url, data, configs) {
    return this.axios.delete(url, data, configs);
  }

  create(key, url) {
    const genRequester = (_url) => {
      let url = _url;
      if (isString(url)) {
        let urlInfo = url.split('|');
        let method = urlInfo.length > 1 ? urlInfo[0] : 'get';
        url = apiPrefix + (urlInfo[1] || urlInfo[0]);

        const isRequester = (path) =>
          // filter out paths that end with `/download` or `/upload`
          !/\/(?:up)load$/.test(path);
        return (data = {}, configs = {}) => {
          let uri = url;
          if (!isRequester(uri)) {
            if (!isEmpty(data)) {
              return `${uri}?${qs.stringify(data)}`;
            }
            return uri;
          }
          let _data = cloneDeep(data);
          uri = parseUrl(uri, _data);
          if (method === 'get') {
            return this.get(uri, {
              params: _data,
              paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: 'comma' });
              },
              ...configs,
            });
          }
          return this[method](uri, _data, configs);
        };
      }
    };
    this.apis[key] = genRequester(url);
  }
  getApis() {
    return { ...this.apis };
  }
}

export default new IO();
