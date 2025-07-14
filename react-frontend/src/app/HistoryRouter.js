/*
 * @Author: junshi clayton.wang@gmail.com
 * @Date: 2024-03-02 17:36:49
 * @LastEditors: junshi clayton.wang@gmail.com
 * @LastEditTime: 2024-03-02 17:36:49
 * @Description:
 */
import React from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

const baseURL = new URL(location.origin);

export const history = createBrowserHistory({
  basename: baseURL.pathname || '/',
});

export const HistoryRouter = ({ history, children }) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  return React.createElement(
    Router,
    Object.assign({ children, navigator: history }, state)
  );
};
