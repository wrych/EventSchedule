export class AuthUser {
  email: string;
  familyName: string;
  givenName: string;
  id: number;

  constructor(
    id: number,
    email: string,
    familyName: string,
    givenName: string
  ) {
    this.id = id;
    this.email = email;
    this.familyName = familyName;
    this.givenName = givenName;
  }

  static fromJSON(json: {
    id: number;
    email: string;
    familyName: string;
    givenName: string;
  }): AuthUser | null {
    return json
      ? new AuthUser(json.id, json.email, json.familyName, json.givenName)
      : null;
  }
}
