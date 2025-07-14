import React from 'react';
import { cloneDeep } from 'lodash';

import { apiUriParamsPattern } from '@/common/utils/config';

/**
 * parse router as xxx/:xx to url
 * @param {string} _url
 * @param {object} params
 * @param {object} data
 * @return {url}
 */
export const parseUrl = (_url, params) => {
  // if url router as xxx/:xx_xxx, replace params
  const url = _url.replace(apiUriParamsPattern, (_match, field) => {
    if (field in params) {
      const value = params[field];
      // remove matched value from params
      delete params[field];
      return value;
    }
    throw new Error(
      `Cannot found params "${field}" to repalce url pattern "pattern"`
    );
  });
  return url;
};

/**
 * 遍历树形结构，执行回调
 *
 * @param {array|object} tree
 * @param {function} fn 处理函数，参数是item
 * @return
 */
export const tranverseTree = (tree, fn, param = []) => {
  if (tree instanceof Array) {
    for (let item of tree) {
      if (item.children) {
        tranverseTree(item.children, fn, param);
      }
      fn(item, ...param);
    }
  }
  // 根节点为对象
  else if (tree instanceof Object) {
    let node = tree;
    if (tree.children && tree.children.length) {
      tranverseTree(node, fn, param);
    }
    fn(node, ...param);
  }
  return;
};

/**
 * 判断当前节点是否为叶子结点
 *
 * @param {object} item
 * @return boolean
 */
export const isLeafNode = (item) => !(item && item.children);

/**
 * 深度查找，去掉对象中的空字段
 *
 * @param {object} obj
 * @return object
 */
export const purifyDeep = (obj) => {
  const result = cloneDeep(obj);
  Object.keys(result).forEach((k) => {
    if (result[k] instanceof Object) {
      result[k] = purifyDeep(result[k]);
    }
    if (!result[k] || result[k] === 'all') {
      delete result[k];
    }
  });
  return result;
};

/**
 * 遍历Json对象
 *
 * @param {string} value
 * @return string
 */
export const tranverseJson = (json, fn) => {
  if (json instanceof Array) {
    let arr = json;
    for (let item of arr) {
      if (item) {
        item = tranverseJson(item, fn);
      }
    }
    return arr;
  }
  // 根节点为对象
  if (json instanceof Object) {
    let obj = json;
    Object.entries(obj).forEach(([key, value]) => {
      if (value instanceof Object) {
        obj[key] = tranverseJson(value, fn);
      }
      fn(obj, [key, value]);
    });
    return obj;
  }
  return json;
};

export const pageSetToRoutes = (pages) => {
  const pageProcessor = ([name, page]) => {
    const route = {
      path: page.path ?? '',
    };

    route.exact = !!page.exact;
    route.modal = !!page.modal;

    if (page.title) route.title = page.title;
    if (page.render) route.render = page.render;

    if (page instanceof React.Component || page instanceof Function) {
      if (name && /Layout/.test(name)) route.layout = page;
      else route.component = page;
    } else {
      route.component = page.component;
      route.layout = page.layout;
    }

    if (route.component?.context) route.context = route.component.context;

    return route;
  };

  try {
    if (Array.isArray(pages)) {
      return pages.map((page) => pageProcessor([null, page]));
    }
    return Object.entries(pages).map(pageProcessor);
  } catch (err) {
    console.log(err);
    return [];
  }
};
