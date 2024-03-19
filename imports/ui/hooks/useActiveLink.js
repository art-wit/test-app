// routes
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// ----------------------------------------------------------------------

export default function useActiveLink(path, deep = true) {

  currentPath = FlowRouter.current().path;

  const normalActive = path ? !!matchPath({ path, end: true }, currentPath) : false;

  const deepActive = path ? !!matchPath({ path, end: false }, currentPath) : false;

  return {
    active: deep ? deepActive : normalActive,
    isExternalLink: path.includes('http'),
  };
}

const matchPath = ({ path, end }, currentPath) => {
  if (end) {
    return path === currentPath
  }
  const reducedPath = currentPath.slice(0, path.length);
  return path === reducedPath;
}
