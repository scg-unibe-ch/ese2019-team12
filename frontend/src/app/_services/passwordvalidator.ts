import { FormControl, FormGroup } from '@angular/forms';

export class Passwordvalidator {
    /**
     * Validates that the two inputted passwords are identical
     * @param  formGroup the passwordForm.
     * @return  areEqual: true if they don't match, null if they match. (formcontrol logic, not by choice)
     */
    static areEqual(formGroup: FormGroup) {
        let val;
        let valid = true;

        for (const key in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(key)) {
                const control: FormControl = formGroup.controls[key] as FormControl;
                if (val === undefined) {
                    val = control.value;
                } else {
                    if (val !== control.value) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        if (valid) {
            return null;
        }
        return {
            areEqual: true
        };
    }
}
