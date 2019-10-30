import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Service extends Model<Service> {
  @Column
  name!: string;

  @Column
  description!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  toSimplification(): any {
    return {
      'id' : this.id,
      'name': this.name,
      'description': this.description
    }
  }

  fromSimplification(simplification: any): void {
    this.name = simplification['name'];
    this.description = simplification['description'];
  }
}
