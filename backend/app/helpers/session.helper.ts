import { getSessionToken } from '../helpers/crypt.helper';
import { User } from '../models/user.model';

export async function getTokenOrNull(login: string, password: string){
  let token = null;
  await User.findOne({
    where: {
      'email': login
    }
  }).then(instance => {
    if(instance) {
      const id = instance.toSimplification().id;
      token = getSessionToken(String(id));
    }
  });
  return token;
}
