import { ActionOptions } from './action.interface';

export interface IonDigitKeyboardOptions {
    /**
     * Keyboard horizontal alignement (no effects on full width).
     */
    align?: string;
    /**
     * Keyboard width, can be expressed as number, in percent or pixels.
     */
    width?: any;
    /**
     * Keyboard (default) visibility.
     */
    visible?: boolean;
    /**
     * Keyboard left action options.
     */
    leftActionOptions?: ActionOptions;
    /**
     * Keyboard right action options.
     */
    rightActionOptions?: ActionOptions;
    /**
     * Display buttons rounded or squared.
     */
    roundButtons?: boolean;
    /**
     * Display letters under buttons number.
     */
    showLetters?: boolean;
    /**
     * If set to true, swiping the keyboard from top to bottom will hide it.
     */
    swipeToHide?: boolean;
    /**
     * Keyboard visual theme.
     * Available themes: IonDigitKeyboard.themes
     */
    theme?: string;
}