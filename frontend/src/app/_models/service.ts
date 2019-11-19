import { Role } from './role';

export class Service {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public role: Role
) {}
}
