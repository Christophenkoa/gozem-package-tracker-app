import Role from "./Role";

export interface LoginData {
  token: string,
  user: {
    _id: string;
    email: string;
    firstname: string;
    lastName: string;
    role: Role
  }
}
