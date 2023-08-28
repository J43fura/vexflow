import { Flow } from './flow.js';
import { log, RuntimeError } from './util.js';
export class Vex {
    static sortAndUnique(arr, cmp, eq) {
        if (arr.length > 1) {
            const newArr = [];
            let last;
            arr.sort(cmp);
            for (let i = 0; i < arr.length; ++i) {
                if (i === 0 || !eq(arr[i], last)) {
                    newArr.push(arr[i]);
                }
                last = arr[i];
            }
            return newArr;
        }
        else {
            return arr;
        }
    }
    static contains(arr, obj) {
        let i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }
    static getCanvasContext(canvasId) {
        if (!canvasId) {
            throw new RuntimeError('BadArgument', 'Invalid canvas selector: ' + canvasId);
        }
        const canvas = document.getElementById(canvasId);
        if (!(canvas && canvas.getContext)) {
            throw new RuntimeError('UnsupportedBrowserError', 'This browser does not support HTML5 Canvas');
        }
        return canvas.getContext('2d');
    }
    static benchmark(s, f) {
        const startTime = new Date().getTime();
        f();
        const elapsed = new Date().getTime() - startTime;
        log(s, elapsed + 'ms');
    }
    static stackTrace() {
        const err = new Error();
        return err.stack;
    }
}
Vex.Flow = Flow;
