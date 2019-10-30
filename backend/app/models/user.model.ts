import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { Service } from './service.model';

@Table
export class User extends Model<User> {
  @HasMany(() => Service)
  services!: Service[];

  @Column
  username!: string;

  @Column
  firstname!: string;

  @Column
  lastname!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  role!: string;

  toSimplification(): any {
    return {
      'id': this.id,
      'username': this.username,
      'firstname': this.firstname,
      'lastname': this.lastname,
      'email': this.email,
      'password': this.password,
      'role': this.role
    }
  }

  fromSimplification(simplification: any): void {
    this.username = simplification['username'];
    this.firstname = simplification['firstname'];
    this.lastname = simplification['lastname'];
    this.email = simplification['email'];
    this.password = simplification['password'];
    this.role = simplification['role'];
  }
}
