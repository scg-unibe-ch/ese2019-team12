import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  firstname!: string;

  @Column
  lastname!: string;
  
  @Column
  email!: string;

  @Column
  password!: string;

  toSimplification(): any {
    return {
      'id': this.id,
      'firstname': this.firstname,
      'lastname': this.lastname,
      'email': this.email
    }
  }

  fromSimplification(simplification: any): void {
    this.firstname = simplification['firstname'];
    this.lastname = simplification['lastname'];
    this.email = simplification['email'];
    this.password = simplification['password'];
  }
}
