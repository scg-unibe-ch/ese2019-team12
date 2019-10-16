import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPass').value;

    return pass === confirmPass ? null : { notSame: true }
}
