import { AccessDeniedError } from '/modules/errors';

import { Publication } from './publication';

export class AuthenticatedPublication extends Publication {

  constructor({ allowDisabled, restrictions, ...other }) {
    super({
      restrictions: [
        {
          // Check if user is logged in
          condition: (params, user) => !user,
          error: () => new AccessDeniedError('Must be logged in'),
        },
        {
          // Check if user is not disabled
          condition: (params, user) => !allowDisabled && !user.enabled,
          error: () => new AccessDeniedError('User is disabled'),
        },
        ...(restrictions || []),
      ],
      ...other,
    });
  }

}