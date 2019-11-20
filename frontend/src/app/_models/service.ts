import { Role } from './role';

export class Service {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public price: number,
    public tags: string
) {}
}
