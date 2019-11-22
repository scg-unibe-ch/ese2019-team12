import { FormControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class AsyncValidators {
    static checkEmail(userService: UserService) {
        console.log("checking email");
        return (control: FormControl) => {
            return userService.isEmailTaken(control.value).pipe(map(
                res => {
                    console.log("isEmailTaken: ", res.isUsed);
                    return (res.isUsed) ? {emailTaken: true} : null;
                }
            ));
        }
    };

    static checkUsername(userService: UserService) {
        console.log("checking username");
        return (control: FormControl) => {
            return userService.isUsernameTaken(control.value).pipe(map(
                res => {
                    console.log("isUsernameTaken: ", res.isUsed);
                    return (res.isUsed) ? {usernameTaken: true} : null;
                }
            ));
        }
    };
}
