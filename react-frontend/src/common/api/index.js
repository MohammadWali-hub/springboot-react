import { each } from 'lodash';
import config from '../utils/config';
import io from '../utils/io';

each(config.api, (url, key) => {
  io.create(key, url);
});
const api = io.getApis();
export default api;
