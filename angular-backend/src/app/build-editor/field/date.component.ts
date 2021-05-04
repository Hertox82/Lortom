import { LTComponent } from '../abstract.component';
import { OnInit, Input, EventEmitter, Component, ViewChild } from '@angular/core';
import { NgbDateParserFormatter, NgbInputDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerFormatter } from '../service/datepickerformatter.service';
import { GenericField } from './genericField.component';



@Component({
    // tslint:disable-next-line:component-selector
    selector: 'datefield',
    template: `
    <div class="col-12">
        <div class="form-group flex-group">
            <label for="nome" class="col-md-2 control-label">{{label}}</label>
            <div class="col-md-8">
                <div class="input-group">
                    <input class="form-control" placeholder="{{placeholder}}" [readOnly]="true"
                        name="dp" [(ngModel)]="data" ngbDatepicker #d="ngbDatepicker">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary calendar" (click)="d.toggle()" type="button"></button>
                    </div>
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary times" (click)="erase()" type="button"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    styles: [`button.calendar {width: 2.75rem;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEUSURBVEiJ7ZQxToVAEIY/YCHGxN6XGOIpnpaEsBSeQC9ArZbm9TZ6ADyBNzAhQGGl8Riv4BLAWAgmkpBYkH1b8FWT2WK/zJ8ZJ4qiI6XUI3ANnGKWBnht2/ZBDRK3hgVGNsCd7/ui+JkEIrKtqurLpEWaphd933+IyI3LEIdpCYCiKD6HcuOa/nwOa0ScJEnk0BJg0UTUWJRl6RxCYEzEmomsIlPU3IPW+grIAbquy+q6fluy/28RIBeRMwDXdXMgXLj/B2uimRXpui4D9sBeRLKl+1N+L+t6RwbWrZliTTTr1oxYtzVWiTQAcRxvTX+eJMnlUDaO1vpZRO5NS0x48sIwfPc87xg4B04MCzQi8hIEwe4bl1DnFMCN2zsAAAAASUVORK5CYII=') !important;
        background-repeat: no-repeat;
        background-size: 23px;
        background-position: center;}`,
        `
        button.times {
            width: 2.75rem;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAABQCAYAAACu/a1QAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAABGNJREFUeJztm0FoVEcYx//f2zVViilFFKNCqZdQ6K29KF4We1DQHsSD+LKbkw02aXsoBW9JwJsH3TYKatCSt6vyoPQgtV6Kp948tId6UArtpbRpY6C0aWHfzudB36Pkze6bmTeT7Jb5HWde5pvfnyQ7870E8Hg8Ho/H4/F4PB6PZyghky+anZ0Ndo6Pv8HMoyPAk6kw/MP2xopoRtE+InotEOK36Xr9RyJi3TW05S+3WjWmYJGA/S+GBMCfV//a/sHU1LtruuvpshDHu9Hp3CDQ0WyQ+WHAYvJsvf5IZy0t+c9arWME+oKIRtbPMfDgn25y/JNG42+dNXW4GkVjnaDygIDxXH3mpwAfnpmY+E51PWX5fuLZBhwG0E88q68ZgJK8ini2AQcBqIhn9TUCKJTXEc82YDEAHfGsvmIAfeVNxLMNWAjARDyrrxBAT/ky4tkGSgRQRjyrXxCAVH6h3T4ExjdlxLMNGARgQ/w/rDCLt2YmJn5ePxHInibGRRviAEBAbVulevfC0tLLKs9bFgeAHUTBnGwiJ9+MolEQvW2pMAD1AByIp7wjG8zJB0JssVwYQHEADsXBgPS7OCc/02g8BZD7+bBBrwBcigMAMR7KxnPyRMTMYs7FJoB8AK7FmbkriM/32Iucy+32HECzLjYEPP8U6AZ0piL4K1fiAASDGzNh2JZN9j3kuA4AzAmIqo5WFyBMTp8+3er1QOHx1nkAbigUBxQvNkMWgJI4oHGlHZIAlMUBzWbGgAegJQ6YtLEGMwBtccCwgTlgARiJA4bywMAEYCwOlJAHNj2AUuJASXlg0wIoLQ5YkAc2PAAr4oAleWDDArAmDvTo5JhQFeIqgBVb68lg8KO1JPnS1npW5NNrKYAdNtbrBYHe1GmJFa9XEtf3cRm23guUkt8M8RQbARjLb6Z4StkAjOQHQTylTADa8oMknmIagJb8IIqnmASgLD/I4im6ASjJD4N4ik4AhfLDJJ6iGkBf+WEUT1EJoOfxdgPEBcDWzunrUXk5KpW/srS0y7k4YXI6DE8APO+oRhZA8969l2TzUnkOKpeci7+4lk6H4ZzrACqrqx/L5nLycRyPMNFJR3uR3sddBwBQKBvNyf+SJK8S4OIdfd9GhNMAmHfLhnPyq2NjKwBs/xGhUgfGVQBE+Ek2npOfr9USMG5arK3VenIRAAPXZOPSX3hrIjkH4FsLdY16blYDYLR/f/z4umyq5yFncXFx+79bt90nooOGZUs3G0s3RZlvL+/d05iv1RLZdN8TXjOKRisUfG0QgLUuq3EABeKAwtm+GUWjVarcB+GAYlmr7WXAIADGneW9Y/V+4oDirU4jAOviKcoBKIoDGvd5hQCciacUBqAhDmj07T+q1/9MuHsEsk8B5oTBDZfiQPYpIJVn8C0dccCghxfH8chyp/MegOPEeAWEH7rdyqcfNk59r7uWKQvR7cMIxBkwvQ7iX4mDW++Hp2KTfzLyeDwej8fj8Xj+JzwDRaiZzyxMDhIAAAAASUVORK5CYII=');
            background-repeat: no-repeat;
            background-size: 23px;
            background-position: center;}
        }
        `
    ],
    providers: [{provide: NgbDateParserFormatter, useClass: DatePickerFormatter}]
})
export class DateComponent extends GenericField implements OnInit, LTComponent {
    @Input() data: NgbDateStruct;
    copyData: NgbDateStruct;
    index: number;
    send: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('d', {static: false, read: NgbInputDatepicker}) dp: NgbInputDatepicker;
    ngOnInit() {
    }
    setData(data: any) {
        this.setGenericData(data);
        this.data = this.parseData(data.data);
        this.copyData = this.data;
    }

    getData() {
        if (this.data != undefined) {
            return {
                id: this.name,
                data: this.data
            };
        } else {
            return null;
        }
    }
    erase() {
        this.data = null as any;
    }

    eraseData() {
        this.data = null as any;
    }
    resetData() {
        // this.dp.manualDateChange(null, true);
        this.data = null as any;
        this.copyData = null;
    }
    bindData() {}
    editData(data: any) {
        this.data = this.parseData(data);
        // this.dp.manualDateChange(this.data, true);
    }


    parseData(data: string): NgbDateStruct {
        if (data) {
            const birthday = data.split('-');
            const d: number = +birthday[0];
            const m: number = +birthday[1];
            const y: number = +birthday[2];
            return {
                day: d,
                month: m,
                year: y
            };
        } else {
            return null as any;
        }
    }
}
