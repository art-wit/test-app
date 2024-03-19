import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { mount } from 'react-mounter';
// layouts
import { Layout } from '/imports/ui/layouts/Layout';
// helpers
import { isAdmin, isClient } from '../helpers';
import { APP } from '/imports/routes/route-paths';

//
import './admin';
import './client';

FlowRouter.route(APP.login, {
  name: 'App.login',
  waitOn: () => Meteor.subscribe('users.current'),
  triggersEnter: [
    function (context, redirect) {
      if (Meteor.user()) {
        redirect('/');
      }
    }
  ],
  async action() {
    const { LoginPage } = await import('/imports/ui/pages/auth/LoginPage.jsx');
    mount(Layout, { children: <LoginPage /> });
  },
});

FlowRouter.route(APP.root, {
  name: 'App.root',
  waitOn: () => Meteor.subscribe('users.current'),
  triggersEnter: [
    function (context, redirect) {
      const currentUser = Meteor.user();
      if (isAdmin(currentUser)) {
        redirect('/admin/dashboard');
      } else if (isClient(currentUser)) {
        redirect('/client/dashboard');
      } else {
        redirect('/login');
      }
    }
  ]
});

// Fallback route: "Not found"
FlowRouter.route(APP.notFound, {
  name: 'App.not-found',
  async action() {
    const { NotFound } = await import('/imports/ui/pages/Page404.jsx');
    mount(Layout, { children: <NotFound /> });
  },
});
