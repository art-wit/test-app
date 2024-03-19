import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  import './server/roles';
  import './server/publications/user';
}
