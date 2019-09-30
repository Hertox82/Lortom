import { NgbDateParserFormatter, NgbDateStruct,  } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { isNumber, toInteger, padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';




@Injectable()
export class DatePickerFormatter implements NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('-');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
              return {year: null, month: null, day: toInteger(dateParts[0])};
            } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
              return {year: null, month: toInteger(dateParts[1]), day: toInteger(dateParts[0])};
            } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
              return {year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0])};
            }
          }
      return null;
      }

      format(date: NgbDateStruct): string {
        return date ?
        `${isNumber(date.day) ? padNumber(date.day) : ''}-${isNumber(date.month) ? padNumber(date.month) : ''}-${date.year}` :
'';
    }
}
