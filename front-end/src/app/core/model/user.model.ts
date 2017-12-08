export class User {
  id: string;
  email: string;
  password: string;
  facebookId: string;
  accessToken: string;

  constructor() {
  }

  public static tokenNull (user: User): boolean {
    return user.facebookId === null &&
      user.accessToken === null;
  }

  public static isNull (user: User): boolean {
    return user.email === null &&
      user.password === null;
  }
}
