import { AbstractControl, ValidatorFn } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

export function uniqueUsername(userService: UserService): ValidatorFn{
  console.log('xdddddddddddddddddddddddddddddddddddddddddd');
  return (control: AbstractControl): {[key: string]: any} | null => {
    const unique = userService.existsByUsername(control.value);
    return unique ? {uniqueUsername: {value: control.value}} : null;
  };
}
