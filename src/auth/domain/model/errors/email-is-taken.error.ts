export class EmailIsTakenError extends Error {
  constructor() {
    super('Email is taken');
  }
}
