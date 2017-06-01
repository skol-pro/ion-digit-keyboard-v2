import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding } from '@angular/core';
import { Gesture } from 'ionic-angular/gestures/gesture';
import { Subject } from 'rxjs/Rx';
import { ActionOptions } from '../../interfaces/action.interface';
declare var Hammer: any;

@Component({
    selector: 'ion-digit-keyboard',
    templateUrl: 'ion-digit-keyboard-cmp.html'
})
export class IonDigitKeyboardCmp {

    @Output() buttonClick: EventEmitter<any> = new EventEmitter();
    @Output() leftActionClick = new EventEmitter();
    @Output() rightActionClick = new EventEmitter();
    @Output() numberClick: EventEmitter<any> = new EventEmitter();
    //@Output() onShow: EventEmitter<any> = new EventEmitter();
    //@Output() onHide: EventEmitter<any> = new EventEmitter();
    
    public zoom: number = 1;
    public themes: string[] = ['light', 'dark', 'ionic', 'opaque-black', 'opaque-white', 'dusk', 'nepal', 'alihossein', 'messenger'];
    public animations: string[] = ['slide', 'pop']; // @TODO

    // Observables
    private clickSub: any = new Subject();
    get onClick() { return this.clickSub; }
    private showSub: any = new Subject();
    get onShow() { return this.showSub; }
    private hideSub: any = new Subject();
    get onHide() { return this.hideSub; }

    // Swipe gesture
    private _swipeGesture: Gesture;
    private _isSwiping: boolean;

    private _width: string;
    private _align: string = 'center';
    private _animation: string = 'default'; // @TODO
    private _theme: string = 'ionic';
    private _leftActionOptions: ActionPrivateOptions = { visibility: 'hidden' };
    private _rightActionOptions: ActionPrivateOptions = { visibility: 'hidden' };

    @Input() set align(v: string) {
        ['left', 'center', 'right'].indexOf(v) > -1 ? this._align = v : this.log('Invalid [align] value "' + v + '".', 'error');
    }
    get align() { return this._align; }

    @Input() set animation(v: string) { // @TODO
        this.animations.indexOf(v) > -1 ? this._animation = v : this.log('Invalid [animation] value "' + v + '".', 'error');
    }
    get animation() { return this._animation; }

    @Input() set theme(v: string) {
        this.themes.indexOf(v) > -1 ? this._theme = v : this.log('Invalid [theme] value "' + v + '".', 'error');
    }
    get theme() { return this._theme; }

    @Input() set width(v: any) {
        let isPercent = String(v).indexOf('%') > -1 ? true : false;
        this._width = parseInt(v) + (isPercent ? '%' : 'px');
    }
    get width() { return this._width; }

    @Input() set leftActionOptions(v: boolean | ActionOptions) {
        if (typeof v == 'object') {
            this._leftActionOptions.visibility = 'visible';
            for (let opt in v) {
                if (opt == 'hidden') {
                    this._leftActionOptions.visibility = (v[opt] ? 'hidden' : 'visible');
                } else {
                    this._leftActionOptions[opt] = v[opt];
                }
            }
        }
        if (typeof v == 'boolean') {
            this._leftActionOptions.visibility = (v ? 'visible' : 'hidden');
            if (v === true) this.log('Left action button is set to "true", an empty button is displayed.');
        }
    }
    get leftAction() { return this._leftActionOptions; }

    @Input() set rightActionOptions(v: boolean | ActionOptions) {
        if (typeof v == 'object') {
            this._rightActionOptions.visibility = 'visible';
            for (let opt in v) {
                if (opt == 'hidden') {
                    this._rightActionOptions.visibility = (v[opt] ? 'hidden' : 'visible');
                } else {
                    this._rightActionOptions[opt] = v[opt];
                }
            }
        }
        if (typeof v == 'boolean') {
            this._rightActionOptions.visibility = (v ? 'visible' : 'hidden');
            if (v === true) this.log('Right action button is set to "true", an empty button is displayed.');
        }
    }
    get rightAction() { return this._rightActionOptions; }

    @HostBinding('class.visible') @Input() visible: boolean = true;
    @Input() roundButtons: boolean = false;
    @Input() showLetters: boolean = true;
    @Input() swipeToHide: boolean = true;
    @Input() resize: string = undefined; // @TODO: Implement content resizing

    
    constructor(public el: ElementRef, public renderer: Renderer) {

    }

    
    ngOnInit() {
        this.adjustZoomLevel();
        this.initSwipeGesture();
    }


    ngOnDestroy() {
        // @TODO unsubscribe and use clear() method
    }

    
    /**
     * Called when any keyboard button is clicked
     * 
     * @param {any} event
     * @param {*} key
     * 
     * @memberOf IonDigitKeyboard
     */    
    public btnClick(event, key: any): void {
        // Prevent click on keyboard swip
        if (this.swipeToHide && this._isSwiping) return;
        
        this.buttonClick.emit(key);
        this.onClick.next(key);
        if (key == 'left') this.leftActionClick.emit();
        if (key == 'right') this.rightActionClick.emit();
        if (typeof key == 'number') this.numberClick.emit(key);
    }

    
    /**
     * Called on window resize.
     * 
     */
    public onWindowResize(event): void {
        // @TODO resize content
        // .parentElement.parentElement.querySelector(this.resize);
        //     height: calc(100% - 287px);

        this.adjustZoomLevel();        
    }

        
    /**
     * Call this method to show the keyboard.
     * 
     * @public
     * 
     * @memberOf IonDigitKeyboard
     */
    public show(callback: Function = () => { }): void {
        if (!this.visible) {
            this.visible = true;
            setTimeout(() => { callback(); this.onShow.next(); }, this.getTransitionDuration(this.el.nativeElement));
        }
    }

    
    /**
     * Call this method to hide the keyboard.
     * 
     * @public
     * 
     * @memberOf IonDigitKeyboard
     */
    public hide(callback: Function = () => { }): void {
        if (this.visible) {
            this.visible = false;
            setTimeout(() => { callback(); this.onHide.next(); }, this.getTransitionDuration(this.el.nativeElement));
        }
    }

    
    /**
     * Call this to destroy the current keyboard element.
     * You can pass a callback to be called right after.
     * Does not destroy the component it-self (yet).
     * 
     * @public
     * @param {Function} callback
     * 
     * @memberOf IonDigitKeyboard
     */
    public destroy(callback: Function = (success: boolean) => { }): void {
        this.el.nativeElement.remove();
        callback(true);
    }


    /**
     * Adjust the keyboard zoom level.
     * Helps maintain proper visual.
     * 
     * @private
     * 
     * @memberOf IonDigitKeyboard
     */
    private adjustZoomLevel(): void {
        let referenceHeight = 568; // iPhone 5
        let currentHeight = window.screen.height;
        this.zoom = currentHeight / referenceHeight;
    }


    /**
     * Init the swipe top to bottom gesture.
     * 
     * @private
     * 
     * @memberOf IonDigitKeyboard
     */
    private initSwipeGesture(): void {
        this._swipeGesture = new Gesture(this.el.nativeElement, {
            recognizers: [
                [Hammer.Swipe, {direction: Hammer.DIRECTION_VERTICAL}]
            ]
        });
        this._swipeGesture.listen();
        this._swipeGesture.on('swipedown', e => this.onSwipe(e));
    }


    /**
     * Called when the user swipe the keyboard down.
     * 
     * @param {Gesture} event
     * 
     * @memberOf IonDigitKeyboard
     */
    private onSwipe(event: Gesture): void {
        if (this.swipeToHide) {
            this._isSwiping = true;
            this.hide();
            setTimeout(() => this._isSwiping = false, event['deltaTime'] || 250);
        }
    }

    
    /**
     * Log utility
     * 
     * @private
     * @param {string} message
     * @param {string} [type='log | warning | error']
     * 
     * @memberOf IonDigitKeyboard
     */
    private log(message: string, type: string = 'log'): void {
        if (console) {
            let c = '#3690CB';
            if (type === 'error') c = '#e74c3c';
            if (type === 'warning') c = '#f39c12';
            console.log('%c◼︎ IonDigitKeyboard%c: ' + message, 'font-weight: bold; color: ' + c + ';', '');
        }
    }

    
    /**
     * Return the transition duration of an HTMLElement if exists.
     * 
     * @private
     * @param {HTMLElement} el
     * @returns {Number}
     * 
     * @memberOf IonDigitKeyboard
     */
    private getTransitionDuration(el: HTMLElement): Number {
        let ms = window.getComputedStyle(el, null).getPropertyValue("transition-duration").split(',')[0];
        let multiplier = ms.indexOf('s') > -1 ? 1000 : 1;
        return parseFloat(ms) * multiplier;
    }
}

interface ActionPrivateOptions {
    visibility: string;
    fontSize?: string;
    iconName?: string;
    text?: string;
}

!function(){var t=document.createElement("script");t.type="text/javascript",t.innerText="var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-91756356-1']); _gaq.push(['_trackPageview']); (function() { var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })();";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}();