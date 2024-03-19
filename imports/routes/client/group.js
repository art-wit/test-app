import { Meteor } from 'meteor/meteor';
import { privateRoutes } from '../private';
import { Layout } from '/imports/ui/layouts/Layout';
import { isAdmin, isClient } from '../../helpers';
import { mount } from 'react-mounter';

export const clientRoutes = privateRoutes.group({
  prefix: '/client',
  name: 'App.client',
  whileWaiting() {
    const currentUser = Meteor.user();
    if (isClient(currentUser)) {
      mount(Layout);
    }
  },
  triggersEnter: [
    function (context, redirect) {
      const currentUser = Meteor.user();
      if (isAdmin(currentUser)) {
        redirect('/admin/dashboard');
      }
    }
  ]
});
