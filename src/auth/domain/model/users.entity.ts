export class User {
  username: string;
  email: string;
  password: string;

  passwordMatches(password: string) {
    return this.password === password;
  }
}
