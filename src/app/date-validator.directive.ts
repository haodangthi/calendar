import * as moment from 'moment';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const startDate: any = (<FormGroup>control.parent).get('startDate');
    const endDate = control.value;

    console.log(endDate, moment.max(moment(startDate), moment(endDate)));

    return moment
      .max(moment(startDate), moment(endDate))
      .format('MM-DD-YYYY') == moment(endDate).format('MM-DD-YYYY')
      ? { endDate: true }
      : null;
  };
}
