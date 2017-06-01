import { Component, ViewChild, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../../components/ion-digit-keyboard';

@Component({
    selector: 'page-page1',
    templateUrl: 'page1.html'
})
export class Page1 implements OnInit {
    @ViewChild(IonDigitKeyboardCmp) keyboard;

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
        theme: 'ionic'
    };

    constructor(public navCtrl: NavController) {
    }
    
    ngOnInit(): void {
        // Subscriber way     
        this.keyboard.onClick.subscribe((key) => {
            console.log('From subscriber: ', key);
        });
    }

    public showKeyboard() {
        this.keyboard.show();
    }

    // Event way
    public numberClick(key: number) {
        console.log('From event: ', key);
    }

    public hideKeyboard() {
        this.keyboard.hide();
    }

}
