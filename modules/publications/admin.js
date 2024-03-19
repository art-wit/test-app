import { AuthenticatedPublication } from './authenticated';

export class AdminPublication extends AuthenticatedPublication {
  constructor({ roles, ...other }) {
    super({
      roles: ['admin', 'reviewer', ...(roles || [])],
      ...other,
    });
  }
}
