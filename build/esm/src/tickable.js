var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Tickable_preFormatted, _Tickable_postFormatted;
import { Element } from './element.js';
import { Fraction } from './fraction.js';
import { Tables } from './tables.js';
import { defined, RuntimeError } from './util.js';
export class Tickable extends Element {
    static get CATEGORY() {
        return "Tickable";
    }
    constructor() {
        super();
        _Tickable_preFormatted.set(this, false);
        _Tickable_postFormatted.set(this, false);
        this.ticks = new Fraction(0, 1);
        this.intrinsicTicks = 0;
        this.tickMultiplier = new Fraction(1, 1);
        this.modifiers = [];
        this.tupletStack = [];
        this.alignCenter = false;
        this.centerXShift = 0;
        this.ignoreTicks = false;
        this.formatterMetrics = {
            freedom: { left: 0, right: 0 },
            duration: '',
            iterations: 0,
            space: {
                used: 0,
                mean: 0,
                deviation: 0,
            },
        };
    }
    reset() {
        return this;
    }
    getTicks() {
        return this.ticks;
    }
    shouldIgnoreTicks() {
        return this.ignoreTicks;
    }
    setIgnoreTicks(flag) {
        this.ignoreTicks = flag;
        return this;
    }
    getWidth() {
        if (!__classPrivateFieldGet(this, _Tickable_preFormatted, "f")) {
            throw new RuntimeError('UnformattedNote', "Can't call GetWidth on an unformatted note.");
        }
        return this.width + (this.modifierContext ? this.modifierContext.getWidth() : 0);
    }
    getX() {
        const tickContext = this.checkTickContext(`Can't getX() without a TickContext.`);
        return tickContext.getX() + this.xShift;
    }
    getFormatterMetrics() {
        return this.formatterMetrics;
    }
    getCenterXShift() {
        if (this.isCenterAligned()) {
            return this.centerXShift;
        }
        return 0;
    }
    setCenterXShift(centerXShift) {
        this.centerXShift = centerXShift;
        return this;
    }
    isCenterAligned() {
        return this.alignCenter;
    }
    setCenterAlignment(alignCenter) {
        this.alignCenter = alignCenter;
        return this;
    }
    getVoice() {
        return defined(this.voice, 'NoVoice', 'Tickable has no voice.');
    }
    setVoice(voice) {
        this.voice = voice;
    }
    getTuplet() {
        return this.tuplet;
    }
    getTupletStack() {
        return this.tupletStack;
    }
    resetTuplet(tuplet) {
        let noteCount;
        let notesOccupied;
        if (tuplet) {
            const i = this.tupletStack.indexOf(tuplet);
            if (i !== -1) {
                this.tupletStack.splice(i, 1);
                noteCount = tuplet.getNoteCount();
                notesOccupied = tuplet.getNotesOccupied();
                this.applyTickMultiplier(noteCount, notesOccupied);
            }
            return this;
        }
        while (this.tupletStack.length) {
            tuplet = this.tupletStack.pop();
            noteCount = tuplet.getNoteCount();
            notesOccupied = tuplet.getNotesOccupied();
            this.applyTickMultiplier(noteCount, notesOccupied);
        }
        return this;
    }
    setTuplet(tuplet) {
        if (tuplet) {
            this.tupletStack.push(tuplet);
            const noteCount = tuplet.getNoteCount();
            const notesOccupied = tuplet.getNotesOccupied();
            this.applyTickMultiplier(notesOccupied, noteCount);
        }
        this.tuplet = tuplet;
        return this;
    }
    addToModifierContext(mc) {
        this.modifierContext = mc;
        for (let i = 0; i < this.modifiers.length; ++i) {
            this.modifierContext.addMember(this.modifiers[i]);
        }
        this.modifierContext.addMember(this);
        __classPrivateFieldSet(this, _Tickable_preFormatted, false, "f");
        return this;
    }
    addModifier(modifier, index = 0) {
        this.modifiers.push(modifier);
        __classPrivateFieldSet(this, _Tickable_preFormatted, false, "f");
        return this;
    }
    getModifiers() {
        return this.modifiers;
    }
    setTickContext(tc) {
        this.tickContext = tc;
        __classPrivateFieldSet(this, _Tickable_preFormatted, false, "f");
    }
    checkTickContext(message = 'Tickable has no tick context.') {
        return defined(this.tickContext, 'NoTickContext', message);
    }
    preFormat() {
        if (__classPrivateFieldGet(this, _Tickable_preFormatted, "f"))
            return;
        this.width = 0;
        if (this.modifierContext) {
            this.modifierContext.preFormat();
            this.width += this.modifierContext.getWidth();
        }
    }
    set preFormatted(value) {
        __classPrivateFieldSet(this, _Tickable_preFormatted, value, "f");
    }
    get preFormatted() {
        return __classPrivateFieldGet(this, _Tickable_preFormatted, "f");
    }
    postFormat() {
        if (__classPrivateFieldGet(this, _Tickable_postFormatted, "f"))
            return this;
        __classPrivateFieldSet(this, _Tickable_postFormatted, true, "f");
        return this;
    }
    set postFormatted(value) {
        __classPrivateFieldSet(this, _Tickable_postFormatted, value, "f");
    }
    get postFormatted() {
        return __classPrivateFieldGet(this, _Tickable_postFormatted, "f");
    }
    getIntrinsicTicks() {
        return this.intrinsicTicks;
    }
    setIntrinsicTicks(intrinsicTicks) {
        this.intrinsicTicks = intrinsicTicks;
        this.ticks = this.tickMultiplier.clone().multiply(this.intrinsicTicks);
    }
    getTickMultiplier() {
        return this.tickMultiplier;
    }
    applyTickMultiplier(numerator, denominator) {
        this.tickMultiplier.multiply(numerator, denominator);
        this.ticks = this.tickMultiplier.clone().multiply(this.intrinsicTicks);
    }
    setDuration(duration) {
        const ticks = duration.numerator * (Tables.RESOLUTION / duration.denominator);
        this.ticks = this.tickMultiplier.clone().multiply(ticks);
        this.intrinsicTicks = this.ticks.value();
    }
    getAbsoluteX() {
        const tickContext = this.checkTickContext(`Can't getAbsoluteX() without a TickContext.`);
        return tickContext.getX();
    }
    setModifierContext(mc) {
        this.modifierContext = mc;
        return this;
    }
    getModifierContext() {
        return this.modifierContext;
    }
    checkModifierContext() {
        return defined(this.modifierContext, 'NoModifierContext', 'No modifier context attached to this tickable.');
    }
}
_Tickable_preFormatted = new WeakMap(), _Tickable_postFormatted = new WeakMap();
