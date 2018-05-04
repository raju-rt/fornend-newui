import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  // transform(value: any, input: string) {
  transform(value: any, input: any, name: any): any {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        // console.log(el[name].toLowerCase().indexOf(input) > -1);

        if (input == 'true') {
          return (el[name] == true) ? el : '';

        }
        else if (input == 'false') {
          return (el[name] == false) ? el : '';

        }
        else {
          return el[name].toLowerCase().indexOf(input) > -1;
        }
      })
    }
    return value;
  }

}
