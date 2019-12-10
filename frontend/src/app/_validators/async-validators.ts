import { FormControl } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { map } from 'rxjs/operators';

export class AsyncValidators {
    static checkEmail(userService: UserService) {
        return (control: FormControl) => {
            return userService.isEmailTaken(control.value).pipe(map(
                res => {
                    return (res.isUsed) ? {emailTaken: true} : null;
                }
            ));
        };
    }

    static checkUsername(userService: UserService) {
        return (control: FormControl) => {
            return userService.isUsernameTaken(control.value).pipe(map(
                res => {
                    return (res.isUsed) ? {usernameTaken: true} : null;
                }
            ));
        };
    }
}
