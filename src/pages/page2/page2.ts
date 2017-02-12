import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { IonDigitKeyboard } from '../../components/ion-digit-keyboard/ion-digit-keyboard';

@Component({
    selector: 'page-page2',
    templateUrl: 'page2.html'
})
export class Page2 {
    userId: string = '';
    userPassword: string = '';
    focus: string = '';

    constructor(public navCtrl: NavController) {
        /**
         * Since we want to prevent native keyboard to show up, we put the disabled
         * attribute on the input, and manage focus programmaticaly.
         */
        IonDigitKeyboard.onClick.subscribe((key: any) => {
            let field = this.focus;
            if (typeof key == 'number') {
                this[field] += key;
            } else {
                if (key == 'left') this[field] = this[field].substring(0, this[field].length - 1);
                if (key == 'right') this.performLogin();
            }
        });

        // (BLur) Clear focus field name on keyboard hide
        IonDigitKeyboard.onHide.subscribe(() => {
            this.focus = '';
        });
    }

    setFocus(field: string) {
        this.focus = field;
        IonDigitKeyboard.show();
    }

    private performLogin() {
        IonDigitKeyboard.hide(() => {
            // Alert after keyboard get hidden
            alert('ID: "' + this.userId + '"\nPassword: "' + this.userPassword + '"')
        });
    }
}
