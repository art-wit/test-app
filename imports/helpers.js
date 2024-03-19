import { Roles } from 'meteor/alanning:roles';

export const isAdmin = (user) => 
  Roles.userIsInRole(user, ['admin', 'reviewer']);

export const isClient = (user) => 
  Roles.userIsInRole(user, ['network-manager', 'manager']);