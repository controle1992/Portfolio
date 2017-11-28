export class User {
  id: string;
  email: string;
  password: string;

  constructor() {
  }

  public static isNull (user: User): boolean {
    return user.email === null &&
      user.password === null;
  }
}
