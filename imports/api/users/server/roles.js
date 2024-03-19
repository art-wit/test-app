import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

const roles = [
  // Admins
  {
    role: 'admin',
    slug: 'Администратор'
  },
  // Users
  {
    role: 'client',
    slug: 'Благородный сэр'
  },
];

roles.map(
  ({ role }) => Roles.createRole(role, { unlessExists: true }),
);

Meteor.roles.find({}).fetch()?.forEach(({ _id }) =>
  Meteor.roles.update(
    _id,
    {
      $set: {
        slug: roles.find(({ role }) => role === _id)?.slug
      }
    }
  )
);
