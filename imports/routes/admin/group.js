import { Meteor } from 'meteor/meteor';
import { privateRoutes } from '../private';
import { Layout } from '/imports/ui/layouts/Layout';
import { isAdmin,isClient } from '../../helpers';
import { mount } from 'react-mounter';

export const adminRoutes = privateRoutes.group({
  prefix: '/admin',
  name: 'App.admin',
  whileWaiting() {
    const currentUser = Meteor.user();
    if (isAdmin(currentUser)) {
      mount(Layout);
    }
  },
  triggersEnter: [
    function (context, redirect) {
      const currentUser = Meteor.user();
      if (isClient(currentUser)) {
        redirect('/client/dashboard');
      }
    }
  ]
});
