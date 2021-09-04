import { Vex } from 'vex';
import { VexFlowTests } from './vexflow_test_helpers';

import { AccidentalTests } from './accidental_tests';
import { AnnotationTests } from './annotation_tests';
import { ArticulationTests } from './articulation_tests';
import { AutoBeamFormattingTests } from './auto_beam_formatting_tests';
import { BachDemoTests } from './bach_tests';
import { BarlineTests } from './barline_tests';
import { BeamTests } from './beam_tests';
import { BendTests } from './bend_tests';
import { BoundingBoxComputationTests } from './boundingboxcomputation_tests';
import { BoundingBoxTests } from './boundingbox_tests';
import { ChordSymbolTests } from './chordsymbol_tests';
import { ClefKeySignatureTests } from './key_clef_tests';
import { ClefTests } from './clef_tests';
import { CurveTests } from './curve_tests';
import { DotTests } from './dot_tests';
import { EasyScoreTests } from './easyscore_tests';
import { FactoryTests } from './factory_tests';
import { FormatterTests } from './formatter_tests';
import { FractionTests } from './fraction_tests';
import { GhostNoteTests } from './ghostnote_tests';
import { GlyphNoteTests } from './glyphnote_tests';
import { GraceNoteTests } from './gracenote_tests';
import { GraceTabNoteTests } from './gracetabnote_tests';
import { KeyManagerTests } from './keymanager_tests';
import { KeySignatureTests } from './keysignature_tests';
import { ModifierContextTests } from './modifier_tests';
import { MultiMeasureRestTests } from './multimeasurerest_tests';
import { MusicTests } from './music_tests';
import { NoteHeadTests } from './notehead_tests';
import { NoteSubGroupTests } from './notesubgroup_tests';
import { OrnamentTests } from './ornament_tests';
import { ParserTests } from './parser_tests';
import { PedalMarkingTests } from './pedalmarking_tests';
import { PercussionTests } from './percussion_tests';
import { RegistryTests } from './registry_tests';
import { RestsTests } from './rests_tests';
import { RhythmTests } from './rhythm_tests';
import { StaveConnectorTests } from './staveconnector_tests';
import { StaveHairpinTests } from './stavehairpin_tests';
import { StaveLineTests } from './staveline_tests';
import { StaveModifierTests } from './stavemodifier_tests';
import { StaveNoteTests } from './stavenote_tests';
import { StaveTests } from './stave_tests';
import { StaveTieTests } from './stavetie_tests';
import { StringNumberTests } from './stringnumber_tests';
import { StrokesTests } from './strokes_tests';
import { StyleTests } from './style_tests';
import { TabNoteTests } from './tabnote_tests';
import { TabSlideTests } from './tabslide_tests';
import { TabStaveTests } from './tabstave_tests';
import { TabTieTests } from './tabtie_tests';
import { TextBracketTests } from './textbracket_tests';
import { TextNoteTests } from './textnote_tests';
import { ThreeVoicesTests } from './threevoice_tests';
import { TickContextTests } from './tickcontext_tests';
import { TimeSignatureTests } from './timesignature_tests';
import { TuningTests } from './tuning_tests';
import { TupletTests } from './tuplet_tests';
import { TypeGuardTests } from './typeguard_tests';
import { VFPrefixTests } from './vf_prefix_tests';
import { VibratoBracketTests } from './vibratobracket_tests';
import { VibratoTests } from './vibrato_tests';
import { VoiceTests } from './voice_tests';

VexFlowTests.run = function () {
  AccidentalTests.Start();
  AnnotationTests.Start();
  ArticulationTests.Start();
  AutoBeamFormattingTests.Start();
  BachDemoTests.Start();
  BarlineTests.Start();
  BeamTests.Start();
  BendTests.Start();
  BoundingBoxComputationTests.Start();
  BoundingBoxTests.Start();
  ChordSymbolTests.Start();
  ClefKeySignatureTests.Start();
  ClefTests.Start();
  CurveTests.Start();
  DotTests.Start();
  EasyScoreTests.Start();
  FactoryTests.Start();
  FormatterTests.Start();
  FractionTests.Start();
  GhostNoteTests.Start();
  GlyphNoteTests.Start();
  GraceNoteTests.Start();
  GraceTabNoteTests.Start();
  KeyManagerTests.Start();
  KeySignatureTests.Start();
  ModifierContextTests.Start();
  MultiMeasureRestTests.Start();
  MusicTests.Start();
  NoteHeadTests.Start();
  NoteSubGroupTests.Start();
  OrnamentTests.Start();
  ParserTests.Start();
  PedalMarkingTests.Start();
  PercussionTests.Start();
  RegistryTests.Start();
  RestsTests.Start();
  RhythmTests.Start();
  StaveConnectorTests.Start();
  StaveHairpinTests.Start();
  StaveLineTests.Start();
  StaveModifierTests.Start();
  StaveNoteTests.Start();
  StaveTests.Start();
  StaveTieTests.Start();
  StringNumberTests.Start();
  StrokesTests.Start();
  StyleTests.Start();
  TabNoteTests.Start();
  TabSlideTests.Start();
  TabStaveTests.Start();
  TabTieTests.Start();
  TextBracketTests.Start();
  TextNoteTests.Start();
  ThreeVoicesTests.Start();
  TickContextTests.Start();
  TimeSignatureTests.Start();
  TuningTests.Start();
  TupletTests.Start();
  TypeGuardTests.Start();
  VFPrefixTests.Start();
  VibratoBracketTests.Start();
  VibratoTests.Start();
  VoiceTests.Start();
};

export default Vex;