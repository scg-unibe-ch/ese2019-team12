import { Role } from './role';

export class User {

  constructor(
    public id: number,
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public role: Role
) {}
}
