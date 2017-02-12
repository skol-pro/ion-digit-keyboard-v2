import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { IonDigitKeyboard } from '../../components/ion-digit-keyboard/ion-digit-keyboard';

@Component({
    selector: 'page-page1',
    templateUrl: 'page1.html'
})
export class Page1 {

    constructor(public navCtrl: NavController) { }

    showKeyboard() {
        IonDigitKeyboard.show();
    }

}
