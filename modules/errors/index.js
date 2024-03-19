import { Meteor } from 'meteor/meteor';

export class AccessDeniedError extends Meteor.Error {

  constructor(message, details) {
    super('Access denied', message, details);
  }

}

export class InvalidParamError extends Meteor.Error {

  constructor(message, details) {
    super('Invalid param', message, details);
  }

}
