export class UserBuilder {
  user = {
    username: 'username',
    email: 'email',
    password: 'password',
  };

  static aUser() {
    return new UserBuilder();
  }

  withUsername(username: string) {
    this.user.username = username;
    return this;
  }

  withEmail(email: string) {
    this.user.email = email;
    return this;
  }

  withPassword(password: string) {
    this.user.password = password;
    return this;
  }

  build() {
    return this.user;
  }
}
