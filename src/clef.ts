// Copyright (c) 2023-present VexFlow contributors: https://github.com/vexflow/vexflow/graphs/contributors
// MIT License
// Co-author: Benjamin W. Bohl

import { Glyph } from './glyph';
import { Stave } from './stave';
import { StaveModifier, StaveModifierPosition } from './stavemodifier';
import { Tables } from './tables';
import { Category } from './typeguard';
import { defined, log, upperFirst } from './util';

export interface ClefType {
  code: string;
  line: number;
}

export interface ClefAnnotatiomType extends ClefType {
  xShift: number;
  point: number;
}

export interface ClefMetrics {
  width: number;
  annotations: {
    [key: string]: {
      [type: string]: { line?: number; shiftX?: number } | number;
    };
  };
}

// eslint-disable-next-line
function L(...args: any[]) {
  if (Clef.DEBUG) log('Vex.Flow.Clef', args);
}

/**
 * Clef implements various types of clefs that can be rendered on a stave.
 *
 * See `tests/clef_tests.ts` for usage examples.
 */
export class Clef extends StaveModifier {
  /** To enable logging for this class, set `Vex.Flow.Clef.DEBUG` to `true`. */
  static DEBUG: boolean = false;

  static get CATEGORY(): string {
    return Category.Clef;
  }

  annotation?: ClefAnnotatiomType;

  /**
   * The attribute `clef` must be a key from
   * `Clef.types`
   */
  clef: ClefType = Clef.types['treble'];

  protected attachment?: Glyph;
  protected size?: string;
  protected type?: string;

  #glyphCategory!: string;

  /**
   * Every clef name is associated with a glyph code from the font file
   * and a default stave line number.
   */
  static get types(): Record<string, ClefType> {
    return {
      treble: {
        code: 'gClef',
        line: 3,
      },
      bass: {
        code: 'fClef',
        line: 1,
      },
      alto: {
        code: 'cClef',
        line: 2,
      },
      tenor: {
        code: 'cClef',
        line: 1,
      },
      percussion: {
        code: 'unpitchedPercussionClef1',
        line: 2,
      },
      soprano: {
        code: 'cClef',
        line: 4,
      },
      'mezzo-soprano': {
        code: 'cClef',
        line: 3,
      },
      'baritone-c': {
        code: 'cClef',
        line: 0,
      },
      'baritone-f': {
        code: 'fClef',
        line: 2,
      },
      subbass: {
        code: 'fClef',
        line: 0,
      },
      french: {
        code: 'gClef',
        line: 4,
      },
      tab: {
        code: '6stringTabClef',
        line: 2.5,
      },
    };
  }

  static get annotationSmufl(): Record<string, string> {
    return {
      '8va': 'timeSig8',
      '8vb': 'timeSig8',
    };
  }

  /** Create a new clef. */
  constructor(type: string, size?: string, annotation?: string) {
    super();

    this.setPosition(StaveModifierPosition.BEGIN);
    this.setType(type, size, annotation);
    this.setWidth(Glyph.getWidth(this.clef.code, Clef.getPoint(this.size), this.#glyphCategory));
    L('Creating clef:', type);
  }

  /** Set clef type, size and annotation. */
  setType(type: string, size: string = 'default', annotation?: string): this {
    this.type = type;
    this.clef = Clef.types[type];
    this.size = size;

    // clefDefault or clefSmall
    this.#glyphCategory = 'clef' + upperFirst(size);

    const musicFont = Tables.currentMusicFont();

    // If an annotation, such as 8va, is specified, add it to the Clef object.
    if (annotation !== undefined) {
      const code = Clef.annotationSmufl[annotation];
      const point = (Clef.getPoint(this.size) / 5) * 3;
      const prefix = this.#glyphCategory + `.annotations.${annotation}.${this.type}.`;
      const line = musicFont.lookupMetric(prefix + 'line');
      const xShift = musicFont.lookupMetric(prefix + 'shiftX');

      this.annotation = { code, point, line, xShift };

      this.attachment = new Glyph(this.annotation.code, this.annotation.point);
      this.attachment.metrics.xMax = 0;
      this.attachment.setXShift(this.annotation.xShift);
    } else {
      this.annotation = undefined;
    }

    return this;
  }

  /** Get clef width. */
  getWidth(): number {
    if (this.type === 'tab') {
      defined(this.stave, 'ClefError', "Can't get width without stave.");
    }
    return this.width;
  }

  /** Get point for clefs. */
  static getPoint(size?: string): number {
    // for sizes other than 'default', clef is 2/3 of the default value
    return size == 'default' ? Tables.NOTATION_FONT_SCALE : (Tables.NOTATION_FONT_SCALE / 3) * 2;
  }

  /** Set associated stave. */
  setStave(stave: Stave): this {
    this.stave = stave;
    return this;
  }

  /** Render clef. */
  draw(): void {
    const stave = this.checkStave();
    const ctx = stave.checkContext();
    this.setRendered();

    this.applyStyle(ctx);
    ctx.openGroup('clef', this.getAttribute('id'));

    const x = this.x;
    const y = stave.getYForLine(this.clef.line);
    Glyph.renderGlyph(ctx, x, y, Clef.getPoint(this.size), this.clef.code, { category: this.#glyphCategory });

    if (this.annotation !== undefined && this.attachment !== undefined) {
      this.placeGlyphOnLine(this.attachment, stave, this.annotation.line);
      this.attachment.setStave(stave);
      this.attachment.setContext(ctx);
      this.attachment.renderToStave(this.x);
    }
    ctx.closeGroup();
    this.restoreStyle(ctx);
  }
}
