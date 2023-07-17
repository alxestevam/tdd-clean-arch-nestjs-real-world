export class UsernameIsTakenError extends Error {
  constructor() {
    super('Username is taken');
  }
}
