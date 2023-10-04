// Routes
const { API_PREFIX } = require('config');
const { AuthRoutes,AuthFrontRoutes } = require('../modules/auth/auth.module');
const { AppHealthRoutes } = require('../modules/app-health/app-health.module');
const { RequestRoutes } = require('../modules/travel-request/request.module');
const { UserRoutes } = require('../modules/user/user.module');
const { RoleRoutes } = require('../modules/roles/role.module');
const { UMRoutes } = require('../modules/user-manager/um-user.module');
const { ModuleToRoleRoutes } = require('../modules/module-to-role/mtr.module');
const { ApproverRoleRoutes } = require('../modules/approver-role/ar.module');
// const { DashboardRoutes } = require('../modules/dashboard/dashboard.module');

const routes = [
  {
    excludeAPIPrefix: true,
    path: '/',
    route: AuthFrontRoutes,
  },
  // {
  //   excludeAPIPrefix: true,
  //   path: '/dashboard',
  //   route: DashboardRoutes,
  // },
  {
    excludeAPIPrefix: true,
    path: '/request',
    route: RequestRoutes,
  },
  {
    excludeAPIPrefix: true,
    path: '/auth',
    route: AuthRoutes,
  },
  {
    excludeAPIPrefix: true,
    path: '/user',
    route: UserRoutes,
  },
  {
    excludeAPIPrefix: true,
    path: '/roles',
    route: RoleRoutes,
  },
  {
    excludeAPIPrefix: true,
    path: '/health',
    route: AppHealthRoutes,
  },
  {
    excludeAPIPrefix: true,
    path: '/um',
    route: UMRoutes,
  },
  {
    excludeAPIPrefix: true,
    path: '/mtr',
    route: ModuleToRoleRoutes,
  },
  {
    excludeAPIPrefix: true,
    path: '/ar',
    route: ApproverRoleRoutes,
  },
];

/**
 * Register routes with the app
 * @param {object} app - The Express app object
 */
module.exports = (app) => {
  routes.forEach(({ path, route, excludeAPIPrefix }) => {
    // If excludeAPIPrefix is true, use the path as is.
    // Otherwise, prepend the API_PREFIX to the path.
    const routePath = excludeAPIPrefix ? path : API_PREFIX + path;
    // Mount the route on the app using the determined route path.
    app.use(routePath, route);
  });
};
