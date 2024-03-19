import { Meteor } from 'meteor/meteor';
import { AdminPublication } from '/modules/publications';

Meteor.publish('users.current', function () {
  if (this.userId) {
    return Meteor.users.find({ 'user._id': this.userId });
  } else {
    this.ready()
  }
});

new AdminPublication({
  collection: Meteor.users,
  query: () => ({}),
}).publish('admin.users.all');
