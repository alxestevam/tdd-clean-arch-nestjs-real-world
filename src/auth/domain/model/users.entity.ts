import bcrypt from 'bcrypt';

export class User {
  username: string;
  email: string;
  password: string;
  image?: string;
  bio?: string;

  passwordMatches(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  setPassword(password: string) {
    this.password = bcrypt.hashSync(password, 10);
  }
}
