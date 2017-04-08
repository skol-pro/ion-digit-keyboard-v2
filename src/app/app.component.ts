import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { IonDigitKeyboard, IonDigitKeyboardOptions } from '../components/ion-digit-keyboard/ion-digit-keyboard';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = Page1;

    pages: Array<{ title: string, component: any }>;

    keyboardSettings: IonDigitKeyboardOptions = {
        align: 'center',
        width: '',
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

    constructor(public platform: Platform) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Page One', component: Page1 },
            { title: 'Page Two', component: Page2 }
        ];

        // Subscriber way     
        IonDigitKeyboard.onClick.subscribe((key) => {
            console.log('From subscriber: ', key);
        })
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    // Event way
    numberClick(key: number) {
        console.log('From event: ', key);
    }

    hideKeyboard() {
        IonDigitKeyboard.hide();
    }
}
