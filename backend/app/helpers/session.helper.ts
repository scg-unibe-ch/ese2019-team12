import { getSessionToken } from '../helpers/crypt.helper';
import { User } from '../models/user.model';

const regEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/');

export async function getTokenOrNull(login: string, password: string){
  let token = null;
  let column = '';
  column = regEmail.test(login) ? 'email' : 'username';
  searchByColumn(column, login).then(instance => {
    if(instance){
      const id = instance.toSimplification().id;
      token = getSessionToken(String(id));
    }
  });
  return token;
}

async function searchByColumn(column: string, login: string){
  return await User.findOne({ where: { 'email': login }});
}
