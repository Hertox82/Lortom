/**
 * Created by hadeluca on 17/10/17.
 */

import {Injectable} from '@angular/core';
import {SlideItem} from '../interfaces/slideItem.interface';
@Injectable()
export class RoutingService {
    routes: SlideItem[];
    constructor() {}
}
