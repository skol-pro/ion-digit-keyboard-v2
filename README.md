![Ionic 2 Digit Keyboard banner](https://s3.amazonaws.com/ionic-marketplace/ionic-2-digital-keyboard/banner.png)

# Ionic 2 Digit Keyboard

![](http://icons.iconarchive.com/icons/yusuke-kamiyamane/fugue/16/information-button-icon.png) Try it now using [Ionic View](http://view.ionic.io/) with the following id: **c53c6c00**.

* [Info](#1---info)
* [Changelog](#2---changelog)
* [Installation & loading](#3---installation--loading)
* [Usage](#4---usage)
	* [Importing in component](#41---importing-in-component)
	* [Public methods & events](#42---public-methods--events)
	* [Options](#43---options)
* [Toolbar](#5---toolbar)
* [Example / demo](#6---example--demo)
	
## 1 - Info
Version: 2.0<br>
Author: Skol (Vincent Letellier)<br>
Email: skol.pro@gmail.com<br>
Donations: You're really welcome to donate, any amount at any time :-)

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ADEZD3EL9DN5Q&lc=US&item_name=Ionic%20Digital%20Keyboard&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted)

## 2 - Changelog
- **What's coming next (ASAP) ?**
    - A global service to manage keyboards and dependant component(s).
    - Custom text input component:
        - Prevent native keyboard to show up.
        - Auto showing keyboard on focus.
        - Auto scroll to the input and scroll freeze.
- **Juin 1, 2017**
    - Updated demo to the latest Angular & Ionic versions (not affecting Ionic v2).
    - Refactored the component, now module oriented (see updated tutorial).
    - Can now be used on multiple pages without issues.
    - Be careful, `IonDigitKeyboard` componnet has been renamed to `IonDigitKeyboardCmp`.
- **April 8, 2017**
    - Added `text` property on action buttons. This allows having a decimal button for-example.
    - Updated README with `text` property and example (see [4.3 Options](#43---options)).

## 3 - Installation & loading
Copy the `ion-digit-keyboard` module folder into your project (under **src/components/** for example). Import the module in your **app.module.ts**.
```typescript
// app.module.ts
import { IonDigitKeyboard } from '../components/ion-digit-keyboard/ion-digit-keyboard.module';
// ...
@NgModule({
    declarations: [
        MyApp,
        // ...
    ],
    imports: [
        IonDigitKeyboard,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        // ...
    ],
    providers: []
})
export class AppModule { }
```

## 4 - Usage
#### 4.1 - Importing in component
You can import the keyboard wherever you want, globally in **app.component.ts** or on every page. For a global usage, you can insert it under `ion-nav` for example.
```typescript
// app.component.ts
import { IonDigitKeyboardCmp } from '../components/ion-digit-keyboard';
```
```html
<!-- app.html (or inline template under app.component.ts) -->
<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>

<ion-digit-keyboard></ion-digit-keyboard>
```
Don't forget to import **ion-digit-keyboard.scss** in **app.scss**.
```scss
@import './components/ion-digit-keyboard/ion-digit-keyboard';
```
With this minimalist configuration, you can already use the keyboard, just add the `buttonClick` event !
```html
<ion-digit-keyboard (buttonClick)="onKeyboardButtonClick()"></ion-digit-keyboard>
```
```typescript
onKeyboardButtonClick(key: number) {
    // Log the pressed key
    console.log(key);
}
```
You could also use the `onClick` subscriber, to do so, you'll need to use `@ViewChild()` to access the keyboard component, and `ngOnInit` to unsure it is instantiated:
```typescript
@ViewChild(IonDigitKeyboardCmp) keyboard;

//...

ngOnInit(): void {
    this.keyboard.onClick.subscribe((key) => {
        console.log('From subscriber: ', key);
    });
}
```
![](http://ficdn.mtbr.com/images/icons/icon4.png) **CAUTION** - In case no event is fired, be sure your browser **Mobile Emulation** is turned **ON**, since the keyboard is using the `touchend` event.

#### 4.2 - Public methods & events
Here are the public component methods (`this.keyboard.show(myCallback)`):
- **show** *(function)*: Show the keyboard. The optional callback will be called after transition ends.
- **hide** *(function)*: Hide the keyboard. The optional callback will be called after transition ends.
- **destroy** *(function)*: Destroy the keyboard component and call the optional callback.

And here are the available events (`(buttonClick)="btnClickFunction($event)"`):
- **buttonClick**: Any button clicked
- **leftActionClick**: Left action clicked
- **rightActionClick**: Right action clicked
- **numberClick**: Number key clicked


Example using `buttonClick`:
```html
<ion-digit-keyboard (buttonClick)="onKeyboardButtonClick()"></ion-digit-keyboard>
```
```typescript
// app.component.ts
public onKeyboardButtonClick(key: any) {
    // Key can be a number (0-9) or a string ('left' or 'right')
}
```
There is also 3 available subscribers:
- **onClick**: Same as `buttonClick` event.
- **onShow**: Use this **method** to register a callback when the keyboard is showing up (after the animation)
- **onHide**: Use this **method** to register a callback when the keyboard is getting hidden (also after the animation)
```typescript
this.keyboard.onClick.subscribe((key: any) => {
    // Do something
});
this.keyboard.onShow.subscribe(() => {
    // Do something
});
```

#### 4.3 - Options
First, I recommend you to import the `IonDigitKeyboardOptions` interface.
```typescript
// app.component.ts
import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../components/ion-digit-keyboard';
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
- **theme** *(string)*: Keyboard visual theme. Available themes: `'light'`, `'dark'`, `'ionic'`, `'opaque-black'`, `'opaque-white'`, `'dusk'`, `'nepal'`, `'alihossein'`, `'messenger'`. Also accessible from `IonDigitKeyboardCmp.themes`.
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
```typescript
keyboardSettings: IonDigitKeyboardOptions = {
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
    theme: 'ionic'
}
```

Action options (`ActionOptions` interface):
- **hidden** *(boolean)*: Display the action button or not.
- **fontSize** *(string)*: Optional font size adjustement.
- **iconName** *(string)*: The action Ionic icon name to display.
- **text** *(string)*: A text to display on the action.

As you probably already understood, **none of those otpions are required** ! Also, setting both `iconName` and `text` properties will only display the icon.

## 5 - Toolbar
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

## 6 - Example / demo
Simply clone this repo, run `npm install` and `ionic serve`.

