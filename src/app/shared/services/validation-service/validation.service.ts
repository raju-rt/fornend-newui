import { FormControl } from '@angular/forms';
export class FormsValidationService {

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            'required': 'This Field is Required',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'maxlength': `Maximum length is ${validatorValue.requiredLength} you have exceeded`,
            'url': 'Invalid',
            'Phno': 'Invalid Phone Number',
            'pattern': `confirm password not matched with password`,
            'email': 'Invalid E-Mail',
            'phno': 'Invalid Mobile Number ',
            'passwordmatch': 'Password Dosent match',
            'numberonly': 'Only Numbers are Allowed'
        };

        return config[validatorName];
    }

    static url(control) {

        const pattern = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
        if (control.value === '' || control.value === null) {
            return null;
        } else if (control.value.match(pattern)) {
            return null;
        } else {
            return { 'url': true };
        }
    }
    static phone(control) {

        const pattern = /^[0-9]{10}$/;
        if (control.value === '' || control.value === null) {
            return null;
        } else if (control.value.match(pattern)) {
            return null;
        } else {
            return { 'phno': true };
        }
    }
    static greaterpercent(control) {
        if (control.value === '' || control.value === null) {
            return null;
        } else
            if (control.value > 100 || control.value < 100) {
                return { 'percent': true };
            } else {
                return null;
            }
    }
    static numberOnly(control) {
        const pattern = '^\\d+$';
        if (control.value === '' || control.value === null) {
            return null;
        } else if (control.value.match(pattern)) {
            return null;
        } else {
            return { 'numberonly': true };
        }
    }
    static matchOtherValidator(otherControlName: string) {

        let thisControl: FormControl;
        let otherControl: FormControl;

        return function matchOtherValidate(control: FormControl) {

            if (!control.parent) {
                return null;
            }

            // Initializing the validator.
            if (!thisControl) {
                thisControl = control;
                otherControl = control.parent.get(otherControlName) as FormControl;
                if (!otherControl) {
                    throw new Error('matchOtherValidator(): other control is not found in parent group');
                }
                otherControl.valueChanges.subscribe(() => {
                    thisControl.updateValueAndValidity();
                });
            }

            if (!otherControl) {
                return null;
            }

            if (otherControl.value !== thisControl.value) {
                return {
                    'passwordmatch': true
                };
            }

            return null;

        }

    }

}
