import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'keys',  pure: false })
export class KeysPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value);
    }
}


@Pipe({ name: 'keysNoParams', pure: false})
export class KeysNoParamsPipe implements PipeTransform {
    transform(value: any, args: any[]) {
        args.forEach((arg) => {
            const index = value.indexOf(arg);
            if (index !== -1) {
                value.splice(index, 1);
            }
        });
        return value;
    }
}
