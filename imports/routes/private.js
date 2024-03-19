import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

export const privateRoutes = FlowRouter.group({
  waitOn: () => Meteor.subscribe('users.current'),
  triggersEnter: [
    function (context, redirect) {
      if (!Meteor.user()) {
        redirect('/login');
      }
    },
  ],
});
