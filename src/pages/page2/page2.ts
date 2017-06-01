import { Component, ViewChild, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../../components/ion-digit-keyboard';

@Component({
    selector: 'page-page2',
    templateUrl: 'page2.html'
})
export class Page2 implements OnInit {
    @ViewChild(IonDigitKeyboardCmp) keyboard;

    userId: string = '';
    userPassword: string = '';
    focus: string = '';

    public keyboardSettings: IonDigitKeyboardOptions = {
        align: 'center',
        //width: '85%',
        visible: false,
        leftActionOptions: {
            iconName: 'ios-backspace-outline',
            fontSize: '1.4em'
        },
        rightActionOptions: {
            //iconName: 'ios-checkmark-circle-outline',
            text: '.',
            fontSize: '1.3em'
        },
        roundButtons: false,
        showLetters: true,
        swipeToHide: true,
        // Available themes: IonDigitKeyboard.themes
        theme: 'alihossein'
    };

    constructor(public navCtrl: NavController) {
    }
    
    ngOnInit(): void {
        /**
         * Since we want to prevent native keyboard to show up, we put the disabled
         * attribute on the input, and manage focus programmaticaly.
         */
        this.keyboard.onClick.subscribe((key: any) => {
            let field = this.focus;
            if (typeof key == 'number') {
                this[field] += key;
            } else {
                if (key == 'left') this[field] = this[field].substring(0, this[field].length - 1);
                if (key == 'right') this.performLogin();
            }
        });

        // (BLur) Clear focus field name on keyboard hide
        this.keyboard.onHide.subscribe(() => {
            this.focus = '';
        });
    }

    setFocus(field: string) {
        this.focus = field;
        this.keyboard.show();
    }

    private performLogin() {
        this.keyboard.hide(() => {
            // Alert after keyboard get hidden
            alert('ID: "' + this.userId + '"\nPassword: "' + this.userPassword + '"')
        });
    }
}
