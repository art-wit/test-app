import { AuthenticatedPublication } from './authenticated';

export class ClientPublication extends AuthenticatedPublication {
  constructor({ roles, ...other }) {
    super({
      roles: ['network-manager', 'manager', ...(roles || [])],
      ...other,
    });
  }
}
