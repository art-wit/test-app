import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    // Create initial Super Administrator user
    const adminId = Accounts.createUser({
      email: 'admin@geoproject.com',
      username: 'admin',
      password: 'Passw0rd',
      enabled: true,
      profile: {
        firstName: 'Admin',
        lastName: 'Admin',
      },
    });
    Roles.addUsersToRoles(adminId, ['admin']);

    // Create initial Network Manager user
    const clientId = Accounts.createUser({
      email: 'network-manager@geoproject.com',
      username: 'client',
      password: 'Passw0rd',
      enabled: true,
      profile: {
        firstName: 'Network',
        lastName: 'Manager',
      },
    });
    Roles.addUsersToRoles(clientId, ['network-manager']);
  }
});
