// Routes
const { API_PREFIX } = require('config');
const { AuthRoutes,AuthFrontRoutes } = require('../modules/auth/auth.module');
const { AppHealthRoutes } = require('../modules/app-health/app-health.module');
const { RequestRoutes,RequestFrontRoutes } = require('../modules/travel-request/request.module');
const { UserRoutes } = require('../modules/user/user.module');
const { RoleRoutes } = require('../modules/roles/role.module');

const routes = [
  {
    excludeAPIPrefix: true,
    path: '/',
    route: AuthFrontRoutes,
  },
  {
    excludeAPIPrefix: true,
    path: '/request',
    route: RequestFrontRoutes,
  },
  {
    path: '/requesttravel',
    route: RequestRoutes,
  },
  {
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
