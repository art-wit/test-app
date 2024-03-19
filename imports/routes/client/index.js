import React from 'react';
// routes
import { clientRoutes } from './group';
import { DASHBOARD } from '/imports/routes/route-paths';
// layout
import { Layout } from '/imports/ui/layouts/Layout';
import { mount } from 'react-mounter';

clientRoutes.route(DASHBOARD.root, {
  name: 'App.client.dashboard',
  async action() {
    const { Dashboard } = await import('/imports/ui/pages/client/Dashboard.jsx');
    mount(Layout, { children: <Dashboard /> });
  },
});

