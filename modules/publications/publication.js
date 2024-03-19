import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
// consider to apply meteor/natestrauser:publish-performant-counts instead
// import { Counts } from 'meteor/tmeasday:publish-counts';
import SimpleSchema from 'simpl-schema';
import { AccessDeniedError, InvalidParamError } from '/modules/errors';

function convertToFunction(value) {
  if (value instanceof Function) {
    return value;
  }
  return function () {
    return value;
  };
}

export class Publication {

  constructor({
    // Mongo Collection to query in find() method
    collection,
    // Method params validation agains SimplSchema
    schema,
    schemaOptions,
    // User roles allowed to call this method, see alanning:roles
    roles,
    // Custom restrictions to be checked before method execution
    restrictions,
    // Cursor selector, aka query
    query = {},
    // Cursor options
    fields,
    sort,
    limit,
    // Custom method to generate options may be provided
    options = function (...args) {
      return {
        fields: this.fields(...args),
        sort: this.sort(...args),
        limit: this.limit(...args),
      }
    },
    // Array of objects defining counts publication, see tmeasday:publish-counts
    // counts,
    // Method to generate cursor to be returned from run() method
    find = function (...args) {
      const query = this.query(...args);
      const options = this.options(...args);
      return this.collection.find(query, options);
    },
    // Custom run method may be provided
    // It must return Mongo Cursor or array of Mongo Cursors
    run = function (...args) {
      return this.find(...args);
    },
  }) {
    if (schema instanceof SimpleSchema) {
      // Use SimpleSchema instance as is
      this.schema = schema;
    } else if (schema) {
      // Convert object to SimpleSchema instance
      this.schema = new SimpleSchema(schema, schemaOptions);
    }
    this.restrictions = restrictions;
    this.collection = collection;
    this.roles = convertToFunction(roles);
    this.fields = convertToFunction(fields);
    this.sort = convertToFunction(sort);
    this.limit = convertToFunction(limit);
    this.options = convertToFunction(options);
    this.query = convertToFunction(query);
    // this.counts = counts;
    this.find = find;
    this.run = run;
  }

  user(userId) {
    return Meteor.users.findOne(userId);
  }

  validate(params, user) {
    // First, ensure params is an object
    if (typeof params !== 'object') {
      throw new InvalidParamError('Publication expects an object');
    }
    // Validate params against schema
    if (this.schema) {
      this.schema.clean(params, { mutate: true });
      this.schema.validate(params);
    }
    // Check user roles
    const roles = this.roles(params, user);
    if (roles) {
      const granted = roles.find(params => {
        const args = _.isArray(params) ? params : [params];
        return Roles.userIsInRole(user, ...args);
      });
      if (!granted) {
        throw new AccessDeniedError();
      }
    }
    // Validate agains restrictions
    if (this.restrictions) {
      this.restrictions.forEach(restriction => {
        if (restriction.condition(params, user)) {
          if (restriction.error) {
            if (restriction.error instanceof Function) {
              throw restriction.error(params, user);
            } else {
              throw restriction.error;
            }
          } else {
            throw new InvalidParamError();
          }
        }
      });
    }
  }

  // attachCounts(params, user, context) {
  //   if (this.counts) {
  //     for (const { name, options, find } of this.counts) {
  //       const cursor = find.call(this, params, user, context);
  //       Counts.publish(context, name, cursor, {
  //         noReady: true,
  //         ...options,
  //       });
  //     }
  //   }
  // }

  publish(name) {
    const that = this;
    Meteor.publish(name, function (params = {}) {
      try {
        const user = that.user(this.userId);
        that.validate(params, user);
        // that.attachCounts(params, user, this);
        return that.run(params, user, this);
      } catch (err) {
        return this.error(err);
      }
    });
  }

  extend(options) {
    return new Publication(Object.assign({}, this, options));
  }

}