<img src="https://s3.amazonaws.com/ionic-marketplace/ionic-2-digital-keyboard/banner.png" style="width: 100%" />

#Ionic 2 Digit Keyboard

![](http://icons.iconarchive.com/icons/yusuke-kamiyamane/fugue/16/information-button-icon.png) Try it now using [Ionic View](http://view.ionic.io/) with the following id: **c53c6c00**.

* [Info](#1---info)
* [Installation & loading](#2---installation--loading)
* [Usage](#3---usage)
	* [Importing in component](#31---importing-in-component)
	* [Public methods & events](#32---public-methods--events)
	* [Options](#33---options)
* [Toolbar](#4---toolbar)
* [Example / demo](#5---example--demo)
	
##1 - Info
Version: 2.0<br>
Author: Skol (Vincent Letellier)<br>
Email: skol.pro@gmail.com<br>
Donations: You're really welcome to donate, any amount at any time :-)

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ADEZD3EL9DN5Q&lc=US&item_name=Ionic%20Digital%20Keyboard&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted)

##2 - Installation & loading
Copy the `ion-digit-keyboard` component folder into your project (under **src/components/** for example). Import the component in your **app.module.ts**, add it to the `declarations` and `entryComponents` arrays.
```javascript
// app.module.ts
import { IonDigitKeyboard } from '../components/ion-digit-keyboard/ion-digit-keyboard';
// ...
@NgModule({
    declarations: [
        MyApp,
        IonDigitKeyboard,
        // ...
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        IonDigitKeyboard,
        // ...
    ],
    providers: []
})
export class AppModule { }
```

##3 - Usage
####3.1 - Importing in component
You can now import the keyboard wherever you want, however I suggest you to insert it in your **app.component.ts** to have access to the it globaly (and destroy it later if needed).
Add it in your application html template, under `ion-nav` for example (in most case you'll have one).
```javascript
// app.component.ts
import { IonDigitKeyboard } from '../components/ion-digit-keyboard/ion-digit-keyboard';
```
```html
<!-- app.html (or inline template under app.component.ts) -->
<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>

<ion-digit-keyboard></ion-digit-keyboard>
```
Don't forget to import **ion-digit-keyboard.scss** in **app.scss**.<br><br>
With this minimalist configuration, you can already use the keyboard, just subscribe to the `onClick` event !
```javascript
// app.component.ts
constructor(platform: Platform) {
    // ...
    IonDigitKeyboard.onClick.subscribe((key) => {
        // Log the pressed key
        console.log(key);
    });
}
```

####3.2 - Public methods & events
Here are the public methods:
- **show** *(function)*: Show the keyboard. The optional callback will be called after transition ends.
- **hide** *(function)*: Hide the keyboard. The optional callback will be called after transition ends.
- **destroy** *(function)*: Destroy the keyboard component and call the optional callback.

And here are the available events:
- **buttonClick**: Any button clicked
- **leftActionClick**: Left action clicked
- **rightActionClick**: Left action clicked
- **numberClick**: Number key clicked
Example for the `buttonClick`:
```html
<ion-digit-keyboard (buttonClick)="onKeyboardButtonClick()"></ion-digit-keyboard>
```
```javascript
// app.component.ts
public onKeyboardButtonClick(key: any) {
    // Key can be a number (0-9) or a string ('left' or 'right')
}
```
There is also 3 available subscribers:
- **onClick**: Same as `buttonClick` event.
- **onShow**: Use this **method** to register a callback when the keyboard is showing up (after the animation)
- **onHide**: Use this **method** to register a callback when the keyboard is getting hidden (also after the animation)
```javascript
IonDigitKeyboard.onClick.subscribe((key: any) => {
    // Do something
});
IonDigitKeyboard.onShow.subscribe(() => {
    // Do something
});
```

####3.3 - Options
First, I recommend you to import `IonDigitKeyboardOptions`.
```javascript
// app.component.ts
import { IonDigitKeyboard, IonDigitKeyboardOptions } from '../components/ion-digit-keyboard/ion-digit-keyboard';
```
Keyboard options (`IonDigitKeyboardOptions` interface):
- **align** *(string)*: Keyboard horizontal alignement (no effects on full width). Can be `'left'`, `'center'` or `'right'`.
- **width** *(any)*: Keyboard width, can be expressed as number or as string for percents and pixels.
- **visible** *(boolean)*: Keyboard visibility.
- **leftActionOptions** *(ActionOptions)*: Keyboard left action options.
- **rightActionOptions** *(ActionOptions)*: Keyboard right action options.
- **roundButtons** *(boolean)*: If set to true, it turns the buttons to rounded buttons. It won't looks good for most of the themes.
- **showLetters** *(boolean)*: If set to true, it will display letters under buttons number.
- **swipeToHide** *(boolean)*: If set to true, swiping the keyboard from top to bottom will hide it.
- **theme** *(string)*: Keyboard visual theme. Available themes: `'light'`, `'dark'`, `'ionic'`, `'opaque-black'`, `'opaque-white'`, `'dusk'`, `'nepal'`, `'alihossein'`, `'messenger'`. Also accessible from `IonDigitKeyboard.themes`.
You can put all of them on the `ion-digit-keyboard` component:
```html
<ion-digit-keyboard
    [align]="keyboardSettings.align"
    [width]="keyboardSettings.width"
    [visible]="keyboardSettings.visible"
    [leftActionOptions]="keyboardSettings.leftActionOptions"
    [rightActionOptions]="keyboardSettings.rightActionOptions"
    [roundButtons]="keyboardSettings.roundButtons"
    [showLetters]="keyboardSettings.showLetters"
    [swipeToHide]="keyboardSettings.swipeToHide"
    [theme]="keyboardSettings.theme"
    (numberClick)="numberClick($event)"
>
</ion-digit-keyboard>
```
```javascript
keyboardSettings: IonDigitKeyboardOptions = {
    align: 'center',
    width: '',
    visible: false,
    leftActionOptions: {
        iconName: 'ios-backspace-outline',
        fontSize: '1.4em'
    },
    rightActionOptions: {
        iconName: 'ios-checkmark-circle-outline',
        fontSize: '1.3em'
    },
    roundButtons: false,
    showLetters: true,
    swipeToHide: true,
    theme: 'ionic'
}
```

Actions options (`ActionOptions` interface):
- **hidden** *(boolean)*: Display the action button or not.
- **fontSize** *(string)*: Optional icon font size adjustement.
- **iconName** *(string)*: The action Ionic icon name to display.

As you probably already understood, **none of those otpions are required** !

##4 - Toolbar
You can add an `ion-toolbar` inside the `ion-digit-keyboard` component:
```html
<ion-digit-keyboard>
    <ion-toolbar no-border-bottom>
        <ion-buttons start>
            <button ion-button (click)="hideKeyboard()">Cancel</button>
        </ion-buttons>
        <ion-buttons end>
            <button ion-button solid>Next</button>
            <button ion-button solid>Done</button>
        </ion-buttons>
    </ion-toolbar>
</ion-digit-keyboard>
```

##5 - Example / demo
Simply clone this repo, run `npm install` and `ionic serve`.

