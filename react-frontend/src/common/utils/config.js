/*
 * @Author: junshi clayton.wang@gmail.com
 * @Date: 2024-03-02 17:36:49
 * @LastEditors: junshi clayton.wang@gmail.com
 * @LastEditTime: 2024-03-02 17:36:49
 * @Description:
 */

const APIV1 = '/api/v1';

module.exports = {
  name: `interview-demo`,
  CORS: [],
  apiPrefix: APIV1,
  apiUriParamsPattern: /:([_a-zA-Z0-9]+)/g,
  api: {
    foodTruckListAll: 'get|/food-trucks',
    foodTruckDetail: 'get|/food-trucks/:id',
  },
  breadcrumbConfig: {
    '/food-trucks': 'Food Truck List',
  },
  menuItemsConfig: [
    {
      key: 'food-trucks',
      label: 'Interview Demo',
      icon: 'settings',
      children: [
        {
          key: 'food-trucks.list',
          label: 'Food Truck List',
          path: 'list',
        },
      ],
    },
  ],
};
