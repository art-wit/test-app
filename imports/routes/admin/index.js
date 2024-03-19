import React from 'react';
import { mount } from 'react-mounter';
// routes
import { adminRoutes } from './group';
import { DASHBOARD } from '/imports/routes/route-paths';
// layouts
import Layout from '/imports/ui/layouts/dashboard';

adminRoutes.route(DASHBOARD.root, {
  name: 'App.admin.dashboard',
  async action() {
    const { Dashboard } = await import('/imports/ui/pages/admin/Dashboard.jsx');
    mount(Layout, { children: <Dashboard /> });
  },
});

adminRoutes.route(DASHBOARD.user.root, {
  name: 'App.admin.user',
  triggersEnter: [
    function (context, redirect) {
      if (Meteor.user()) {
        redirect('App.admin.user.list');
      }
    }
  ],
});

adminRoutes.route(DASHBOARD.user.list, {
  name: 'App.admin.user.list',
  async action() {
    const { UserListPage } = await import('/imports/ui/pages/UserListPage.jsx');
    mount(Layout, { children: <UserListPage /> });
  },
});

adminRoutes.route(DASHBOARD.user.create, {
  name: 'App.admin.user.create',
  async action() {
    const { UserCreatePage } = await import('/imports/ui/pages/admin/UserCreatePage.jsx');
    mount(Layout, { children: <UserCreatePage /> });
  },
});