import { Role } from './role';

export class Service {

  constructor(
    public id: number,
    public userId: number,
    public title: string,
    public description: string,
    public image: string,
    public price: number,
    public tags: string[]
) {}
}
