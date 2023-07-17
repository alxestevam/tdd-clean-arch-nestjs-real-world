export class PasswordIsMissingError extends Error {
  constructor() {
    super(`Password is missing`);
  }
}
