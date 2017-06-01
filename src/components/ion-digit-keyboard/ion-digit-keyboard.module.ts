/**
 * @name IonDigitKeyboard
 * @description A digital keyboard for Ionic 2.
 * @author Skol (Vincent Letellier)
 * @see {@link https://github.com/skol-pro/ion-digit-keyboard-v2 Ionic 2 Digit Keyboard}
 *
 */

// @TODO Create toolbar service ?

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonDigitKeyboardCmp } from './components';


@NgModule({
    imports: [CommonModule],
    declarations: [
        IonDigitKeyboardCmp
    ],
    providers: [],
    exports: [IonDigitKeyboardCmp]
})
export class IonDigitKeyboard { }