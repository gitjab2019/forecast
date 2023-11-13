import { IUser } from "./Interfaces";

export class User implements IUser {

    id: number | null = null;
    email: string | null;
    password: string | null;
  
    constructor(user?: any) {
      this.id = user.id != null ? user.id : null;
      this.email = user.email != null ? user.email : null;
      this.password = user.password != null ? user.password : null;
    }
}
  