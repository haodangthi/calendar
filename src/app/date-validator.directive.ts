import * as moment from 'moment';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { getParentControl } from './helpers/formControl';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.parent) {
      const startDate: any = getParentControl(control, 'startDate');
      const endDate = control.value;
      return startDate > endDate ? { endDate: true } : null;
    }
    return null;
  };
}
