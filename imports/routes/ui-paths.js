import { isAdmin } from '../helpers';
import { DASHBOARD as rawDashboard } from './route-paths';
// export
export { APP } from './route-paths';

// Generate ui path for current user
const transformPath = (sublink) => {
  const root = isAdmin ? '/admin' : '/client';
  if (typeof sublink === 'string') {
    return `${root}${sublink}`;
  } else if (typeof sublink === 'object') {
    return Object.fromEntries(Object.entries(sublink).map(([key, value]) => {
      return [key, `${root}${value}`];
    }));
  }
}

const rawDashboardArray = Object.entries(rawDashboard);

const dashboardArray = rawDashboardArray.map(([key, value]) => [key, transformPath(value)])

export const DASHBOARD = Object.fromEntries(dashboardArray);