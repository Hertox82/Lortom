webpackJsonp([0],{

/***/ "./node_modules/codemirror/mode/css/css.js":
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (true) // CommonJS
    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("css", function(config, parserConfig) {
  var inline = parserConfig.inline
  if (!parserConfig.propertyKeywords) parserConfig = CodeMirror.resolveMode("text/css");

  var indentUnit = config.indentUnit,
      tokenHooks = parserConfig.tokenHooks,
      documentTypes = parserConfig.documentTypes || {},
      mediaTypes = parserConfig.mediaTypes || {},
      mediaFeatures = parserConfig.mediaFeatures || {},
      mediaValueKeywords = parserConfig.mediaValueKeywords || {},
      propertyKeywords = parserConfig.propertyKeywords || {},
      nonStandardPropertyKeywords = parserConfig.nonStandardPropertyKeywords || {},
      fontProperties = parserConfig.fontProperties || {},
      counterDescriptors = parserConfig.counterDescriptors || {},
      colorKeywords = parserConfig.colorKeywords || {},
      valueKeywords = parserConfig.valueKeywords || {},
      allowNested = parserConfig.allowNested,
      lineComment = parserConfig.lineComment,
      supportsAtComponent = parserConfig.supportsAtComponent === true;

  var type, override;
  function ret(style, tp) { type = tp; return style; }

  // Tokenizers

  function tokenBase(stream, state) {
    var ch = stream.next();
    if (tokenHooks[ch]) {
      var result = tokenHooks[ch](stream, state);
      if (result !== false) return result;
    }
    if (ch == "@") {
      stream.eatWhile(/[\w\\\-]/);
      return ret("def", stream.current());
    } else if (ch == "=" || (ch == "~" || ch == "|") && stream.eat("=")) {
      return ret(null, "compare");
    } else if (ch == "\"" || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    } else if (ch == "#") {
      stream.eatWhile(/[\w\\\-]/);
      return ret("atom", "hash");
    } else if (ch == "!") {
      stream.match(/^\s*\w*/);
      return ret("keyword", "important");
    } else if (/\d/.test(ch) || ch == "." && stream.eat(/\d/)) {
      stream.eatWhile(/[\w.%]/);
      return ret("number", "unit");
    } else if (ch === "-") {
      if (/[\d.]/.test(stream.peek())) {
        stream.eatWhile(/[\w.%]/);
        return ret("number", "unit");
      } else if (stream.match(/^-[\w\\\-]+/)) {
        stream.eatWhile(/[\w\\\-]/);
        if (stream.match(/^\s*:/, false))
          return ret("variable-2", "variable-definition");
        return ret("variable-2", "variable");
      } else if (stream.match(/^\w+-/)) {
        return ret("meta", "meta");
      }
    } else if (/[,+>*\/]/.test(ch)) {
      return ret(null, "select-op");
    } else if (ch == "." && stream.match(/^-?[_a-z][_a-z0-9-]*/i)) {
      return ret("qualifier", "qualifier");
    } else if (/[:;{}\[\]\(\)]/.test(ch)) {
      return ret(null, ch);
    } else if ((ch == "u" && stream.match(/rl(-prefix)?\(/)) ||
               (ch == "d" && stream.match("omain(")) ||
               (ch == "r" && stream.match("egexp("))) {
      stream.backUp(1);
      state.tokenize = tokenParenthesized;
      return ret("property", "word");
    } else if (/[\w\\\-]/.test(ch)) {
      stream.eatWhile(/[\w\\\-]/);
      return ret("property", "word");
    } else {
      return ret(null, null);
    }
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, ch;
      while ((ch = stream.next()) != null) {
        if (ch == quote && !escaped) {
          if (quote == ")") stream.backUp(1);
          break;
        }
        escaped = !escaped && ch == "\\";
      }
      if (ch == quote || !escaped && quote != ")") state.tokenize = null;
      return ret("string", "string");
    };
  }

  function tokenParenthesized(stream, state) {
    stream.next(); // Must be '('
    if (!stream.match(/\s*[\"\')]/, false))
      state.tokenize = tokenString(")");
    else
      state.tokenize = null;
    return ret(null, "(");
  }

  // Context management

  function Context(type, indent, prev) {
    this.type = type;
    this.indent = indent;
    this.prev = prev;
  }

  function pushContext(state, stream, type, indent) {
    state.context = new Context(type, stream.indentation() + (indent === false ? 0 : indentUnit), state.context);
    return type;
  }

  function popContext(state) {
    if (state.context.prev)
      state.context = state.context.prev;
    return state.context.type;
  }

  function pass(type, stream, state) {
    return states[state.context.type](type, stream, state);
  }
  function popAndPass(type, stream, state, n) {
    for (var i = n || 1; i > 0; i--)
      state.context = state.context.prev;
    return pass(type, stream, state);
  }

  // Parser

  function wordAsValue(stream) {
    var word = stream.current().toLowerCase();
    if (valueKeywords.hasOwnProperty(word))
      override = "atom";
    else if (colorKeywords.hasOwnProperty(word))
      override = "keyword";
    else
      override = "variable";
  }

  var states = {};

  states.top = function(type, stream, state) {
    if (type == "{") {
      return pushContext(state, stream, "block");
    } else if (type == "}" && state.context.prev) {
      return popContext(state);
    } else if (supportsAtComponent && /@component/.test(type)) {
      return pushContext(state, stream, "atComponentBlock");
    } else if (/^@(-moz-)?document$/.test(type)) {
      return pushContext(state, stream, "documentTypes");
    } else if (/^@(media|supports|(-moz-)?document|import)$/.test(type)) {
      return pushContext(state, stream, "atBlock");
    } else if (/^@(font-face|counter-style)/.test(type)) {
      state.stateArg = type;
      return "restricted_atBlock_before";
    } else if (/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(type)) {
      return "keyframes";
    } else if (type && type.charAt(0) == "@") {
      return pushContext(state, stream, "at");
    } else if (type == "hash") {
      override = "builtin";
    } else if (type == "word") {
      override = "tag";
    } else if (type == "variable-definition") {
      return "maybeprop";
    } else if (type == "interpolation") {
      return pushContext(state, stream, "interpolation");
    } else if (type == ":") {
      return "pseudo";
    } else if (allowNested && type == "(") {
      return pushContext(state, stream, "parens");
    }
    return state.context.type;
  };

  states.block = function(type, stream, state) {
    if (type == "word") {
      var word = stream.current().toLowerCase();
      if (propertyKeywords.hasOwnProperty(word)) {
        override = "property";
        return "maybeprop";
      } else if (nonStandardPropertyKeywords.hasOwnProperty(word)) {
        override = "string-2";
        return "maybeprop";
      } else if (allowNested) {
        override = stream.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag";
        return "block";
      } else {
        override += " error";
        return "maybeprop";
      }
    } else if (type == "meta") {
      return "block";
    } else if (!allowNested && (type == "hash" || type == "qualifier")) {
      override = "error";
      return "block";
    } else {
      return states.top(type, stream, state);
    }
  };

  states.maybeprop = function(type, stream, state) {
    if (type == ":") return pushContext(state, stream, "prop");
    return pass(type, stream, state);
  };

  states.prop = function(type, stream, state) {
    if (type == ";") return popContext(state);
    if (type == "{" && allowNested) return pushContext(state, stream, "propBlock");
    if (type == "}" || type == "{") return popAndPass(type, stream, state);
    if (type == "(") return pushContext(state, stream, "parens");

    if (type == "hash" && !/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(stream.current())) {
      override += " error";
    } else if (type == "word") {
      wordAsValue(stream);
    } else if (type == "interpolation") {
      return pushContext(state, stream, "interpolation");
    }
    return "prop";
  };

  states.propBlock = function(type, _stream, state) {
    if (type == "}") return popContext(state);
    if (type == "word") { override = "property"; return "maybeprop"; }
    return state.context.type;
  };

  states.parens = function(type, stream, state) {
    if (type == "{" || type == "}") return popAndPass(type, stream, state);
    if (type == ")") return popContext(state);
    if (type == "(") return pushContext(state, stream, "parens");
    if (type == "interpolation") return pushContext(state, stream, "interpolation");
    if (type == "word") wordAsValue(stream);
    return "parens";
  };

  states.pseudo = function(type, stream, state) {
    if (type == "meta") return "pseudo";

    if (type == "word") {
      override = "variable-3";
      return state.context.type;
    }
    return pass(type, stream, state);
  };

  states.documentTypes = function(type, stream, state) {
    if (type == "word" && documentTypes.hasOwnProperty(stream.current())) {
      override = "tag";
      return state.context.type;
    } else {
      return states.atBlock(type, stream, state);
    }
  };

  states.atBlock = function(type, stream, state) {
    if (type == "(") return pushContext(state, stream, "atBlock_parens");
    if (type == "}" || type == ";") return popAndPass(type, stream, state);
    if (type == "{") return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top");

    if (type == "interpolation") return pushContext(state, stream, "interpolation");

    if (type == "word") {
      var word = stream.current().toLowerCase();
      if (word == "only" || word == "not" || word == "and" || word == "or")
        override = "keyword";
      else if (mediaTypes.hasOwnProperty(word))
        override = "attribute";
      else if (mediaFeatures.hasOwnProperty(word))
        override = "property";
      else if (mediaValueKeywords.hasOwnProperty(word))
        override = "keyword";
      else if (propertyKeywords.hasOwnProperty(word))
        override = "property";
      else if (nonStandardPropertyKeywords.hasOwnProperty(word))
        override = "string-2";
      else if (valueKeywords.hasOwnProperty(word))
        override = "atom";
      else if (colorKeywords.hasOwnProperty(word))
        override = "keyword";
      else
        override = "error";
    }
    return state.context.type;
  };

  states.atComponentBlock = function(type, stream, state) {
    if (type == "}")
      return popAndPass(type, stream, state);
    if (type == "{")
      return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top", false);
    if (type == "word")
      override = "error";
    return state.context.type;
  };

  states.atBlock_parens = function(type, stream, state) {
    if (type == ")") return popContext(state);
    if (type == "{" || type == "}") return popAndPass(type, stream, state, 2);
    return states.atBlock(type, stream, state);
  };

  states.restricted_atBlock_before = function(type, stream, state) {
    if (type == "{")
      return pushContext(state, stream, "restricted_atBlock");
    if (type == "word" && state.stateArg == "@counter-style") {
      override = "variable";
      return "restricted_atBlock_before";
    }
    return pass(type, stream, state);
  };

  states.restricted_atBlock = function(type, stream, state) {
    if (type == "}") {
      state.stateArg = null;
      return popContext(state);
    }
    if (type == "word") {
      if ((state.stateArg == "@font-face" && !fontProperties.hasOwnProperty(stream.current().toLowerCase())) ||
          (state.stateArg == "@counter-style" && !counterDescriptors.hasOwnProperty(stream.current().toLowerCase())))
        override = "error";
      else
        override = "property";
      return "maybeprop";
    }
    return "restricted_atBlock";
  };

  states.keyframes = function(type, stream, state) {
    if (type == "word") { override = "variable"; return "keyframes"; }
    if (type == "{") return pushContext(state, stream, "top");
    return pass(type, stream, state);
  };

  states.at = function(type, stream, state) {
    if (type == ";") return popContext(state);
    if (type == "{" || type == "}") return popAndPass(type, stream, state);
    if (type == "word") override = "tag";
    else if (type == "hash") override = "builtin";
    return "at";
  };

  states.interpolation = function(type, stream, state) {
    if (type == "}") return popContext(state);
    if (type == "{" || type == ";") return popAndPass(type, stream, state);
    if (type == "word") override = "variable";
    else if (type != "variable" && type != "(" && type != ")") override = "error";
    return "interpolation";
  };

  return {
    startState: function(base) {
      return {tokenize: null,
              state: inline ? "block" : "top",
              stateArg: null,
              context: new Context(inline ? "block" : "top", base || 0, null)};
    },

    token: function(stream, state) {
      if (!state.tokenize && stream.eatSpace()) return null;
      var style = (state.tokenize || tokenBase)(stream, state);
      if (style && typeof style == "object") {
        type = style[1];
        style = style[0];
      }
      override = style;
      if (type != "comment")
        state.state = states[state.state](type, stream, state);
      return override;
    },

    indent: function(state, textAfter) {
      var cx = state.context, ch = textAfter && textAfter.charAt(0);
      var indent = cx.indent;
      if (cx.type == "prop" && (ch == "}" || ch == ")")) cx = cx.prev;
      if (cx.prev) {
        if (ch == "}" && (cx.type == "block" || cx.type == "top" ||
                          cx.type == "interpolation" || cx.type == "restricted_atBlock")) {
          // Resume indentation from parent context.
          cx = cx.prev;
          indent = cx.indent;
        } else if (ch == ")" && (cx.type == "parens" || cx.type == "atBlock_parens") ||
            ch == "{" && (cx.type == "at" || cx.type == "atBlock")) {
          // Dedent relative to current context.
          indent = Math.max(0, cx.indent - indentUnit);
        }
      }
      return indent;
    },

    electricChars: "}",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    blockCommentContinue: " * ",
    lineComment: lineComment,
    fold: "brace"
  };
});

  function keySet(array) {
    var keys = {};
    for (var i = 0; i < array.length; ++i) {
      keys[array[i].toLowerCase()] = true;
    }
    return keys;
  }

  var documentTypes_ = [
    "domain", "regexp", "url", "url-prefix"
  ], documentTypes = keySet(documentTypes_);

  var mediaTypes_ = [
    "all", "aural", "braille", "handheld", "print", "projection", "screen",
    "tty", "tv", "embossed"
  ], mediaTypes = keySet(mediaTypes_);

  var mediaFeatures_ = [
    "width", "min-width", "max-width", "height", "min-height", "max-height",
    "device-width", "min-device-width", "max-device-width", "device-height",
    "min-device-height", "max-device-height", "aspect-ratio",
    "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio",
    "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color",
    "max-color", "color-index", "min-color-index", "max-color-index",
    "monochrome", "min-monochrome", "max-monochrome", "resolution",
    "min-resolution", "max-resolution", "scan", "grid", "orientation",
    "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio",
    "pointer", "any-pointer", "hover", "any-hover"
  ], mediaFeatures = keySet(mediaFeatures_);

  var mediaValueKeywords_ = [
    "landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover",
    "interlace", "progressive"
  ], mediaValueKeywords = keySet(mediaValueKeywords_);

  var propertyKeywords_ = [
    "align-content", "align-items", "align-self", "alignment-adjust",
    "alignment-baseline", "anchor-point", "animation", "animation-delay",
    "animation-direction", "animation-duration", "animation-fill-mode",
    "animation-iteration-count", "animation-name", "animation-play-state",
    "animation-timing-function", "appearance", "azimuth", "backface-visibility",
    "background", "background-attachment", "background-blend-mode", "background-clip",
    "background-color", "background-image", "background-origin", "background-position",
    "background-repeat", "background-size", "baseline-shift", "binding",
    "bleed", "bookmark-label", "bookmark-level", "bookmark-state",
    "bookmark-target", "border", "border-bottom", "border-bottom-color",
    "border-bottom-left-radius", "border-bottom-right-radius",
    "border-bottom-style", "border-bottom-width", "border-collapse",
    "border-color", "border-image", "border-image-outset",
    "border-image-repeat", "border-image-slice", "border-image-source",
    "border-image-width", "border-left", "border-left-color",
    "border-left-style", "border-left-width", "border-radius", "border-right",
    "border-right-color", "border-right-style", "border-right-width",
    "border-spacing", "border-style", "border-top", "border-top-color",
    "border-top-left-radius", "border-top-right-radius", "border-top-style",
    "border-top-width", "border-width", "bottom", "box-decoration-break",
    "box-shadow", "box-sizing", "break-after", "break-before", "break-inside",
    "caption-side", "caret-color", "clear", "clip", "color", "color-profile", "column-count",
    "column-fill", "column-gap", "column-rule", "column-rule-color",
    "column-rule-style", "column-rule-width", "column-span", "column-width",
    "columns", "content", "counter-increment", "counter-reset", "crop", "cue",
    "cue-after", "cue-before", "cursor", "direction", "display",
    "dominant-baseline", "drop-initial-after-adjust",
    "drop-initial-after-align", "drop-initial-before-adjust",
    "drop-initial-before-align", "drop-initial-size", "drop-initial-value",
    "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis",
    "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap",
    "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings",
    "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust",
    "font-stretch", "font-style", "font-synthesis", "font-variant",
    "font-variant-alternates", "font-variant-caps", "font-variant-east-asian",
    "font-variant-ligatures", "font-variant-numeric", "font-variant-position",
    "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow",
    "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap",
    "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap",
    "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns",
    "grid-template-rows", "hanging-punctuation", "height", "hyphens",
    "icon", "image-orientation", "image-rendering", "image-resolution",
    "inline-box-align", "justify-content", "justify-items", "justify-self", "left", "letter-spacing",
    "line-break", "line-height", "line-stacking", "line-stacking-ruby",
    "line-stacking-shift", "line-stacking-strategy", "list-style",
    "list-style-image", "list-style-position", "list-style-type", "margin",
    "margin-bottom", "margin-left", "margin-right", "margin-top",
    "marks", "marquee-direction", "marquee-loop",
    "marquee-play-count", "marquee-speed", "marquee-style", "max-height",
    "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index",
    "nav-left", "nav-right", "nav-up", "object-fit", "object-position",
    "opacity", "order", "orphans", "outline",
    "outline-color", "outline-offset", "outline-style", "outline-width",
    "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y",
    "padding", "padding-bottom", "padding-left", "padding-right", "padding-top",
    "page", "page-break-after", "page-break-before", "page-break-inside",
    "page-policy", "pause", "pause-after", "pause-before", "perspective",
    "perspective-origin", "pitch", "pitch-range", "place-content", "place-items", "place-self", "play-during", "position",
    "presentation-level", "punctuation-trim", "quotes", "region-break-after",
    "region-break-before", "region-break-inside", "region-fragment",
    "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness",
    "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang",
    "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin",
    "shape-outside", "size", "speak", "speak-as", "speak-header",
    "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set",
    "tab-size", "table-layout", "target", "target-name", "target-new",
    "target-position", "text-align", "text-align-last", "text-decoration",
    "text-decoration-color", "text-decoration-line", "text-decoration-skip",
    "text-decoration-style", "text-emphasis", "text-emphasis-color",
    "text-emphasis-position", "text-emphasis-style", "text-height",
    "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow",
    "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position",
    "text-wrap", "top", "transform", "transform-origin", "transform-style",
    "transition", "transition-delay", "transition-duration",
    "transition-property", "transition-timing-function", "unicode-bidi",
    "user-select", "vertical-align", "visibility", "voice-balance", "voice-duration",
    "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress",
    "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break",
    "word-spacing", "word-wrap", "z-index",
    // SVG-specific
    "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color",
    "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events",
    "color-interpolation", "color-interpolation-filters",
    "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering",
    "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke",
    "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin",
    "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering",
    "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal",
    "glyph-orientation-vertical", "text-anchor", "writing-mode"
  ], propertyKeywords = keySet(propertyKeywords_);

  var nonStandardPropertyKeywords_ = [
    "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color",
    "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color",
    "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside",
    "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button",
    "searchfield-results-decoration", "zoom"
  ], nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_);

  var fontProperties_ = [
    "font-family", "src", "unicode-range", "font-variant", "font-feature-settings",
    "font-stretch", "font-weight", "font-style"
  ], fontProperties = keySet(fontProperties_);

  var counterDescriptors_ = [
    "additive-symbols", "fallback", "negative", "pad", "prefix", "range",
    "speak-as", "suffix", "symbols", "system"
  ], counterDescriptors = keySet(counterDescriptors_);

  var colorKeywords_ = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige",
    "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown",
    "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
    "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod",
    "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen",
    "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
    "darkslateblue", "darkslategray", "darkturquoise", "darkviolet",
    "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick",
    "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite",
    "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew",
    "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender",
    "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral",
    "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink",
    "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray",
    "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta",
    "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple",
    "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise",
    "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin",
    "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered",
    "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred",
    "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue",
    "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown",
    "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue",
    "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan",
    "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white",
    "whitesmoke", "yellow", "yellowgreen"
  ], colorKeywords = keySet(colorKeywords_);

  var valueKeywords_ = [
    "above", "absolute", "activeborder", "additive", "activecaption", "afar",
    "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate",
    "always", "amharic", "amharic-abegede", "antialiased", "appworkspace",
    "arabic-indic", "armenian", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column", "avoid-page",
    "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary",
    "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box",
    "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel",
    "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian",
    "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret",
    "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch",
    "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote",
    "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse",
    "compact", "condensed", "contain", "content", "contents",
    "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop",
    "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal",
    "decimal-leading-zero", "default", "default-button", "dense", "destination-atop",
    "destination-in", "destination-out", "destination-over", "devanagari", "difference",
    "disc", "discard", "disclosure-closed", "disclosure-open", "document",
    "dot-dash", "dot-dot-dash",
    "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out",
    "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede",
    "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er",
    "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er",
    "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et",
    "ethiopic-halehame-gez", "ethiopic-halehame-om-et",
    "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et",
    "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig",
    "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed",
    "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes",
    "forwards", "from", "geometricPrecision", "georgian", "graytext", "grid", "groove",
    "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew",
    "help", "hidden", "hide", "higher", "highlight", "highlighttext",
    "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "icon", "ignore",
    "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite",
    "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis",
    "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert",
    "italic", "japanese-formal", "japanese-informal", "justify", "kannada",
    "katakana", "katakana-iroha", "keep-all", "khmer",
    "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal",
    "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten",
    "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem",
    "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian",
    "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian",
    "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "match", "matrix", "matrix3d",
    "media-controls-background", "media-current-time-display",
    "media-fullscreen-button", "media-mute-button", "media-play-button",
    "media-return-to-realtime-button", "media-rewind-button",
    "media-seek-back-button", "media-seek-forward-button", "media-slider",
    "media-sliderthumb", "media-time-remaining-display", "media-volume-slider",
    "media-volume-slider-container", "media-volume-sliderthumb", "medium",
    "menu", "menulist", "menulist-button", "menulist-text",
    "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic",
    "mix", "mongolian", "monospace", "move", "multiple", "multiply", "myanmar", "n-resize",
    "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop",
    "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap",
    "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "opacity", "open-quote",
    "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset",
    "outside", "outside-shape", "overlay", "overline", "padding", "padding-box",
    "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter",
    "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d",
    "progress", "push-button", "radial-gradient", "radio", "read-only",
    "read-write", "read-write-plaintext-only", "rectangle", "region",
    "relative", "repeat", "repeating-linear-gradient",
    "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse",
    "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY",
    "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running",
    "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen",
    "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield",
    "searchfield-cancel-button", "searchfield-decoration",
    "searchfield-results-button", "searchfield-results-decoration", "self-start", "self-end",
    "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama",
    "simp-chinese-formal", "simp-chinese-informal", "single",
    "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal",
    "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow",
    "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali",
    "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square",
    "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub",
    "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "system-ui", "table",
    "table-caption", "table-cell", "table-column", "table-column-group",
    "table-footer-group", "table-header-group", "table-row", "table-row-group",
    "tamil",
    "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai",
    "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight",
    "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er",
    "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top",
    "trad-chinese-formal", "trad-chinese-informal", "transform",
    "translate", "translate3d", "translateX", "translateY", "translateZ",
    "transparent", "ultra-condensed", "ultra-expanded", "underline", "unset", "up",
    "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal",
    "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url",
    "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted",
    "visibleStroke", "visual", "w-resize", "wait", "wave", "wider",
    "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor",
    "xx-large", "xx-small"
  ], valueKeywords = keySet(valueKeywords_);

  var allWords = documentTypes_.concat(mediaTypes_).concat(mediaFeatures_).concat(mediaValueKeywords_)
    .concat(propertyKeywords_).concat(nonStandardPropertyKeywords_).concat(colorKeywords_)
    .concat(valueKeywords_);
  CodeMirror.registerHelper("hintWords", "css", allWords);

  function tokenCComment(stream, state) {
    var maybeEnd = false, ch;
    while ((ch = stream.next()) != null) {
      if (maybeEnd && ch == "/") {
        state.tokenize = null;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ["comment", "comment"];
  }

  CodeMirror.defineMIME("text/css", {
    documentTypes: documentTypes,
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    mediaValueKeywords: mediaValueKeywords,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    fontProperties: fontProperties,
    counterDescriptors: counterDescriptors,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    tokenHooks: {
      "/": function(stream, state) {
        if (!stream.eat("*")) return false;
        state.tokenize = tokenCComment;
        return tokenCComment(stream, state);
      }
    },
    name: "css"
  });

  CodeMirror.defineMIME("text/x-scss", {
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    mediaValueKeywords: mediaValueKeywords,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    fontProperties: fontProperties,
    allowNested: true,
    lineComment: "//",
    tokenHooks: {
      "/": function(stream, state) {
        if (stream.eat("/")) {
          stream.skipToEnd();
          return ["comment", "comment"];
        } else if (stream.eat("*")) {
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        } else {
          return ["operator", "operator"];
        }
      },
      ":": function(stream) {
        if (stream.match(/\s*\{/, false))
          return [null, null]
        return false;
      },
      "$": function(stream) {
        stream.match(/^[\w-]+/);
        if (stream.match(/^\s*:/, false))
          return ["variable-2", "variable-definition"];
        return ["variable-2", "variable"];
      },
      "#": function(stream) {
        if (!stream.eat("{")) return false;
        return [null, "interpolation"];
      }
    },
    name: "css",
    helperType: "scss"
  });

  CodeMirror.defineMIME("text/x-less", {
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    mediaValueKeywords: mediaValueKeywords,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    fontProperties: fontProperties,
    allowNested: true,
    lineComment: "//",
    tokenHooks: {
      "/": function(stream, state) {
        if (stream.eat("/")) {
          stream.skipToEnd();
          return ["comment", "comment"];
        } else if (stream.eat("*")) {
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        } else {
          return ["operator", "operator"];
        }
      },
      "@": function(stream) {
        if (stream.eat("{")) return [null, "interpolation"];
        if (stream.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/, false)) return false;
        stream.eatWhile(/[\w\\\-]/);
        if (stream.match(/^\s*:/, false))
          return ["variable-2", "variable-definition"];
        return ["variable-2", "variable"];
      },
      "&": function() {
        return ["atom", "atom"];
      }
    },
    name: "css",
    helperType: "less"
  });

  CodeMirror.defineMIME("text/x-gss", {
    documentTypes: documentTypes,
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    fontProperties: fontProperties,
    counterDescriptors: counterDescriptors,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    supportsAtComponent: true,
    tokenHooks: {
      "/": function(stream, state) {
        if (!stream.eat("*")) return false;
        state.tokenize = tokenCComment;
        return tokenCComment(stream, state);
      }
    },
    name: "css",
    helperType: "gss"
  });

});


/***/ }),

/***/ "./node_modules/codemirror/mode/htmlmixed/htmlmixed.js":
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (true) // CommonJS
    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"), __webpack_require__("./node_modules/codemirror/mode/xml/xml.js"), __webpack_require__("./node_modules/codemirror/mode/javascript/javascript.js"), __webpack_require__("./node_modules/codemirror/mode/css/css.js"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var defaultTags = {
    script: [
      ["lang", /(javascript|babel)/i, "javascript"],
      ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
      ["type", /./, "text/plain"],
      [null, null, "javascript"]
    ],
    style:  [
      ["lang", /^css$/i, "css"],
      ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
      ["type", /./, "text/plain"],
      [null, null, "css"]
    ]
  };

  function maybeBackup(stream, pat, style) {
    var cur = stream.current(), close = cur.search(pat);
    if (close > -1) {
      stream.backUp(cur.length - close);
    } else if (cur.match(/<\/?$/)) {
      stream.backUp(cur.length);
      if (!stream.match(pat, false)) stream.match(cur);
    }
    return style;
  }

  var attrRegexpCache = {};
  function getAttrRegexp(attr) {
    var regexp = attrRegexpCache[attr];
    if (regexp) return regexp;
    return attrRegexpCache[attr] = new RegExp("\\s+" + attr + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*");
  }

  function getAttrValue(text, attr) {
    var match = text.match(getAttrRegexp(attr))
    return match ? /^\s*(.*?)\s*$/.exec(match[2])[1] : ""
  }

  function getTagRegexp(tagName, anchored) {
    return new RegExp((anchored ? "^" : "") + "<\/\s*" + tagName + "\s*>", "i");
  }

  function addTags(from, to) {
    for (var tag in from) {
      var dest = to[tag] || (to[tag] = []);
      var source = from[tag];
      for (var i = source.length - 1; i >= 0; i--)
        dest.unshift(source[i])
    }
  }

  function findMatchingMode(tagInfo, tagText) {
    for (var i = 0; i < tagInfo.length; i++) {
      var spec = tagInfo[i];
      if (!spec[0] || spec[1].test(getAttrValue(tagText, spec[0]))) return spec[2];
    }
  }

  CodeMirror.defineMode("htmlmixed", function (config, parserConfig) {
    var htmlMode = CodeMirror.getMode(config, {
      name: "xml",
      htmlMode: true,
      multilineTagIndentFactor: parserConfig.multilineTagIndentFactor,
      multilineTagIndentPastTag: parserConfig.multilineTagIndentPastTag
    });

    var tags = {};
    var configTags = parserConfig && parserConfig.tags, configScript = parserConfig && parserConfig.scriptTypes;
    addTags(defaultTags, tags);
    if (configTags) addTags(configTags, tags);
    if (configScript) for (var i = configScript.length - 1; i >= 0; i--)
      tags.script.unshift(["type", configScript[i].matches, configScript[i].mode])

    function html(stream, state) {
      var style = htmlMode.token(stream, state.htmlState), tag = /\btag\b/.test(style), tagName
      if (tag && !/[<>\s\/]/.test(stream.current()) &&
          (tagName = state.htmlState.tagName && state.htmlState.tagName.toLowerCase()) &&
          tags.hasOwnProperty(tagName)) {
        state.inTag = tagName + " "
      } else if (state.inTag && tag && />$/.test(stream.current())) {
        var inTag = /^([\S]+) (.*)/.exec(state.inTag)
        state.inTag = null
        var modeSpec = stream.current() == ">" && findMatchingMode(tags[inTag[1]], inTag[2])
        var mode = CodeMirror.getMode(config, modeSpec)
        var endTagA = getTagRegexp(inTag[1], true), endTag = getTagRegexp(inTag[1], false);
        state.token = function (stream, state) {
          if (stream.match(endTagA, false)) {
            state.token = html;
            state.localState = state.localMode = null;
            return null;
          }
          return maybeBackup(stream, endTag, state.localMode.token(stream, state.localState));
        };
        state.localMode = mode;
        state.localState = CodeMirror.startState(mode, htmlMode.indent(state.htmlState, ""));
      } else if (state.inTag) {
        state.inTag += stream.current()
        if (stream.eol()) state.inTag += " "
      }
      return style;
    };

    return {
      startState: function () {
        var state = CodeMirror.startState(htmlMode);
        return {token: html, inTag: null, localMode: null, localState: null, htmlState: state};
      },

      copyState: function (state) {
        var local;
        if (state.localState) {
          local = CodeMirror.copyState(state.localMode, state.localState);
        }
        return {token: state.token, inTag: state.inTag,
                localMode: state.localMode, localState: local,
                htmlState: CodeMirror.copyState(htmlMode, state.htmlState)};
      },

      token: function (stream, state) {
        return state.token(stream, state);
      },

      indent: function (state, textAfter, line) {
        if (!state.localMode || /^\s*<\//.test(textAfter))
          return htmlMode.indent(state.htmlState, textAfter);
        else if (state.localMode.indent)
          return state.localMode.indent(state.localState, textAfter, line);
        else
          return CodeMirror.Pass;
      },

      innerMode: function (state) {
        return {state: state.localState || state.htmlState, mode: state.localMode || htmlMode};
      }
    };
  }, "xml", "javascript", "css");

  CodeMirror.defineMIME("text/html", "htmlmixed");
});


/***/ }),

/***/ "./node_modules/codemirror/mode/javascript/javascript.js":
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (true) // CommonJS
    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("javascript", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  var statementIndent = parserConfig.statementIndent;
  var jsonldMode = parserConfig.jsonld;
  var jsonMode = parserConfig.json || jsonldMode;
  var isTS = parserConfig.typescript;
  var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;

  // Tokenizer

  var keywords = function(){
    function kw(type) {return {type: type, style: "keyword"};}
    var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), D = kw("keyword d");
    var operator = kw("operator"), atom = {type: "atom", style: "atom"};

    var jsKeywords = {
      "if": kw("if"), "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
      "return": D, "break": D, "continue": D, "new": kw("new"), "delete": C, "void": C, "throw": C,
      "debugger": kw("debugger"), "var": kw("var"), "const": kw("var"), "let": kw("var"),
      "function": kw("function"), "catch": kw("catch"),
      "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
      "in": operator, "typeof": operator, "instanceof": operator,
      "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom,
      "this": kw("this"), "class": kw("class"), "super": kw("atom"),
      "yield": C, "export": kw("export"), "import": kw("import"), "extends": C,
      "await": C
    };

    // Extend the 'normal' keywords with the TypeScript language extensions
    if (isTS) {
      var type = {type: "variable", style: "type"};
      var tsKeywords = {
        // object-like things
        "interface": kw("class"),
        "implements": C,
        "namespace": C,

        // scope modifiers
        "public": kw("modifier"),
        "private": kw("modifier"),
        "protected": kw("modifier"),
        "abstract": kw("modifier"),
        "readonly": kw("modifier"),

        // types
        "string": type, "number": type, "boolean": type, "any": type
      };

      for (var attr in tsKeywords) {
        jsKeywords[attr] = tsKeywords[attr];
      }
    }

    return jsKeywords;
  }();

  var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
  var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

  function readRegexp(stream) {
    var escaped = false, next, inSet = false;
    while ((next = stream.next()) != null) {
      if (!escaped) {
        if (next == "/" && !inSet) return;
        if (next == "[") inSet = true;
        else if (inSet && next == "]") inSet = false;
      }
      escaped = !escaped && next == "\\";
    }
  }

  // Used as scratch variables to communicate multiple values without
  // consing up tons of objects.
  var type, content;
  function ret(tp, style, cont) {
    type = tp; content = cont;
    return style;
  }
  function tokenBase(stream, state) {
    var ch = stream.next();
    if (ch == '"' || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    } else if (ch == "." && stream.match(/^\d+(?:[eE][+\-]?\d+)?/)) {
      return ret("number", "number");
    } else if (ch == "." && stream.match("..")) {
      return ret("spread", "meta");
    } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
      return ret(ch);
    } else if (ch == "=" && stream.eat(">")) {
      return ret("=>", "operator");
    } else if (ch == "0" && stream.eat(/x/i)) {
      stream.eatWhile(/[\da-f]/i);
      return ret("number", "number");
    } else if (ch == "0" && stream.eat(/o/i)) {
      stream.eatWhile(/[0-7]/i);
      return ret("number", "number");
    } else if (ch == "0" && stream.eat(/b/i)) {
      stream.eatWhile(/[01]/i);
      return ret("number", "number");
    } else if (/\d/.test(ch)) {
      stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
      return ret("number", "number");
    } else if (ch == "/") {
      if (stream.eat("*")) {
        state.tokenize = tokenComment;
        return tokenComment(stream, state);
      } else if (stream.eat("/")) {
        stream.skipToEnd();
        return ret("comment", "comment");
      } else if (expressionAllowed(stream, state, 1)) {
        readRegexp(stream);
        stream.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);
        return ret("regexp", "string-2");
      } else {
        stream.eat("=");
        return ret("operator", "operator", stream.current());
      }
    } else if (ch == "`") {
      state.tokenize = tokenQuasi;
      return tokenQuasi(stream, state);
    } else if (ch == "#") {
      stream.skipToEnd();
      return ret("error", "error");
    } else if (isOperatorChar.test(ch)) {
      if (ch != ">" || !state.lexical || state.lexical.type != ">") {
        if (stream.eat("=")) {
          if (ch == "!" || ch == "=") stream.eat("=")
        } else if (/[<>*+\-]/.test(ch)) {
          stream.eat(ch)
          if (ch == ">") stream.eat(ch)
        }
      }
      return ret("operator", "operator", stream.current());
    } else if (wordRE.test(ch)) {
      stream.eatWhile(wordRE);
      var word = stream.current()
      if (state.lastType != ".") {
        if (keywords.propertyIsEnumerable(word)) {
          var kw = keywords[word]
          return ret(kw.type, kw.style, word)
        }
        if (word == "async" && stream.match(/^(\s|\/\*.*?\*\/)*[\(\w]/, false))
          return ret("async", "keyword", word)
      }
      return ret("variable", "variable", word)
    }
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, next;
      if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)){
        state.tokenize = tokenBase;
        return ret("jsonld-keyword", "meta");
      }
      while ((next = stream.next()) != null) {
        if (next == quote && !escaped) break;
        escaped = !escaped && next == "\\";
      }
      if (!escaped) state.tokenize = tokenBase;
      return ret("string", "string");
    };
  }

  function tokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize = tokenBase;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ret("comment", "comment");
  }

  function tokenQuasi(stream, state) {
    var escaped = false, next;
    while ((next = stream.next()) != null) {
      if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
        state.tokenize = tokenBase;
        break;
      }
      escaped = !escaped && next == "\\";
    }
    return ret("quasi", "string-2", stream.current());
  }

  var brackets = "([{}])";
  // This is a crude lookahead trick to try and notice that we're
  // parsing the argument patterns for a fat-arrow function before we
  // actually hit the arrow token. It only works if the arrow is on
  // the same line as the arguments and there's no strange noise
  // (comments) in between. Fallback is to only notice when we hit the
  // arrow, and not declare the arguments as locals for the arrow
  // body.
  function findFatArrow(stream, state) {
    if (state.fatArrowAt) state.fatArrowAt = null;
    var arrow = stream.string.indexOf("=>", stream.start);
    if (arrow < 0) return;

    if (isTS) { // Try to skip TypeScript return type declarations after the arguments
      var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow))
      if (m) arrow = m.index
    }

    var depth = 0, sawSomething = false;
    for (var pos = arrow - 1; pos >= 0; --pos) {
      var ch = stream.string.charAt(pos);
      var bracket = brackets.indexOf(ch);
      if (bracket >= 0 && bracket < 3) {
        if (!depth) { ++pos; break; }
        if (--depth == 0) { if (ch == "(") sawSomething = true; break; }
      } else if (bracket >= 3 && bracket < 6) {
        ++depth;
      } else if (wordRE.test(ch)) {
        sawSomething = true;
      } else if (/["'\/]/.test(ch)) {
        return;
      } else if (sawSomething && !depth) {
        ++pos;
        break;
      }
    }
    if (sawSomething && !depth) state.fatArrowAt = pos;
  }

  // Parser

  var atomicTypes = {"atom": true, "number": true, "variable": true, "string": true, "regexp": true, "this": true, "jsonld-keyword": true};

  function JSLexical(indented, column, type, align, prev, info) {
    this.indented = indented;
    this.column = column;
    this.type = type;
    this.prev = prev;
    this.info = info;
    if (align != null) this.align = align;
  }

  function inScope(state, varname) {
    for (var v = state.localVars; v; v = v.next)
      if (v.name == varname) return true;
    for (var cx = state.context; cx; cx = cx.prev) {
      for (var v = cx.vars; v; v = v.next)
        if (v.name == varname) return true;
    }
  }

  function parseJS(state, style, type, content, stream) {
    var cc = state.cc;
    // Communicate our context to the combinators.
    // (Less wasteful than consing up a hundred closures on every call.)
    cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc; cx.style = style;

    if (!state.lexical.hasOwnProperty("align"))
      state.lexical.align = true;

    while(true) {
      var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
      if (combinator(type, content)) {
        while(cc.length && cc[cc.length - 1].lex)
          cc.pop()();
        if (cx.marked) return cx.marked;
        if (type == "variable" && inScope(state, content)) return "variable-2";
        return style;
      }
    }
  }

  // Combinator utils

  var cx = {state: null, column: null, marked: null, cc: null};
  function pass() {
    for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
  }
  function cont() {
    pass.apply(null, arguments);
    return true;
  }
  function register(varname) {
    function inList(list) {
      for (var v = list; v; v = v.next)
        if (v.name == varname) return true;
      return false;
    }
    var state = cx.state;
    cx.marked = "def";
    if (state.context) {
      if (inList(state.localVars)) return;
      state.localVars = {name: varname, next: state.localVars};
    } else {
      if (inList(state.globalVars)) return;
      if (parserConfig.globalVars)
        state.globalVars = {name: varname, next: state.globalVars};
    }
  }

  // Combinators

  var defaultVars = {name: "this", next: {name: "arguments"}};
  function pushcontext() {
    cx.state.context = {prev: cx.state.context, vars: cx.state.localVars};
    cx.state.localVars = defaultVars;
  }
  function popcontext() {
    cx.state.localVars = cx.state.context.vars;
    cx.state.context = cx.state.context.prev;
  }
  function pushlex(type, info) {
    var result = function() {
      var state = cx.state, indent = state.indented;
      if (state.lexical.type == "stat") indent = state.lexical.indented;
      else for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
        indent = outer.indented;
      state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
    };
    result.lex = true;
    return result;
  }
  function poplex() {
    var state = cx.state;
    if (state.lexical.prev) {
      if (state.lexical.type == ")")
        state.indented = state.lexical.indented;
      state.lexical = state.lexical.prev;
    }
  }
  poplex.lex = true;

  function expect(wanted) {
    function exp(type) {
      if (type == wanted) return cont();
      else if (wanted == ";") return pass();
      else return cont(exp);
    };
    return exp;
  }

  function statement(type, value) {
    if (type == "var") return cont(pushlex("vardef", value.length), vardef, expect(";"), poplex);
    if (type == "keyword a") return cont(pushlex("form"), parenExpr, statement, poplex);
    if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
    if (type == "keyword d") return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
    if (type == "debugger") return cont(expect(";"));
    if (type == "{") return cont(pushlex("}"), block, poplex);
    if (type == ";") return cont();
    if (type == "if") {
      if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
        cx.state.cc.pop()();
      return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
    }
    if (type == "function") return cont(functiondef);
    if (type == "for") return cont(pushlex("form"), forspec, statement, poplex);
    if (type == "variable") {
      if (isTS && value == "type") {
        cx.marked = "keyword"
        return cont(typeexpr, expect("operator"), typeexpr, expect(";"));
      } else if (isTS && value == "declare") {
        cx.marked = "keyword"
        return cont(statement)
      } else if (isTS && (value == "module" || value == "enum") && cx.stream.match(/^\s*\w/, false)) {
        cx.marked = "keyword"
        return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex)
      } else {
        return cont(pushlex("stat"), maybelabel);
      }
    }
    if (type == "switch") return cont(pushlex("form"), parenExpr, expect("{"), pushlex("}", "switch"),
                                      block, poplex, poplex);
    if (type == "case") return cont(expression, expect(":"));
    if (type == "default") return cont(expect(":"));
    if (type == "catch") return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"),
                                     statement, poplex, popcontext);
    if (type == "class") return cont(pushlex("form"), className, poplex);
    if (type == "export") return cont(pushlex("stat"), afterExport, poplex);
    if (type == "import") return cont(pushlex("stat"), afterImport, poplex);
    if (type == "async") return cont(statement)
    if (value == "@") return cont(expression, statement)
    return pass(pushlex("stat"), expression, expect(";"), poplex);
  }
  function expression(type) {
    return expressionInner(type, false);
  }
  function expressionNoComma(type) {
    return expressionInner(type, true);
  }
  function parenExpr(type) {
    if (type != "(") return pass()
    return cont(pushlex(")"), expression, expect(")"), poplex)
  }
  function expressionInner(type, noComma) {
    if (cx.state.fatArrowAt == cx.stream.start) {
      var body = noComma ? arrowBodyNoComma : arrowBody;
      if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);
      else if (type == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
    }

    var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
    if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
    if (type == "function") return cont(functiondef, maybeop);
    if (type == "class") return cont(pushlex("form"), classExpression, poplex);
    if (type == "keyword c" || type == "async") return cont(noComma ? expressionNoComma : expression);
    if (type == "(") return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
    if (type == "operator" || type == "spread") return cont(noComma ? expressionNoComma : expression);
    if (type == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
    if (type == "{") return contCommasep(objprop, "}", null, maybeop);
    if (type == "quasi") return pass(quasi, maybeop);
    if (type == "new") return cont(maybeTarget(noComma));
    return cont();
  }
  function maybeexpression(type) {
    if (type.match(/[;\}\)\],]/)) return pass();
    return pass(expression);
  }

  function maybeoperatorComma(type, value) {
    if (type == ",") return cont(expression);
    return maybeoperatorNoComma(type, value, false);
  }
  function maybeoperatorNoComma(type, value, noComma) {
    var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
    var expr = noComma == false ? expression : expressionNoComma;
    if (type == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
    if (type == "operator") {
      if (/\+\+|--/.test(value) || isTS && value == "!") return cont(me);
      if (isTS && value == "<" && cx.stream.match(/^([^>]|<.*?>)*>\s*\(/, false))
        return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, me);
      if (value == "?") return cont(expression, expect(":"), expr);
      return cont(expr);
    }
    if (type == "quasi") { return pass(quasi, me); }
    if (type == ";") return;
    if (type == "(") return contCommasep(expressionNoComma, ")", "call", me);
    if (type == ".") return cont(property, me);
    if (type == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
    if (isTS && value == "as") { cx.marked = "keyword"; return cont(typeexpr, me) }
    if (type == "regexp") {
      cx.state.lastType = cx.marked = "operator"
      cx.stream.backUp(cx.stream.pos - cx.stream.start - 1)
      return cont(expr)
    }
  }
  function quasi(type, value) {
    if (type != "quasi") return pass();
    if (value.slice(value.length - 2) != "${") return cont(quasi);
    return cont(expression, continueQuasi);
  }
  function continueQuasi(type) {
    if (type == "}") {
      cx.marked = "string-2";
      cx.state.tokenize = tokenQuasi;
      return cont(quasi);
    }
  }
  function arrowBody(type) {
    findFatArrow(cx.stream, cx.state);
    return pass(type == "{" ? statement : expression);
  }
  function arrowBodyNoComma(type) {
    findFatArrow(cx.stream, cx.state);
    return pass(type == "{" ? statement : expressionNoComma);
  }
  function maybeTarget(noComma) {
    return function(type) {
      if (type == ".") return cont(noComma ? targetNoComma : target);
      else if (type == "variable" && isTS) return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma)
      else return pass(noComma ? expressionNoComma : expression);
    };
  }
  function target(_, value) {
    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorComma); }
  }
  function targetNoComma(_, value) {
    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorNoComma); }
  }
  function maybelabel(type) {
    if (type == ":") return cont(poplex, statement);
    return pass(maybeoperatorComma, expect(";"), poplex);
  }
  function property(type) {
    if (type == "variable") {cx.marked = "property"; return cont();}
  }
  function objprop(type, value) {
    if (type == "async") {
      cx.marked = "property";
      return cont(objprop);
    } else if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property";
      if (value == "get" || value == "set") return cont(getterSetter);
      var m // Work around fat-arrow-detection complication for detecting typescript typed arrow params
      if (isTS && cx.state.fatArrowAt == cx.stream.start && (m = cx.stream.match(/^\s*:\s*/, false)))
        cx.state.fatArrowAt = cx.stream.pos + m[0].length
      return cont(afterprop);
    } else if (type == "number" || type == "string") {
      cx.marked = jsonldMode ? "property" : (cx.style + " property");
      return cont(afterprop);
    } else if (type == "jsonld-keyword") {
      return cont(afterprop);
    } else if (type == "modifier") {
      return cont(objprop)
    } else if (type == "[") {
      return cont(expression, expect("]"), afterprop);
    } else if (type == "spread") {
      return cont(expressionNoComma, afterprop);
    } else if (value == "*") {
      cx.marked = "keyword";
      return cont(objprop);
    } else if (type == ":") {
      return pass(afterprop)
    }
  }
  function getterSetter(type) {
    if (type != "variable") return pass(afterprop);
    cx.marked = "property";
    return cont(functiondef);
  }
  function afterprop(type) {
    if (type == ":") return cont(expressionNoComma);
    if (type == "(") return pass(functiondef);
  }
  function commasep(what, end, sep) {
    function proceed(type, value) {
      if (sep ? sep.indexOf(type) > -1 : type == ",") {
        var lex = cx.state.lexical;
        if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
        return cont(function(type, value) {
          if (type == end || value == end) return pass()
          return pass(what)
        }, proceed);
      }
      if (type == end || value == end) return cont();
      return cont(expect(end));
    }
    return function(type, value) {
      if (type == end || value == end) return cont();
      return pass(what, proceed);
    };
  }
  function contCommasep(what, end, info) {
    for (var i = 3; i < arguments.length; i++)
      cx.cc.push(arguments[i]);
    return cont(pushlex(end, info), commasep(what, end), poplex);
  }
  function block(type) {
    if (type == "}") return cont();
    return pass(statement, block);
  }
  function maybetype(type, value) {
    if (isTS) {
      if (type == ":") return cont(typeexpr);
      if (value == "?") return cont(maybetype);
    }
  }
  function mayberettype(type) {
    if (isTS && type == ":") {
      if (cx.stream.match(/^\s*\w+\s+is\b/, false)) return cont(expression, isKW, typeexpr)
      else return cont(typeexpr)
    }
  }
  function isKW(_, value) {
    if (value == "is") {
      cx.marked = "keyword"
      return cont()
    }
  }
  function typeexpr(type, value) {
    if (type == "variable" || value == "void") {
      if (value == "keyof") {
        cx.marked = "keyword"
        return cont(typeexpr)
      } else {
        cx.marked = "type"
        return cont(afterType)
      }
    }
    if (type == "string" || type == "number" || type == "atom") return cont(afterType);
    if (type == "[") return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType)
    if (type == "{") return cont(pushlex("}"), commasep(typeprop, "}", ",;"), poplex, afterType)
    if (type == "(") return cont(commasep(typearg, ")"), maybeReturnType)
  }
  function maybeReturnType(type) {
    if (type == "=>") return cont(typeexpr)
  }
  function typeprop(type, value) {
    if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property"
      return cont(typeprop)
    } else if (value == "?") {
      return cont(typeprop)
    } else if (type == ":") {
      return cont(typeexpr)
    } else if (type == "[") {
      return cont(expression, maybetype, expect("]"), typeprop)
    }
  }
  function typearg(type) {
    if (type == "variable") return cont(typearg)
    else if (type == ":") return cont(typeexpr)
  }
  function afterType(type, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
    if (value == "|" || type == ".") return cont(typeexpr)
    if (type == "[") return cont(expect("]"), afterType)
    if (value == "extends") return cont(typeexpr)
  }
  function maybeTypeArgs(_, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
  }
  function typeparam() {
    return pass(typeexpr, maybeTypeDefault)
  }
  function maybeTypeDefault(_, value) {
    if (value == "=") return cont(typeexpr)
  }
  function vardef() {
    return pass(pattern, maybetype, maybeAssign, vardefCont);
  }
  function pattern(type, value) {
    if (type == "modifier") return cont(pattern)
    if (type == "variable") { register(value); return cont(); }
    if (type == "spread") return cont(pattern);
    if (type == "[") return contCommasep(pattern, "]");
    if (type == "{") return contCommasep(proppattern, "}");
  }
  function proppattern(type, value) {
    if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
      register(value);
      return cont(maybeAssign);
    }
    if (type == "variable") cx.marked = "property";
    if (type == "spread") return cont(pattern);
    if (type == "}") return pass();
    return cont(expect(":"), pattern, maybeAssign);
  }
  function maybeAssign(_type, value) {
    if (value == "=") return cont(expressionNoComma);
  }
  function vardefCont(type) {
    if (type == ",") return cont(vardef);
  }
  function maybeelse(type, value) {
    if (type == "keyword b" && value == "else") return cont(pushlex("form", "else"), statement, poplex);
  }
  function forspec(type) {
    if (type == "(") return cont(pushlex(")"), forspec1, expect(")"), poplex);
  }
  function forspec1(type) {
    if (type == "var") return cont(vardef, expect(";"), forspec2);
    if (type == ";") return cont(forspec2);
    if (type == "variable") return cont(formaybeinof);
    return pass(expression, expect(";"), forspec2);
  }
  function formaybeinof(_type, value) {
    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
    return cont(maybeoperatorComma, forspec2);
  }
  function forspec2(type, value) {
    if (type == ";") return cont(forspec3);
    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
    return pass(expression, expect(";"), forspec3);
  }
  function forspec3(type) {
    if (type != ")") cont(expression);
  }
  function functiondef(type, value) {
    if (value == "*") {cx.marked = "keyword"; return cont(functiondef);}
    if (type == "variable") {register(value); return cont(functiondef);}
    if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, statement, popcontext);
    if (isTS && value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondef)
  }
  function funarg(type, value) {
    if (value == "@") cont(expression, funarg)
    if (type == "spread" || type == "modifier") return cont(funarg);
    return pass(pattern, maybetype, maybeAssign);
  }
  function classExpression(type, value) {
    // Class expressions may have an optional name.
    if (type == "variable") return className(type, value);
    return classNameAfter(type, value);
  }
  function className(type, value) {
    if (type == "variable") {register(value); return cont(classNameAfter);}
  }
  function classNameAfter(type, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, classNameAfter)
    if (value == "extends" || value == "implements" || (isTS && type == ","))
      return cont(isTS ? typeexpr : expression, classNameAfter);
    if (type == "{") return cont(pushlex("}"), classBody, poplex);
  }
  function classBody(type, value) {
    if (type == "modifier" || type == "async" ||
        (type == "variable" &&
         (value == "static" || value == "get" || value == "set") &&
         cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false))) {
      cx.marked = "keyword";
      return cont(classBody);
    }
    if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property";
      return cont(isTS ? classfield : functiondef, classBody);
    }
    if (type == "[")
      return cont(expression, expect("]"), isTS ? classfield : functiondef, classBody)
    if (value == "*") {
      cx.marked = "keyword";
      return cont(classBody);
    }
    if (type == ";") return cont(classBody);
    if (type == "}") return cont();
    if (value == "@") return cont(expression, classBody)
  }
  function classfield(type, value) {
    if (value == "?") return cont(classfield)
    if (type == ":") return cont(typeexpr, maybeAssign)
    if (value == "=") return cont(expressionNoComma)
    return pass(functiondef)
  }
  function afterExport(type, value) {
    if (value == "*") { cx.marked = "keyword"; return cont(maybeFrom, expect(";")); }
    if (value == "default") { cx.marked = "keyword"; return cont(expression, expect(";")); }
    if (type == "{") return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
    return pass(statement);
  }
  function exportField(type, value) {
    if (value == "as") { cx.marked = "keyword"; return cont(expect("variable")); }
    if (type == "variable") return pass(expressionNoComma, exportField);
  }
  function afterImport(type) {
    if (type == "string") return cont();
    return pass(importSpec, maybeMoreImports, maybeFrom);
  }
  function importSpec(type, value) {
    if (type == "{") return contCommasep(importSpec, "}");
    if (type == "variable") register(value);
    if (value == "*") cx.marked = "keyword";
    return cont(maybeAs);
  }
  function maybeMoreImports(type) {
    if (type == ",") return cont(importSpec, maybeMoreImports)
  }
  function maybeAs(_type, value) {
    if (value == "as") { cx.marked = "keyword"; return cont(importSpec); }
  }
  function maybeFrom(_type, value) {
    if (value == "from") { cx.marked = "keyword"; return cont(expression); }
  }
  function arrayLiteral(type) {
    if (type == "]") return cont();
    return pass(commasep(expressionNoComma, "]"));
  }

  function isContinuedStatement(state, textAfter) {
    return state.lastType == "operator" || state.lastType == "," ||
      isOperatorChar.test(textAfter.charAt(0)) ||
      /[,.]/.test(textAfter.charAt(0));
  }

  function expressionAllowed(stream, state, backUp) {
    return state.tokenize == tokenBase &&
      /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) ||
      (state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0))))
  }

  // Interface

  return {
    startState: function(basecolumn) {
      var state = {
        tokenize: tokenBase,
        lastType: "sof",
        cc: [],
        lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
        localVars: parserConfig.localVars,
        context: parserConfig.localVars && {vars: parserConfig.localVars},
        indented: basecolumn || 0
      };
      if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
        state.globalVars = parserConfig.globalVars;
      return state;
    },

    token: function(stream, state) {
      if (stream.sol()) {
        if (!state.lexical.hasOwnProperty("align"))
          state.lexical.align = false;
        state.indented = stream.indentation();
        findFatArrow(stream, state);
      }
      if (state.tokenize != tokenComment && stream.eatSpace()) return null;
      var style = state.tokenize(stream, state);
      if (type == "comment") return style;
      state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
      return parseJS(state, style, type, content, stream);
    },

    indent: function(state, textAfter) {
      if (state.tokenize == tokenComment) return CodeMirror.Pass;
      if (state.tokenize != tokenBase) return 0;
      var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top
      // Kludge to prevent 'maybelse' from blocking lexical scope pops
      if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
        var c = state.cc[i];
        if (c == poplex) lexical = lexical.prev;
        else if (c != maybeelse) break;
      }
      while ((lexical.type == "stat" || lexical.type == "form") &&
             (firstChar == "}" || ((top = state.cc[state.cc.length - 1]) &&
                                   (top == maybeoperatorComma || top == maybeoperatorNoComma) &&
                                   !/^[,\.=+\-*:?[\(]/.test(textAfter))))
        lexical = lexical.prev;
      if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
        lexical = lexical.prev;
      var type = lexical.type, closing = firstChar == type;

      if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info + 1 : 0);
      else if (type == "form" && firstChar == "{") return lexical.indented;
      else if (type == "form") return lexical.indented + indentUnit;
      else if (type == "stat")
        return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
      else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
        return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
      else if (lexical.align) return lexical.column + (closing ? 0 : 1);
      else return lexical.indented + (closing ? 0 : indentUnit);
    },

    electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
    blockCommentStart: jsonMode ? null : "/*",
    blockCommentEnd: jsonMode ? null : "*/",
    blockCommentContinue: jsonMode ? null : " * ",
    lineComment: jsonMode ? null : "//",
    fold: "brace",
    closeBrackets: "()[]{}''\"\"``",

    helperType: jsonMode ? "json" : "javascript",
    jsonldMode: jsonldMode,
    jsonMode: jsonMode,

    expressionAllowed: expressionAllowed,

    skipExpression: function(state) {
      var top = state.cc[state.cc.length - 1]
      if (top == expression || top == expressionNoComma) state.cc.pop()
    }
  };
});

CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);

CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("text/ecmascript", "javascript");
CodeMirror.defineMIME("application/javascript", "javascript");
CodeMirror.defineMIME("application/x-javascript", "javascript");
CodeMirror.defineMIME("application/ecmascript", "javascript");
CodeMirror.defineMIME("application/json", {name: "javascript", json: true});
CodeMirror.defineMIME("application/x-json", {name: "javascript", json: true});
CodeMirror.defineMIME("application/ld+json", {name: "javascript", jsonld: true});
CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });

});


/***/ }),

/***/ "./node_modules/codemirror/mode/xml/xml.js":
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (true) // CommonJS
    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

var htmlConfig = {
  autoSelfClosers: {'area': true, 'base': true, 'br': true, 'col': true, 'command': true,
                    'embed': true, 'frame': true, 'hr': true, 'img': true, 'input': true,
                    'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true,
                    'track': true, 'wbr': true, 'menuitem': true},
  implicitlyClosed: {'dd': true, 'li': true, 'optgroup': true, 'option': true, 'p': true,
                     'rp': true, 'rt': true, 'tbody': true, 'td': true, 'tfoot': true,
                     'th': true, 'tr': true},
  contextGrabbers: {
    'dd': {'dd': true, 'dt': true},
    'dt': {'dd': true, 'dt': true},
    'li': {'li': true},
    'option': {'option': true, 'optgroup': true},
    'optgroup': {'optgroup': true},
    'p': {'address': true, 'article': true, 'aside': true, 'blockquote': true, 'dir': true,
          'div': true, 'dl': true, 'fieldset': true, 'footer': true, 'form': true,
          'h1': true, 'h2': true, 'h3': true, 'h4': true, 'h5': true, 'h6': true,
          'header': true, 'hgroup': true, 'hr': true, 'menu': true, 'nav': true, 'ol': true,
          'p': true, 'pre': true, 'section': true, 'table': true, 'ul': true},
    'rp': {'rp': true, 'rt': true},
    'rt': {'rp': true, 'rt': true},
    'tbody': {'tbody': true, 'tfoot': true},
    'td': {'td': true, 'th': true},
    'tfoot': {'tbody': true},
    'th': {'td': true, 'th': true},
    'thead': {'tbody': true, 'tfoot': true},
    'tr': {'tr': true}
  },
  doNotIndent: {"pre": true},
  allowUnquoted: true,
  allowMissing: true,
  caseFold: true
}

var xmlConfig = {
  autoSelfClosers: {},
  implicitlyClosed: {},
  contextGrabbers: {},
  doNotIndent: {},
  allowUnquoted: false,
  allowMissing: false,
  caseFold: false
}

CodeMirror.defineMode("xml", function(editorConf, config_) {
  var indentUnit = editorConf.indentUnit
  var config = {}
  var defaults = config_.htmlMode ? htmlConfig : xmlConfig
  for (var prop in defaults) config[prop] = defaults[prop]
  for (var prop in config_) config[prop] = config_[prop]

  // Return variables for tokenizers
  var type, setStyle;

  function inText(stream, state) {
    function chain(parser) {
      state.tokenize = parser;
      return parser(stream, state);
    }

    var ch = stream.next();
    if (ch == "<") {
      if (stream.eat("!")) {
        if (stream.eat("[")) {
          if (stream.match("CDATA[")) return chain(inBlock("atom", "]]>"));
          else return null;
        } else if (stream.match("--")) {
          return chain(inBlock("comment", "-->"));
        } else if (stream.match("DOCTYPE", true, true)) {
          stream.eatWhile(/[\w\._\-]/);
          return chain(doctype(1));
        } else {
          return null;
        }
      } else if (stream.eat("?")) {
        stream.eatWhile(/[\w\._\-]/);
        state.tokenize = inBlock("meta", "?>");
        return "meta";
      } else {
        type = stream.eat("/") ? "closeTag" : "openTag";
        state.tokenize = inTag;
        return "tag bracket";
      }
    } else if (ch == "&") {
      var ok;
      if (stream.eat("#")) {
        if (stream.eat("x")) {
          ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
        } else {
          ok = stream.eatWhile(/[\d]/) && stream.eat(";");
        }
      } else {
        ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
      }
      return ok ? "atom" : "error";
    } else {
      stream.eatWhile(/[^&<]/);
      return null;
    }
  }
  inText.isInText = true;

  function inTag(stream, state) {
    var ch = stream.next();
    if (ch == ">" || (ch == "/" && stream.eat(">"))) {
      state.tokenize = inText;
      type = ch == ">" ? "endTag" : "selfcloseTag";
      return "tag bracket";
    } else if (ch == "=") {
      type = "equals";
      return null;
    } else if (ch == "<") {
      state.tokenize = inText;
      state.state = baseState;
      state.tagName = state.tagStart = null;
      var next = state.tokenize(stream, state);
      return next ? next + " tag error" : "tag error";
    } else if (/[\'\"]/.test(ch)) {
      state.tokenize = inAttribute(ch);
      state.stringStartCol = stream.column();
      return state.tokenize(stream, state);
    } else {
      stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
      return "word";
    }
  }

  function inAttribute(quote) {
    var closure = function(stream, state) {
      while (!stream.eol()) {
        if (stream.next() == quote) {
          state.tokenize = inTag;
          break;
        }
      }
      return "string";
    };
    closure.isInAttribute = true;
    return closure;
  }

  function inBlock(style, terminator) {
    return function(stream, state) {
      while (!stream.eol()) {
        if (stream.match(terminator)) {
          state.tokenize = inText;
          break;
        }
        stream.next();
      }
      return style;
    };
  }
  function doctype(depth) {
    return function(stream, state) {
      var ch;
      while ((ch = stream.next()) != null) {
        if (ch == "<") {
          state.tokenize = doctype(depth + 1);
          return state.tokenize(stream, state);
        } else if (ch == ">") {
          if (depth == 1) {
            state.tokenize = inText;
            break;
          } else {
            state.tokenize = doctype(depth - 1);
            return state.tokenize(stream, state);
          }
        }
      }
      return "meta";
    };
  }

  function Context(state, tagName, startOfLine) {
    this.prev = state.context;
    this.tagName = tagName;
    this.indent = state.indented;
    this.startOfLine = startOfLine;
    if (config.doNotIndent.hasOwnProperty(tagName) || (state.context && state.context.noIndent))
      this.noIndent = true;
  }
  function popContext(state) {
    if (state.context) state.context = state.context.prev;
  }
  function maybePopContext(state, nextTagName) {
    var parentTagName;
    while (true) {
      if (!state.context) {
        return;
      }
      parentTagName = state.context.tagName;
      if (!config.contextGrabbers.hasOwnProperty(parentTagName) ||
          !config.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
        return;
      }
      popContext(state);
    }
  }

  function baseState(type, stream, state) {
    if (type == "openTag") {
      state.tagStart = stream.column();
      return tagNameState;
    } else if (type == "closeTag") {
      return closeTagNameState;
    } else {
      return baseState;
    }
  }
  function tagNameState(type, stream, state) {
    if (type == "word") {
      state.tagName = stream.current();
      setStyle = "tag";
      return attrState;
    } else {
      setStyle = "error";
      return tagNameState;
    }
  }
  function closeTagNameState(type, stream, state) {
    if (type == "word") {
      var tagName = stream.current();
      if (state.context && state.context.tagName != tagName &&
          config.implicitlyClosed.hasOwnProperty(state.context.tagName))
        popContext(state);
      if ((state.context && state.context.tagName == tagName) || config.matchClosing === false) {
        setStyle = "tag";
        return closeState;
      } else {
        setStyle = "tag error";
        return closeStateErr;
      }
    } else {
      setStyle = "error";
      return closeStateErr;
    }
  }

  function closeState(type, _stream, state) {
    if (type != "endTag") {
      setStyle = "error";
      return closeState;
    }
    popContext(state);
    return baseState;
  }
  function closeStateErr(type, stream, state) {
    setStyle = "error";
    return closeState(type, stream, state);
  }

  function attrState(type, _stream, state) {
    if (type == "word") {
      setStyle = "attribute";
      return attrEqState;
    } else if (type == "endTag" || type == "selfcloseTag") {
      var tagName = state.tagName, tagStart = state.tagStart;
      state.tagName = state.tagStart = null;
      if (type == "selfcloseTag" ||
          config.autoSelfClosers.hasOwnProperty(tagName)) {
        maybePopContext(state, tagName);
      } else {
        maybePopContext(state, tagName);
        state.context = new Context(state, tagName, tagStart == state.indented);
      }
      return baseState;
    }
    setStyle = "error";
    return attrState;
  }
  function attrEqState(type, stream, state) {
    if (type == "equals") return attrValueState;
    if (!config.allowMissing) setStyle = "error";
    return attrState(type, stream, state);
  }
  function attrValueState(type, stream, state) {
    if (type == "string") return attrContinuedState;
    if (type == "word" && config.allowUnquoted) {setStyle = "string"; return attrState;}
    setStyle = "error";
    return attrState(type, stream, state);
  }
  function attrContinuedState(type, stream, state) {
    if (type == "string") return attrContinuedState;
    return attrState(type, stream, state);
  }

  return {
    startState: function(baseIndent) {
      var state = {tokenize: inText,
                   state: baseState,
                   indented: baseIndent || 0,
                   tagName: null, tagStart: null,
                   context: null}
      if (baseIndent != null) state.baseIndent = baseIndent
      return state
    },

    token: function(stream, state) {
      if (!state.tagName && stream.sol())
        state.indented = stream.indentation();

      if (stream.eatSpace()) return null;
      type = null;
      var style = state.tokenize(stream, state);
      if ((style || type) && style != "comment") {
        setStyle = null;
        state.state = state.state(type || style, stream, state);
        if (setStyle)
          style = setStyle == "error" ? style + " error" : setStyle;
      }
      return style;
    },

    indent: function(state, textAfter, fullLine) {
      var context = state.context;
      // Indent multi-line strings (e.g. css).
      if (state.tokenize.isInAttribute) {
        if (state.tagStart == state.indented)
          return state.stringStartCol + 1;
        else
          return state.indented + indentUnit;
      }
      if (context && context.noIndent) return CodeMirror.Pass;
      if (state.tokenize != inTag && state.tokenize != inText)
        return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
      // Indent the starts of attribute names.
      if (state.tagName) {
        if (config.multilineTagIndentPastTag !== false)
          return state.tagStart + state.tagName.length + 2;
        else
          return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
      }
      if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
      var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
      if (tagAfter && tagAfter[1]) { // Closing tag spotted
        while (context) {
          if (context.tagName == tagAfter[2]) {
            context = context.prev;
            break;
          } else if (config.implicitlyClosed.hasOwnProperty(context.tagName)) {
            context = context.prev;
          } else {
            break;
          }
        }
      } else if (tagAfter) { // Opening tag spotted
        while (context) {
          var grabbers = config.contextGrabbers[context.tagName];
          if (grabbers && grabbers.hasOwnProperty(tagAfter[2]))
            context = context.prev;
          else
            break;
        }
      }
      while (context && context.prev && !context.startOfLine)
        context = context.prev;
      if (context) return context.indent + indentUnit;
      else return state.baseIndent || 0;
    },

    electricInput: /<\/[\s\w:]+>$/,
    blockCommentStart: "<!--",
    blockCommentEnd: "-->",

    configuration: config.htmlMode ? "html" : "xml",
    helperType: config.htmlMode ? "html" : "xml",

    skipAttribute: function(state) {
      if (state.state == attrValueState)
        state.state = attrState
    }
  };
});

CodeMirror.defineMIME("text/xml", "xml");
CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html"))
  CodeMirror.defineMIME("text/html", {name: "xml", htmlMode: true});

});


/***/ }),

/***/ "./node_modules/lt-codemirror/lib/codemirror.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Imports
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
var CodeMirror = __webpack_require__("./node_modules/codemirror/lib/codemirror.js");
/**
 * CodeMirror component
 * Usage :
 * <codemirror [(ngModel)]="data" [config]="{...}"></codemirror>
 */
var CodemirrorComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function CodemirrorComponent() {
        this.change = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.cursorActivity = new core_1.EventEmitter();
        this.instance = null;
        this._value = '';
    }
    Object.defineProperty(CodemirrorComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * On component destroy
     */
    CodemirrorComponent.prototype.ngOnDestroy = function () {
    };
    /**
     * On component view init
     */
    CodemirrorComponent.prototype.ngAfterViewInit = function () {
        this.config = this.config || {};
        this.codemirrorInit(this.config, this.size);
    };
    /**
     * Initialize codemirror
     */
    CodemirrorComponent.prototype.codemirrorInit = function (config, size) {
        var _this = this;
        this.instance = CodeMirror.fromTextArea(this.host.nativeElement, config);
        this.instance.setValue(this._value);
        this.instance.on('change', function () {
            _this.updateValue(_this.instance.getValue());
        });
        this.instance.on('focus', function (instance, event) {
            _this.focus.emit({ instance: instance, event: event });
        });
        this.instance.on('cursorActivity', function (instance) {
            _this.cursorActivity.emit({ instance: instance });
        });
        this.instance.on('blur', function (instance, event) {
            _this.blur.emit({ instance: instance, event: event });
        });
        if (this.size != undefined || this.size != {}) {
            this.instance.setSize(this.size.w, this.size.h);
        }
    };
    /**
     * Value update process
     */
    CodemirrorComponent.prototype.updateValue = function (value) {
        this.value = value;
        this.onTouched();
        this.change.emit(value);
    };
    /**
     * Implements ControlValueAccessor
     */
    CodemirrorComponent.prototype.writeValue = function (value) {
        this._value = value || '';
        if (this.instance) {
            this.instance.setValue(this._value);
        }
    };
    CodemirrorComponent.prototype.onChange = function (_) { };
    CodemirrorComponent.prototype.onTouched = function () { };
    CodemirrorComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    CodemirrorComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    CodemirrorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'codemirror',
                    providers: [
                        {
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return CodemirrorComponent; }),
                            multi: true
                        }
                    ],
                    template: "<textarea #host></textarea>",
                },] },
    ];
    /** @nocollapse */
    CodemirrorComponent.ctorParameters = function () { return []; };
    CodemirrorComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
        'size': [{ type: core_1.Input },],
        'change': [{ type: core_1.Output },],
        'focus': [{ type: core_1.Output },],
        'blur': [{ type: core_1.Output },],
        'cursorActivity': [{ type: core_1.Output },],
        'host': [{ type: core_1.ViewChild, args: ['host',] },],
        'instance': [{ type: core_1.Output },],
        'value': [{ type: core_1.Input },],
    };
    return CodemirrorComponent;
}());
exports.CodemirrorComponent = CodemirrorComponent;
//# sourceMappingURL=codemirror.component.js.map

/***/ }),

/***/ "./node_modules/lt-codemirror/lib/codemirror.module.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
var codemirror_component_1 = __webpack_require__("./node_modules/lt-codemirror/lib/codemirror.component.js");
/**
 * CodemirrorModule
 */
var CodemirrorModule = /** @class */ (function () {
    function CodemirrorModule() {
    }
    CodemirrorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        codemirror_component_1.CodemirrorComponent,
                    ],
                    exports: [
                        codemirror_component_1.CodemirrorComponent,
                    ]
                },] },
    ];
    /** @nocollapse */
    CodemirrorModule.ctorParameters = function () { return []; };
    return CodemirrorModule;
}());
exports.CodemirrorModule = CodemirrorModule;
//# sourceMappingURL=codemirror.module.js.map

/***/ }),

/***/ "./node_modules/lt-codemirror/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var codemirror_module_1 = __webpack_require__("./node_modules/lt-codemirror/lib/codemirror.module.js");
exports.CodemirrorModule = codemirror_module_1.CodemirrorModule;
var codemirror_component_1 = __webpack_require__("./node_modules/lt-codemirror/lib/codemirror.component.js");
exports.CodemirrorComponent = codemirror_component_1.CodemirrorComponent;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/lt-treeview/lt-treeview.es5.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LtTreeviewModule", function() { return LtTreeviewModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return LtTreeviewInternalComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return LtTreeviewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");


/**
 * @param {?} item
 * @return {?}
 */
function convertAddedToNode(item) {
    return ({
        label: item.label,
        obj: item.obj,
        children: [],
        expand: false,
        adding: false,
    });
}
var LtTreeviewComponent = (function () {
    function LtTreeviewComponent() {
        this.data = [];
        this.listToAdd = [];
        this.addRootb = false;
    }
    /**
     * @return {?}
     */
    LtTreeviewComponent.prototype.ngOnInit = function () {
    };
    /**
     * This function collapse the item in treeview
     * @param {?} item
     * @return {?}
     */
    LtTreeviewComponent.prototype.expand = function (item) {
        if (item.children.length > 0) {
            item.expand = !item.expand;
        }
    };
    /**
     * This function call The AddNode function
     * @param {?} item
     * @return {?}
     */
    LtTreeviewComponent.prototype.add = function (item) {
        if (this.show === true) {
            if (this.currentNode == undefined) {
                this.currentNode = item;
                this.currentNode.adding = true;
            }
            else if (this.currentNode === item) {
                this.currentNode = undefined;
                item.adding = false;
            }
            else if (this.currentNode !== item) {
                this.currentNode = item;
                this.currentNode.adding = true;
            }
        }
    };
    /**
     * @return {?}
     */
    LtTreeviewComponent.prototype.addRoot = function () {
        this.addRootb = !this.addRootb;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    LtTreeviewComponent.prototype.addRootNode = function (item) {
        var _this = this;
        // Converting the NodeAdded into Node
        var /** @type {?} */ node = convertAddedToNode(item);
        var /** @type {?} */ emitNode = ({
            node: node
        });
        if (this.callBackOnUpdate != undefined) {
            if (this.component == undefined) {
                this.callBackOnUpdate(this.data, emitNode)
                    .then(function (res) {
                    _this.data.push(res);
                });
            }
            else {
                if (this.callBackOnUpdate && typeof this.callBackOnUpdate == 'function') {
                    var /** @type {?} */ method = this.callBackOnUpdate.bind(this.component);
                    method(emitNode).then(function (res) {
                        _this.data.push(res);
                    });
                }
                else {
                    this.component[this.callBackOnUpdate](emitNode).then(function (res) {
                        _this.data.push(res);
                    });
                }
            }
        }
        else {
            this.data.push(node);
        }
        // pushing node into dataNode
        this.addRootb = !this.addRootb;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    LtTreeviewComponent.prototype.delete = function (item) {
        if (this.show === true) {
            if (confirm('Do you really want delete this Node?')) {
                var /** @type {?} */ index = this.data.indexOf(item);
                if (index > -1) {
                    this.data.splice(index, 1);
                    var /** @type {?} */ emitNode = ({
                        node: item
                    });
                    if (this.callBackOnDelete != undefined) {
                        if (this.component == undefined) {
                            this.callBackOnDelete(emitNode);
                        }
                        else {
                            if (this.callBackOnDelete && typeof this.callBackOnDelete == 'function') {
                                var /** @type {?} */ method = this.callBackOnDelete.bind(this.component);
                                method(emitNode);
                            }
                            else {
                                this.component[this.callBackOnDelete](emitNode);
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    LtTreeviewComponent.prototype.addNode = function (item) {
        var _this = this;
        this.data.forEach(function (node) {
            if (node === _this.currentNode) {
                var /** @type {?} */ convertedNode = convertAddedToNode(item);
                if (_this.callBackOnUpdate == undefined) {
                    node.children.push(convertedNode);
                    node.expand = true;
                }
                else {
                    var /** @type {?} */ emitNode = ({
                        parent: node,
                        node: convertedNode
                    });
                    if (_this.component == undefined) {
                        _this.callBackOnUpdate(emitNode).then(function (res) {
                            node.children.push(res);
                            node.expand = true;
                        });
                    }
                    else {
                        if (typeof _this.callBackOnUpdate == 'function') {
                            var /** @type {?} */ method = _this.callBackOnUpdate.bind(_this.component);
                            method(emitNode).then(function (res) {
                                node.children.push(res);
                                node.expand = true;
                            });
                        }
                        else {
                            _this.component[_this.callBackOnUpdate](node.children, emitNode).then(function (res) {
                                node.children.push(res);
                                node.expand = true;
                            });
                        }
                    }
                }
                node.adding = false;
            }
        });
        this.currentNode = undefined;
    };
    return LtTreeviewComponent;
}());
LtTreeviewComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'lt-treeview',
                template: "\n    <div class=\"container\">\n      <ul class=\"treeview\">\n          <li class=\"parent\" *ngFor=\"let item of data\">\n                <div class=\"list-item\" *ngIf=\"item.adding === true\">\n                    <ul>\n                        <li *ngFor=\"let n of listToAdd\"(click)=\"addNode(n)\"><span>{{n.label}}</span></li>\n                    </ul>\n                </div>\n                <span class=\"coll\" (click)=\"expand(item)\" *ngIf=\"item.expand === false; else expanse\">\n                    <i class=\"fa fa-caret-right\"></i>\n                </span>\n                <ng-template #expanse>\n                        <span class=\"coll\" (click)=\"expand(item)\">\n                            <i class=\"fa fa-caret-down\"></i>\n                        </span>\n                    </ng-template>\n                <div class=\"control\">\n                    <a>\n                        {{item.label}}\n                    </a>\n                    <button class=\"plus\" (click)=\"add(item)\">\n                        <i class=\"fa fa-plus\"></i>\n                    </button>\n                    <button class=\"erase\" (click)=\"delete(item)\">\n                        <i class=\"fa fa-remove\"></i>\n                    </button>\n                </div>\n                <lt-treeview-internal [data]=\"item.children\" [parent] = \"item\" [listToAdd]=\"listToAdd\" [show]=\"show\" [component]=\"component\" [callBackOnDelete]=\"callBackOnDelete\" [callBackOnUpdate]=\"callBackOnUpdate\" *ngIf=\"item.expand === true\"></lt-treeview-internal>\n          </li>\n      </ul>\n      <div class=\"box-lt-treeview\" *ngIf=\"show === true\">\n          <button (click)=\"addRoot()\"><i class=\"fa fa-plus\"></i> Add Root</button>\n          <div class=\"list-root\" *ngIf=\"addRootb === true\">\n            <ul>\n                <li *ngFor=\"let n of listToAdd\"(click)=\"addRootNode(n)\"><span>{{n.label}}</span></li>\n            </ul>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    .container {\n        margin-top:30px;\n        margin-left: auto;\n        margin-right: auto;\n        min-height: 100px;\n    }\n\n    .box-lt-treeview{\n        position: relative;\n    }\n\n    .box-lt-treeview button{\n        padding:15px;\n        border-radius: unset;\n        background-color: #4ba6c9;\n        border: unset;\n        color: white;\n        cursor: pointer;\n    }\n\n    .box-lt-treeview .list-root {\n        background-color: #9c9c9c;\n        border: 1px solid;\n        width: 250px;\n        z-index: 1000;\n        position: absolute;\n        top: 0px;\n        left: 89px;\n        color: white;\n    }\n\n    .box-lt-treeview .list-root ul{\n        list-style: none;\n        padding: unset;\n        margin: unset;\n    }\n\n    .box-lt-treeview .list-root li:nth-child(odd){\n        background-color: darkgray;\n    }\n\n    .box-lt-treeview .list-root li {\n        text-transform: capitalize;\n        padding: 15px;\n        cursor: pointer;\n    }\n    .box-lt-treeview .list-root li:hover {\n        background-color: #f9cd0e\n    }\n\n    .list-item\n    {\n        background-color: #9c9c9c;\n        border: 1px solid;\n        width: 250px;\n        z-index: 1000;\n        position: absolute;\n        top: 52px;\n        left: 130px;\n        color: white;\n    }\n\n    .list-item ul {\n        list-style: none;\n        padding: unset;\n    }\n\n    .list-item li:nth-child(odd){\n        background-color: darkgray;\n    }\n\n    .list-item li {\n        text-transform: capitalize;\n        cursor: pointer;\n    }\n    .list-item li:hover {\n        background-color: #f9cd0e\n    }\n\n    .treeview {\n        list-style: none;\n    }\n\n    .coll{\n        padding: 10px;\n        cursor: pointer;\n    }\n\n    .list-tree{\n        list-style: none;\n        margin-top : 8px;\n    }\n\n    .treeview li {\n        padding: 15px;\n        position: relative;\n    }\n\n    .plus{\n        padding: 7px 15px;\n        border: unset;\n        background-color: orange;\n        color: white;\n        cursor: pointer;\n        margin-left: 10px;\n    }\n\n    .erase{\n        padding: 7px 15px;\n        border: unset;\n        background-color: #da3522;\n        color: white;\n        cursor: pointer;\n        margin-left: 10px;\n    }\n\n    .treeview a {\n        text-decoration: none;\n        padding: 10px 15px;\n        color: black;\n        text-transform: capitalize;\n    }\n\n    .control{\n        display: inline-block;\n        padding: 5px;\n        background-color: #e9e9e9;\n    }\n  "]
            },] },
];
/**
 * @nocollapse
 */
LtTreeviewComponent.ctorParameters = function () { return []; };
LtTreeviewComponent.propDecorators = {
    'data': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'listToAdd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'show': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'callBackOnUpdate': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'callBackOnDelete': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'component': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
};
var LtTreeviewInternalComponent = (function () {
    function LtTreeviewInternalComponent() {
        this.listToAdd = [];
        this.parent = (null);
    }
    /**
     * @return {?}
     */
    LtTreeviewInternalComponent.prototype.ngOnInit = function () {
    };
    /**
     * @param {?} item
     * @return {?}
     */
    LtTreeviewInternalComponent.prototype.expand = function (item) {
        if (item.children.length > 0) {
            item.expand = !item.expand;
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    LtTreeviewInternalComponent.prototype.add = function (item) {
        if (this.show === true) {
            if (this.currentNode == undefined) {
                this.currentNode = item;
                this.currentNode.adding = true;
            }
            else if (this.currentNode === item) {
                this.currentNode = undefined;
                item.adding = false;
            }
            else if (this.currentNode !== item) {
                this.currentNode = item;
                this.currentNode.adding = true;
            }
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    LtTreeviewInternalComponent.prototype.delete = function (item) {
        if (this.show === true) {
            if (confirm('Do you really want delete this Node?')) {
                var /** @type {?} */ index = this.data.indexOf(item);
                if (index > -1) {
                    this.data.splice(index, 1);
                    var /** @type {?} */ emitNode = ({
                        node: item
                    });
                    if (this.callBackOnDelete != undefined) {
                        if (this.component == undefined) {
                            this.callBackOnDelete(emitNode);
                        }
                        else {
                            if (this.callBackOnDelete && typeof this.callBackOnDelete == 'function') {
                                var /** @type {?} */ method = this.callBackOnDelete.bind(this.component);
                                method(emitNode);
                            }
                            else {
                                this.component[this.callBackOnDelete](emitNode);
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    LtTreeviewInternalComponent.prototype.addNode = function (item) {
        var _this = this;
        this.data.forEach(function (node) {
            if (node === _this.currentNode) {
                var /** @type {?} */ convertedNode = convertAddedToNode(item);
                if (_this.callBackOnUpdate == undefined) {
                    node.children.push(convertedNode);
                    node.expand = true;
                }
                else {
                    var /** @type {?} */ emitNode = ({
                        parent: node,
                        node: convertedNode
                    });
                    if (_this.component == undefined) {
                        _this.callBackOnUpdate(emitNode).then(function (res) {
                            node.children.push(res);
                            node.expand = true;
                        });
                    }
                    else {
                        if (typeof _this.callBackOnUpdate == 'function') {
                            var /** @type {?} */ method = _this.callBackOnUpdate.bind(_this.component);
                            method(emitNode).then(function (res) {
                                node.children.push(res);
                                node.expand = true;
                            });
                        }
                        else {
                            _this.component[_this.callBackOnUpdate](node.children, emitNode).then(function (res) {
                                node.children.push(res);
                                node.expand = true;
                            });
                        }
                    }
                }
                node.adding = false;
            }
        });
        this.currentNode = undefined;
    };
    return LtTreeviewInternalComponent;
}());
LtTreeviewInternalComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'lt-treeview-internal',
                template: "\n    <ul class=\"list-tree\">\n      <li *ngFor=\"let item of data\">\n          <div class=\"list-item\" *ngIf=\"item.adding === true\">\n              <ul>\n                  <li *ngFor=\"let n of listToAdd\"(click)=\"addNode(n)\"><span>{{n.label}}</span></li>\n              </ul>\n          </div>\n          <span class=\"coll\" (click)=\"expand(item)\" *ngIf=\"item.expand === false; else expanse\">\n            <i class=\"fa fa-caret-right\"></i>\n          </span>\n          <ng-template #expanse>\n              <span class=\"coll\" (click)=\"expand(item)\">\n                  <i class=\"fa fa-caret-down\"></i>\n              </span>\n          </ng-template>\n          <div class=\"control\">\n              <a>\n                  {{item.label}}\n              </a>\n              <button class=\"plus\" (click)=\"add(item)\">\n                  <i class=\"fa fa-plus\"></i>\n              </button>\n              <button class=\"erase\" (click)=\"delete(item)\">\n                  <i class=\"fa fa-remove\"></i>\n              </button>\n          </div>\n          <lt-treeview-internal [data] = \"item.children\" [parent]=\"item\" [listToAdd]=\"listToAdd\" [show]=\"show\" [component]=\"component\" [callBackOnDelete]=\"callBackOnDelete\" [callBackOnUpdate]=\"callBackOnUpdate\" *ngIf=\"item.expand === true\"></lt-treeview-internal>\n        </li>\n    </ul>\n  ",
                styles: ["\n\n    .coll{\n        padding: 10px;\n        cursor: pointer;\n    }\n\n    .list-tree{\n        list-style: none;\n        margin-top : 8px;\n    }\n\n\n    .list-tree li {\n        padding: 15px;\n    }\n\n    .plus{\n        padding: 7px 15px;\n        border: unset;\n        background-color: orange;\n        color: white;\n        cursor: pointer;\n        margin-left: 10px;\n    }\n\n    .erase{\n        padding: 7px 15px;\n        border: unset;\n        background-color: #da3522;\n        color: white;\n        cursor: pointer;\n        margin-left: 10px;\n    }\n\n    .list-tree a {\n        text-decoration: none;\n        padding: 10px 15px;\n        color: black;\n        text-transform: capitalize;\n    }\n\n    .control{\n        display: inline-block;\n        padding: 5px;\n        background-color: #e9e9e9;\n    }\n\n    .list-item\n    {\n        background-color: #9c9c9c;\n        border: 1px solid;\n        width: 250px;\n        z-index: 1000;\n        position: absolute;\n        top: 52px;\n        left: 130px;\n        color: white;\n    }\n\n    .list-item ul {\n        list-style: none;\n        padding: unset;\n    }\n\n    .list-item li:nth-child(odd){\n        background-color: darkgray;\n    }\n\n    .list-item li {\n        text-transform: capitalize;\n        cursor: pointer;\n    }\n    .list-item li:hover {\n        background-color: #f9cd0e\n    }\n  "]
            },] },
];
/**
 * @nocollapse
 */
LtTreeviewInternalComponent.ctorParameters = function () { return []; };
LtTreeviewInternalComponent.propDecorators = {
    'data': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'listToAdd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'show': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'parent': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'callBackOnUpdate': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'callBackOnDelete': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'component': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
};
var LtTreeviewModule = (function () {
    function LtTreeviewModule() {
    }
    return LtTreeviewModule;
}());
LtTreeviewModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                imports: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
                ],
                declarations: [LtTreeviewComponent, LtTreeviewInternalComponent],
                exports: [LtTreeviewComponent]
            },] },
];
/**
 * @nocollapse
 */
LtTreeviewModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=lt-treeview.es5.js.map


/***/ }),

/***/ "./src/plugins/Hardel/Website/Services/website.interfaces.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 14/11/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function createLtPageComponentFrom(el) {
    var obj = {
        id: -1,
        idComponent: el.id,
        name: el.name,
    };
    return obj;
}
exports.createLtPageComponentFrom = createLtPageComponentFrom;
//# sourceMappingURL=website.interfaces.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/Services/website.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 14/11/2017.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var master_service_1 = __webpack_require__("./src/services/master.service.ts");
var WebsiteService = (function (_super) {
    __extends(WebsiteService, _super);
    function WebsiteService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this._updatePages = new Subject_1.Subject();
        _this.updatePages$ = _this._updatePages.asObservable();
        _this._updateMenus = new Subject_1.Subject();
        _this.updateMenus$ = _this._updateMenus.asObservable();
        _this._updateComponents = new Subject_1.Subject();
        _this.updateComponents$ = _this._updateComponents.asObservable();
        // write the api route for setting
        var urls = [
            { namePath: 'getPages', path: 'pages' },
            { namePath: 'savePage', path: 'page' },
            { namePath: 'getPageAtt', path: 'pages/attribute/list' },
            { namePath: 'getComponents', path: 'components' },
            { namePath: 'saveComponent', path: 'component' },
            { namePath: 'getMenus', path: 'menus' },
            { namePath: 'saveMenu', path: 'menu' },
            { namePath: 'getMenuAtt', path: 'menus/attribute/list' },
            { namePath: 'getModels', path: 'template/active/models' },
            { namePath: 'rebuild', path: 'page/rebuild' }
        ];
        //Add the Api to the ApiManager
        _this.apiManager.addListUrlApi(urls);
        return _this;
    }
    /**
     * This function return Page by Property
     * @param name
     * @param value
     * @returns {Page}
     */
    WebsiteService.prototype.getPageByProperty = function (name, value) {
        return this.getItemByProperty(name, value, 'pages', 'listOfPages');
    };
    /**
     * This function return LortomComponent by Property
     * @param name
     * @param value
     * @returns {LortomComponent}
     */
    WebsiteService.prototype.getComponentByProperty = function (name, value) {
        return this.getItemByProperty(name, value, 'components', 'listOfComponents');
    };
    /**
     * This function return LortomMenu by Property
     * @param name
     * @param value
     * @returns {LortomMenu}
     */
    WebsiteService.prototype.getMenuByProperty = function (name, value) {
        return this.getItemByProperty(name, value, 'menus', 'listOfMenus');
    };
    /**
     * This function update Page in listOfPages
     * @param page
     */
    WebsiteService.prototype.updatePageInList = function (page) {
        if (this.listOfPages == undefined) {
            this.listOfPages = this.getPages();
        }
        var p = this.updateItemInList(page, this.listOfPages);
        this.setPages(p);
    };
    WebsiteService.prototype.updateComponentInList = function (cmp) {
        if (this.listOfComponents == undefined) {
            this.listOfComponents = this.getComponents();
        }
        var cs = this.updateItemInList(cmp, this.listOfComponents);
        this.setComponents(cs);
    };
    WebsiteService.prototype.updateMenuInList = function (menu) {
        if (this.listOfMenus == undefined) {
            this.listOfMenus = this.getMenus();
        }
        var ms = this.updateItemInList(menu, this.listOfMenus);
        this.setMenus(ms);
    };
    /**
     * this function return if Pages Exists
     * @returns {boolean}
     */
    WebsiteService.prototype.checkPagesExist = function () {
        return this.checkItemExist('pages');
    };
    /**
     * This function check if Components exist
     * @returns {boolean}
     */
    WebsiteService.prototype.checkComponentsExist = function () {
        return this.checkItemExist('components');
    };
    /**
     * This function check if Menus exist
     * @returns {boolean}
     */
    WebsiteService.prototype.checkMenusExist = function () {
        return this.checkItemExist('menus');
    };
    /**
     * This function Call API to get List Of Pages
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.getPagesFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getPages'))
            .map(function (response) {
            return response.json().pages;
        });
    };
    /**
     * This function call API to get List of Components
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.getComponentsFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getComponents'))
            .map(function (response) {
            return response.json().components;
        });
    };
    /**
     * This function call API to get List of Menus
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.getMenusFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getMenus'))
            .map(function (response) {
            return response.json().menus;
        });
    };
    WebsiteService.prototype.getModelsFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getModels'))
            .map(function (response) {
            return response.json().models;
        });
    };
    /**
     * This function set pages and store it into a Session
     * @param pages
     */
    WebsiteService.prototype.setPages = function (pages) {
        this.setItem('pages', pages);
        this.listOfPages = pages;
    };
    /**
     * This function set components and store it into a Session
     * @param components
     */
    WebsiteService.prototype.setComponents = function (components) {
        this.setItem('components', components);
        this.listOfComponents = components;
    };
    /**
     * This function set menus and store it into a Session
     * @param menus
     */
    WebsiteService.prototype.setMenus = function (menus) {
        this.setItem('menus', menus);
        this.listOfMenus = menus;
    };
    /**
     * This function get listOfPages
     * @returns {any}
     */
    WebsiteService.prototype.getPages = function () {
        return this.getItem('pages', 'listOfPages');
    };
    /**
     * This function get listOfComponents
     * @returns {LortomComponent[]}
     */
    WebsiteService.prototype.getComponents = function () {
        return this.getItem('components', 'listOfComponents');
    };
    /**
     * This function get listOfMenus
     * @returns {LortomMenu[]}
     */
    WebsiteService.prototype.getMenus = function () {
        return this.getItem('menus', 'listOfMenus');
    };
    /**
     * This Function call API in order to Delete a list of Pages
     * @param pages
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.deletePages = function (pages) {
        return this.http.put(this.apiManager.getPathByName('getPages'), pages, this.getOptions())
            .map(function (response) {
            return response.json().pages;
        });
    };
    /**
     * This function call API in order to Delete a list of Components
     * @param cmp
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.deleteComponents = function (cmp) {
        return this.http.put(this.apiManager.getPathByName('getComponents'), cmp, this.getOptions())
            .map(function (response) {
            return response.json().components;
        });
    };
    /**
     * This function call API in order to Delete a list of Menus
     * @param menu
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.deleteMenus = function (menu) {
        return this.http.put(this.apiManager.getPathByName('getMenus'), menu, this.getOptions())
            .map(function (response) {
            return response.json().menus;
        });
    };
    /**
     *This function call API in order to create a Page.
     * @param page
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.createPage = function (page) {
        return this.http.post(this.apiManager.getPathByName('savePage'), page, this.getOptions())
            .map(function (response) {
            return response.json().page;
        });
    };
    WebsiteService.prototype.createComponent = function (comp) {
        return this.http.post(this.apiManager.getPathByName('saveComponent'), comp, this.getOptions())
            .map(function (response) {
            return response.json().component;
        });
    };
    WebsiteService.prototype.createMenu = function (menu) {
        return this.http.post(this.apiManager.getPathByName('saveMenu'), menu, this.getOptions())
            .map(function (response) {
            return response.json().menu;
        });
    };
    WebsiteService.prototype.rebuildPage = function (id) {
        var obj = { id: id };
        return this.http.post(this.apiManager.getPathByName('rebuild'), obj, this.getOptions())
            .map(function (response) {
            return response.json().message;
        });
    };
    /**
     * This function set a Page into the listOfPages
     * @param page
     */
    WebsiteService.prototype.setPage = function (page) {
        var pages = this.getPages();
        pages.push(page);
        this.deletePageFromCache();
        this.setPages(pages);
    };
    /**
     * This function set a Component into the listOfComponents
     * @param cmp
     */
    WebsiteService.prototype.setComponent = function (cmp) {
        var comp = this.getComponents();
        comp.push(cmp);
        this.deleteComponentFromCache();
        this.setComponents(comp);
    };
    WebsiteService.prototype.setMenu = function (menu) {
        var menuList = this.getMenus();
        menuList.push(menu);
        this.deleteMenuFromCache();
        this.setMenus(menuList);
    };
    /**
     * this function delete pages from cache
     */
    WebsiteService.prototype.deletePageFromCache = function () {
        this.deleteItem('pages', 'listOfPages');
    };
    /**
     * This function delete components from cache
     */
    WebsiteService.prototype.deleteComponentFromCache = function () {
        this.deleteItem('components', 'listOfComponents');
    };
    WebsiteService.prototype.deleteMenuFromCache = function () {
        this.deleteItem('menus', 'listOfMenus');
    };
    /**
     * this function fire event
     */
    WebsiteService.prototype.updateListOfPages = function () {
        this._updatePages.next();
    };
    /**
     * this function fire event
     */
    WebsiteService.prototype.updateListOfComponents = function () {
        this._updateComponents.next();
    };
    /**
     * this function fire event
     */
    WebsiteService.prototype.updateListOfMenus = function () {
        this._updateMenus.next();
    };
    /**
     * This function call API in order to get Attribute List
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.getPageAtt = function () {
        return this.http.get(this.apiManager.getPathByName('getPageAtt'))
            .map(function (response) {
            return response.json();
        });
    };
    /**
     * This function call API in order to get Attribute List
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.getMenuAtt = function () {
        return this.http.get(this.apiManager.getPathByName('getMenuAtt'))
            .map(function (response) {
            return response.json().data;
        });
    };
    /**
     * This function delete from listOfPages one page
     * @param page
     */
    WebsiteService.prototype.erasePage = function (page) {
        var index = this.listOfPages.indexOf(page);
        if (index > -1) {
            this.listOfPages.splice(index, 1);
        }
    };
    /**
     * this is HTTP request to API
     * @param page
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.savePage = function (page) {
        return this.http.put(this.apiManager.getPathByName('savePage'), page, this.getOptions())
            .map(function (response) {
            return response.json().page;
        });
    };
    /**
     * this is HTTP request to API
     * @param comp
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.saveComponent = function (comp) {
        return this.http.put(this.apiManager.getPathByName('saveComponent'), comp, this.getOptions())
            .map(function (response) {
            return response.json().component;
        });
    };
    /**
     * This is HTTP request to API
     * @param menu
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.saveMenu = function (menu) {
        return this.http.put(this.apiManager.getPathByName('saveMenu'), menu, this.getOptions())
            .map(function (response) {
            return response.json().menu;
        });
    };
    return WebsiteService;
}(master_service_1.MasterService));
WebsiteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], WebsiteService);
exports.WebsiteService = WebsiteService;
var _a;
//# sourceMappingURL=website.service.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Component/component.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn darkorange\" (click)=\"editMode()\">\n                    <i class=\"fa fa-edit\"></i>\n                    Edit\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [ngModel] = \"component.name\" *ngIf=\"isEdit === false; else editName\" readonly>\n                                    <ng-template #editName>\n                                        <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"component.name\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"appearance\" class=\"col-md-2 control-label\">Appearance</label>\n                                <div class=\"col-md-10\">\n                                        <textarea type=\"text\" class=\"form-control\" name=\"appearance\" id=\"appearance\" style=\"height: 477px;\" [(ngModel)] = \"component.appearance\" *ngIf=\"isEdit === false; else editAppearance\" disabled></textarea>\n                                    <ng-template #editAppearance>\n                                        <codemirror\n                                                class=\"form-control\" name=\"appearance\" id=\"appearance\"\n                                                    [(ngModel)] = \"component.appearance\"\n                                                    [config]=\"config\"\n                                                    [size]=\"size\"\n                                        ></codemirror>\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Component/component.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 21/11/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_interfaces_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.interfaces.ts");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
__webpack_require__("./node_modules/codemirror/mode/htmlmixed/htmlmixed.js");
var ComponentComponent = (function () {
    function ComponentComponent(ecService, router, nav) {
        var _this = this;
        this.ecService = ecService;
        this.router = router;
        this.nav = nav;
        this.self = this;
        this.isEdit = false;
        this.notFound = false;
        this.config = {
            lineNumbers: true,
            mode: 'htmlmixed',
            styleActiveLine: true,
            matchBrackets: true,
            theme: 'dracula',
        };
        this.size = {
            w: '100%',
            h: 477
        };
        this.component = {
            id: -2,
            name: '',
            check: false,
            appearance: ''
        };
        this.sub = this.router.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.component = _this.ecService.getComponentByProperty('id', _this.id);
            if (_this.component != null) {
                _this.notFound = true;
            }
            else {
                _this.nav.navigate(['/backend/not-found']);
            }
            _this.cloneComponent();
        });
    }
    ComponentComponent.prototype.ngOnInit = function () {
    };
    ComponentComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    /**
     * This function pass into edit Mode
     */
    ComponentComponent.prototype.editMode = function () {
        // passa in modalità edit
        this.isEdit = !this.isEdit;
    };
    /**
     * This function go to save Mode
     */
    ComponentComponent.prototype.saveMode = function () {
        // salva i cambiamenti
        var _this = this;
        if (!this.isEqual(this.component, this.copyComponent)) {
            if (this.component.name.length == 0) {
                alert('You must write a name of Component, please!');
                this.cloneCopyComponent();
                return;
            }
            this.ecService.saveComponent(this.component).subscribe(function (component) {
                _this.component = component;
                _this.ecService.updateComponentInList(_this.component);
                _this.editMode();
            });
        }
    };
    /**
     * This function reset the Information of Role
     */
    ComponentComponent.prototype.resetMode = function () {
        if (!this.isEqual(this.component, this.copyComponent)) {
            if (confirm('Are you sure you don\'t want to save this changement and restore it?')) {
                this.cloneCopyComponent();
            }
        }
    };
    ComponentComponent.prototype.isEqual = function (v, v2) {
        return (v.name == v2.name) && (v.appearance.length == v2.appearance.length);
    };
    /**
     * This function clone the Role
     */
    ComponentComponent.prototype.cloneComponent = function () {
        if (this.component != null) {
            this.copyComponent = Object.assign({}, this.component);
        }
    };
    /**
     * This function clone the CopyRole
     */
    ComponentComponent.prototype.cloneCopyComponent = function () {
        this.component = Object.assign({}, this.copyComponent);
    };
    return ComponentComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof website_interfaces_1.LortomComponent !== "undefined" && website_interfaces_1.LortomComponent) === "function" && _a || Object)
], ComponentComponent.prototype, "component", void 0);
ComponentComponent = __decorate([
    core_1.Component({
        selector: 'wb-component',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/Component/component.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _b || Object, typeof (_c = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _c || Object, typeof (_d = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _d || Object])
], ComponentComponent);
exports.ComponentComponent = ComponentComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=component.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Components/components.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li>\n            <a [routerLink]=\"['/backend/website/pages']\" data-toggle=\"tab\"> Pages</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/website/menu']\" data-toggle=\"tab\"> Menu</a>\n        </li>\n        <li class=\"active\">\n            <a  href=\"#tab_1\" data-toggle=\"tab\"> Component</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <lt-entry-pagination\n                                        [entry]=\"'50-5'\"\n                                        (onEntry)=\"onPerPage($event)\">\n                                </lt-entry-pagination>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/website/components/new']\"><i class=\"fa fa-file\"></i> New</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deleteComponents()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Name</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let el of listToShow\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,el)\" [(ngModel)] = \"el.check\">\n                                        </td>\n                                        <td>\n                                            {{el.name}}\n                                        </td>\n                                        <td>\n                                            <a [routerLink] = \"['/backend/website/components',el.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <lt-pagination\n                                [pagesToShow]=\"3\"\n                                [perPage]=\"perPage\"\n                                [count]=\"listOfComponents.length\"\n                                [loading]=\"false\"\n                                [page]=\"actualPage\"\n                                (goNext)=\"onNext($event)\"\n                                (goPage)=\"onPage($event)\"\n                                (goPrev)=\"onPrev()\">\n                        </lt-pagination>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Components/components.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 20/11/2017.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var list_component_1 = __webpack_require__("./src/model/list.component.ts");
var ComponentsComponent = (function (_super) {
    __extends(ComponentsComponent, _super);
    function ComponentsComponent(ccService, router) {
        var _this = _super.call(this) || this;
        _this.ccService = ccService;
        _this.router = router;
        _this.listOfComponents = [];
        _this.myRoot = '/backend/website/components';
        _this.isRoot = false;
        _this.listOfComponents = [];
        _this.onComponentInit({
            name: 'ccService',
            permission: 'Hardel.Website.Component',
            upd: 'updateComponents$'
        }, 'router', 'retrieveListOfComponents');
        return _this;
    }
    ComponentsComponent.prototype.ngOnInit = function () { };
    ComponentsComponent.prototype.retrieveListOfComponents = function () {
        this.retrieveListOfData({
            name: 'ccService',
            getData: 'getComponents',
            setData: 'setComponents',
            callApi: 'getComponentsFrom',
            check: 'checkComponentsExist'
        }, 'listOfComponents');
    };
    ComponentsComponent.prototype.eventChange = function (ev, data) {
        this.eventChangeData(ev, data);
    };
    ComponentsComponent.prototype.deleteComponents = function () {
        this.deleteData({
            name: 'ccService',
            setData: 'setComponents',
            delFn: 'deleteComponents'
        }, 'listOfComponents', "Do you really want delete this Components?");
    };
    return ComponentsComponent;
}(list_component_1.ListComponent));
ComponentsComponent = __decorate([
    core_1.Component({
        selector: 'wb-components',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/Components/components.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], ComponentsComponent);
exports.ComponentsComponent = ComponentsComponent;
var _a, _b;
//# sourceMappingURL=components.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Menu/menu.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn darkorange\" (click)=\"editMode()\">\n                    <i class=\"fa fa-edit\"></i>\n                    Edit\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"title\" class=\"col-md-2 control-label\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"title\" placeholder=\"Title\" id=\"title\" [ngModel] = \"menu.name\" *ngIf=\"isEdit === false; else titleEdit\" readonly>\n                                    <ng-template #titleEdit>\n                                        <input type=\"text\" class=\"form-control\" name=\"title\" placeholder=\"Title\" id=\"title\" [(ngModel)] = \"menu.name\">\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"parent\" class=\"col-md-2 control-label\">Parent</label>\n                                <div class=\"col-md-4\">\n                                    <select class=\"form-control\" name=\"parent\" id=\"parent\" *ngIf=\"isEdit === false; else editParent\" disabled>\n                                        <ng-container>\n                                            <option *ngFor=\"let p of listOfParent\" [ngValue]=\"p\" [attr.selected] = \"p.id == menu.idParent ? true : null \" [innerHtml] = \"p.label\"> </option>\n                                        </ng-container>\n                                    </select>\n                                    <ng-template #editParent>\n                                        <select class=\"form-control\" name=\"parent\" [compareWith]=\"compareParent\" [(ngModel)] = \"menu.parentList\">\n                                            <option *ngFor=\"let p of listOfParent\" [ngValue]=\"p\"  [innerHtml] = \"p.label\"> </option>\n                                        </select>\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"page\" class=\"col-md-2 control-label\">Related Page</label>\n                                <div class=\"col-md-4\">\n                                    <select class=\"form-control\" name=\"page\" id=\"page\" *ngIf=\"isEdit === false; else editPage\" disabled>\n                                        <ng-container>\n                                            <option *ngFor=\"let pa of listOfPages\" [ngValue]=\"pa\" [selected] = \"pa.id == menu.idPage.id ? true : null \" [innerHtml] = \"pa.label\"> </option>\n                                        </ng-container>\n                                    </select>\n                                    <ng-template #editPage>\n                                        <select class=\"form-control\" name=\"page\" [compareWith]=\"comparePage\" [(ngModel)] = \"menu.idPage\">\n                                            <option *ngFor=\"let pa of listOfPages\" [ngValue]=\"pa\" [innerHtml] = \"pa.label\"> </option>\n                                        </select>\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Menu/menu.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 07/12/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var website_interfaces_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.interfaces.ts");
var utils_1 = __webpack_require__("./node_modules/tslint/lib/utils.js");
var MenuComponent = (function () {
    function MenuComponent(nnService, router, nav) {
        var _this = this;
        this.nnService = nnService;
        this.router = router;
        this.nav = nav;
        this.isEdit = false;
        this.sub = this.router.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.menu = _this.nnService.getMenuByProperty('id', _this.id);
            if (_this.menu != null) {
                _this.notFound = true;
            }
            else {
                _this.nav.navigate(['/backend/not-found']);
            }
            _this.cloneMenu();
        });
        this.nnService.getMenuAtt().subscribe(function (data) {
            _this.listOfPages = data.pageList;
            _this.listOfParent = data.parentList;
        });
    }
    MenuComponent.prototype.ngOnInit = function () { };
    MenuComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    MenuComponent.prototype.comparePage = function (c1, c2) {
        return c1 && c2 ? c1.id == c2.id : c1 == c2;
    };
    MenuComponent.prototype.compareParent = function (c1, c2) {
        return c1 && c2 ? c1.id == c2.id : c1 == c2;
    };
    MenuComponent.prototype.cloneMenu = function () {
        var idPage = Object.assign({}, this.menu.idPage);
        this.copyMenu = Object.assign({}, this.menu);
        this.copyMenu.idPage = idPage;
        if (utils_1.hasOwnProperty(this.menu, 'parentList')) {
            var parentList = Object.assign({}, this.menu.parentList);
            this.copyMenu.parentList = parentList;
        }
    };
    MenuComponent.prototype.editMode = function () {
        this.isEdit = !this.isEdit;
    };
    MenuComponent.prototype.saveMode = function () {
        var _this = this;
        if (!this.isEqual(this.menu, this.copyMenu) && this.isEdit == true) {
            var objToSend = {
                id: this.menu.id,
                name: this.menu.name,
                idParent: this.menu.parentList.id,
                idPage: this.menu.idPage.id
            };
            this.nnService.saveMenu(objToSend).subscribe(function (menu) {
                _this.menu = menu;
                _this.cloneMenu();
                _this.nnService.updateMenuInList(_this.menu);
                _this.nnService.updateListOfMenus();
                _this.editMode();
            });
        }
    };
    MenuComponent.prototype.resetMode = function () {
        if (confirm('Do you want to reset all data?')) {
            this.cloneCopyMenu();
        }
    };
    MenuComponent.prototype.isEqual = function (v1, v2) {
        return ((v1.name == v2.name) && (v1.parentList == v2.parentList) && (v1.idPage == v2.idPage));
    };
    MenuComponent.prototype.cloneCopyMenu = function () {
        var idPage = Object.assign({}, this.copyMenu.idPage);
        this.menu = Object.assign({}, this.copyMenu);
        this.menu.idPage = idPage;
        if (utils_1.hasOwnProperty(this.copyMenu, 'parentList')) {
            var parentList = Object.assign({}, this.copyMenu.parentList);
            this.menu.parentList = parentList;
        }
    };
    return MenuComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof website_interfaces_1.LortomMenu !== "undefined" && website_interfaces_1.LortomMenu) === "function" && _a || Object)
], MenuComponent.prototype, "menu", void 0);
MenuComponent = __decorate([
    core_1.Component({
        selector: 'wb-menu-edit',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/Menu/menu.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _b || Object, typeof (_c = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _c || Object, typeof (_d = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _d || Object])
], MenuComponent);
exports.MenuComponent = MenuComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=menu.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Menus/menus.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li>\n            <a [routerLink]=\"['/backend/website/pages']\" data-toggle=\"tab\"> Pages</a>\n        </li>\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> Menu</a>\n        </li>\n        <li>\n            <a  [routerLink]=\"['/backend/website/components']\" data-toggle=\"tab\"> Component</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <lt-entry-pagination\n                                        [entry]=\"'50-5'\"\n                                        (onEntry)=\"onPerPage($event)\">\n                                </lt-entry-pagination>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/website/menu/new']\"><i class=\"fa fa-file\"></i> New</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deleteMenus()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Name</a>\n                                        </th>\n                                        <th>\n                                            <a>Related Page</a>\n                                        </th>\n                                        <th>\n                                            <a>Parent</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let el of listToShow\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,el)\" [(ngModel)] = \"el.check\">\n                                        </td>\n                                        <td>\n                                            {{el.name}}\n                                        </td>\n                                        <td>\n                                            {{el.idPage.label}}\n                                        </td>\n                                        <td>\n                                            {{el.parentList.label}}\n                                        </td>\n                                        <td>\n                                            <a [routerLink] = \"['/backend/website/menu',el.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <lt-pagination\n                                [pagesToShow]=\"3\"\n                                [perPage]=\"perPage\"\n                                [count]=\"listOfMenus.length\"\n                                [loading]=\"false\"\n                                [page]=\"actualPage\"\n                                (goNext)=\"onNext($event)\"\n                                (goPage)=\"onPage($event)\"\n                                (goPrev)=\"onPrev()\">\n                        </lt-pagination>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Menus/menus.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 05/12/2017.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var list_component_1 = __webpack_require__("./src/model/list.component.ts");
var MenusComponent = (function (_super) {
    __extends(MenusComponent, _super);
    function MenusComponent(mcService, router) {
        var _this = _super.call(this) || this;
        _this.mcService = mcService;
        _this.router = router;
        _this.listOfMenus = [];
        _this.myRoot = '/backend/website/menu';
        _this.isRoot = false;
        _this.listOfMenus = [];
        _this.onComponentInit({
            name: 'mcService',
            permission: 'Hardel.Website.Menu',
            upd: 'updateMenus$'
        }, 'router', 'retrieveListOfMenus');
        return _this;
    }
    MenusComponent.prototype.ngOnInit = function () { };
    MenusComponent.prototype.retrieveListOfMenus = function () {
        this.retrieveListOfData({
            name: 'mcService',
            getData: 'getMenus',
            setData: 'setMenus',
            callApi: 'getMenusFrom',
            check: 'checkMenusExist'
        }, 'listOfMenus');
    };
    MenusComponent.prototype.eventChange = function (ev, data) {
        this.eventChangeData(ev, data);
    };
    MenusComponent.prototype.deleteMenus = function () {
        this.deleteData({
            name: 'mcService',
            setData: 'setMenus',
            delFn: 'deleteMenus'
        }, 'listOfMenus', "Do you really want delete this Menus?");
    };
    return MenusComponent;
}(list_component_1.ListComponent));
MenusComponent = __decorate([
    core_1.Component({
        selector: 'wb-menus',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/Menus/menus.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], MenusComponent);
exports.MenusComponent = MenusComponent;
var _a, _b;
//# sourceMappingURL=menus.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/NewComponent/componentnew.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"component.name\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"appearance\" class=\"col-md-2 control-label\">Appearance</label>\n                                <div class=\"col-md-10\">\n                                    <codemirror class=\"form-control\" name=\"appearance\" id=\"appearance\" [(ngModel)] = \"component.appearance\" [config] = \"config\"></codemirror>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/NewComponent/componentnew.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 20/11/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var NewComponent = (function () {
    function NewComponent(ncsService, router) {
        this.ncsService = ncsService;
        this.router = router;
        this.isEdit = false;
        this.query = '';
        this.config = {
            lineNumbers: true,
            mode: 'htmlmixed',
            styleActiveLine: true,
            matchBrackets: true,
            theme: 'dracula'
        };
        this.component = {
            id: -1,
            name: '',
            check: false,
            appearance: '',
        };
    }
    NewComponent.prototype.ngOnInit = function () {
        this.retriveElement();
    };
    NewComponent.prototype.retriveElement = function () {
        this.cloneComponent();
    };
    /**
     * This function go to save Mode
     */
    NewComponent.prototype.saveMode = function () {
        //salva i cambiamenti
        var _this = this;
        if (!this.isEqual(this.component, this.copyComponent)) {
            if (this.component.name.length == 0) {
                alert('You must write a name of Role, please!');
                this.cloneCopyComponent();
                return;
            }
            this.ncsService.createComponent(this.component).subscribe(function (data) {
                if (!data.hasOwnProperty('check')) {
                    data.check = false;
                }
                //push the item into roles
                _this.ncsService.setComponent(data);
                _this.ncsService.updateListOfComponents();
                //navigate to Settings Roles
                _this.router.navigate(['/backend/website/components']);
            });
        }
    };
    NewComponent.prototype.resetMode = function () {
        if (confirm('Do you want to reset all data?')) {
            this.cloneCopyComponent();
        }
    };
    NewComponent.prototype.isEqual = function (v, v2) {
        return (v.name == v2.name) && (v.appearance == v2.appearance);
    };
    /**
     * This function clone the Role
     */
    NewComponent.prototype.cloneComponent = function () {
        this.copyComponent = Object.assign({}, this.component);
    };
    /**
     * This function clone the CopyRole
     */
    NewComponent.prototype.cloneCopyComponent = function () {
        this.component = Object.assign({}, this.copyComponent);
    };
    return NewComponent;
}());
NewComponent = __decorate([
    core_1.Component({
        selector: 'wb-new-component',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/NewComponent/componentnew.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], NewComponent);
exports.NewComponent = NewComponent;
var _a, _b;
//# sourceMappingURL=componentnew.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/NewMenu/menunew.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"title\" class=\"col-md-2 control-label\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"title\" placeholder=\"Title\" id=\"title\" [(ngModel)] = \"menu.name\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"parent\" class=\"col-md-2 control-label\">Parent</label>\n                                <div class=\"col-md-4\">\n                                    <select class=\"form-control\" name=\"parent\" id=\"parent\" [(ngModel)]=\"menu.parentList\">\n                                        <option *ngFor=\"let p of listOfParent\" [ngValue]=\"p\" [innerHtml] = \"p.label\"> </option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"page\" class=\"col-md-2 control-label\">Related Page</label>\n                                <div class=\"col-md-4\">\n                                    <select class=\"form-control\" name=\"page\" id=\"page\" [(ngModel)]=\"menu.idPage\">\n                                        <option *ngFor=\"let pa of listOfPages\" [ngValue]=\"pa\">{{pa.label}}</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMenu()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/NewMenu/menunew.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 05/12/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var utils_1 = __webpack_require__("./node_modules/tslint/lib/utils.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var MenuNewComponent = (function () {
    function MenuNewComponent(nmService, route) {
        var _this = this;
        this.nmService = nmService;
        this.route = route;
        this.menu = {
            id: -1,
            name: '',
            idParent: 0,
            idPage: { id: null, label: '' },
            check: false
        };
        this.nmService.getMenuAtt().subscribe(function (data) {
            _this.listOfPages = data.pageList;
            _this.listOfParent = data.parentList;
        });
        this.cloneMenu();
    }
    MenuNewComponent.prototype.ngOnInit = function () {
    };
    MenuNewComponent.prototype.saveMenu = function () {
        var _this = this;
        if (!this.isEqual(this.menu, this.copyMenu)) {
            this.menu.idParent = this.menu.parentList.id;
            var objToSend = {
                id: -1,
                name: this.menu.name,
                idParent: this.menu.parentList.id,
                idPage: this.menu.idPage.id
            };
            this.nmService.createMenu(objToSend).subscribe(function (menu) {
                _this.nmService.setMenu(menu);
                _this.nmService.updateListOfMenus();
                _this.route.navigate(['/backend/website/menu']);
            });
        }
    };
    MenuNewComponent.prototype.resetMode = function () {
        if (confirm('Do you want to reset all data?')) {
            this.cloneCopyMenu();
        }
    };
    MenuNewComponent.prototype.cloneMenu = function () {
        var idPage = Object.assign({}, this.menu.idPage);
        this.copyMenu = Object.assign({}, this.menu);
        this.copyMenu.idPage = idPage;
        if (utils_1.hasOwnProperty(this.menu, 'parentList')) {
            var parentList = Object.assign({}, this.menu.parentList);
            this.copyMenu.parentList = parentList;
        }
    };
    MenuNewComponent.prototype.isEqual = function (v1, v2) {
        return ((v1.name == v2.name) && (v1.parentList == v2.parentList) && (v1.idPage == v2.idPage));
    };
    MenuNewComponent.prototype.cloneCopyMenu = function () {
        var idPage = Object.assign({}, this.copyMenu.idPage);
        this.menu = Object.assign({}, this.copyMenu);
        this.menu.idPage = idPage;
        if (utils_1.hasOwnProperty(this.copyMenu, 'parentList')) {
            var parentList = Object.assign({}, this.copyMenu.parentList);
            this.menu.parentList = parentList;
        }
    };
    return MenuNewComponent;
}());
MenuNewComponent = __decorate([
    core_1.Component({
        selector: 'wb-new-menu',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/NewMenu/menunew.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], MenuNewComponent);
exports.MenuNewComponent = MenuNewComponent;
var _a, _b;
//# sourceMappingURL=menunew.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/NewPage/pagenew.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"title\" class=\"col-md-2 control-label\">Title</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"title\" placeholder=\"Title\" id=\"title\" [(ngModel)] = \"page.title\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"slug\" class=\"col-md-2 control-label\">Slug</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"slug\" placeholder=\"Slug\" id=\"slug\" [(ngModel)] = \"page.slug\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"fileName\" class=\"col-md-2 control-label\">File Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"fileName\" placeholder=\"File Name\" id=\"fileName\" [(ngModel)] = \"page.fileName\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"meta_tag\" class=\"col-md-2 control-label\">Meta Tag</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"meta_tag\" placeholder=\"Meta Tag\" id=\"meta_tag\" [(ngModel)] = \"page.metaTag\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"meta_desc\" class=\"col-md-2 control-label\">Meta Desc</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"meta_desc\" placeholder=\"Meta Desc\" id=\"meta_desc\" [(ngModel)] = \"page.metaDesc\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"new-page\" class=\"col-md-2 control-label\">State</label>\n                                <div class=\"col-md-4\">\n                                    <select class=\"form-control\" name=\"state\" [(ngModel)] = \"page.state\">\n                                        <option *ngFor=\"let x of listOfState\" [ngValue]=\"x\">{{x.label}}</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"new-page\" class=\"col-md-2 control-label\">Content</label>\n                                <div class=\"col-md-10\">\n                                   <app-editor [elementId]=\"'new-page'\" id=\"new-page\" [content]=\"page.content\" (onEditorKeyup)=\"keyupHandlerFunction($event)\"></app-editor>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/NewPage/pagenew.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var PageNewComponent = (function () {
    function PageNewComponent(pn_Service, rout) {
        var _this = this;
        this.pn_Service = pn_Service;
        this.rout = rout;
        this.page = {
            id: -1,
            title: '',
            slug: '',
            metaTag: '',
            metaDesc: '',
            check: false,
            state: {},
            content: '',
            fileName: '',
        };
        this.clonePage();
        this.pn_Service.getPageAtt().subscribe(function (data) {
            _this.listOfState = data.states;
        });
    }
    PageNewComponent.prototype.ngOnInit = function () { };
    PageNewComponent.prototype.resetMode = function () {
        if (confirm('Do you want to reset all data?')) {
            this.cloneCopyPage();
        }
    };
    PageNewComponent.prototype.clonePage = function () {
        this.copyPage = Object.assign({}, this.page);
    };
    PageNewComponent.prototype.cloneCopyPage = function () {
        this.page = Object.assign({}, this.copyPage);
    };
    PageNewComponent.prototype.saveMode = function () {
        var _this = this;
        if (this.isEqual(this.page, this.copyPage)) {
            this.pn_Service.createPage(this.page).subscribe(function (page) {
                _this.pn_Service.setPage(page);
                _this.pn_Service.updateListOfPages();
                _this.rout.navigate(['/backend/website/pages']);
            });
        }
    };
    PageNewComponent.prototype.isEqual = function (v1, v2) {
        return (v1.title != v2.title && v1.slug != v2.slug);
    };
    PageNewComponent.prototype.keyupHandlerFunction = function (event) {
        this.page.content = event;
    };
    return PageNewComponent;
}());
PageNewComponent = __decorate([
    core_1.Component({
        selector: 'wb-new-page',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/NewPage/pagenew.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], PageNewComponent);
exports.PageNewComponent = PageNewComponent;
var _a, _b;
//# sourceMappingURL=pagenew.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Page/page.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn darkorange\" (click)=\"editMode()\">\n                    <i class=\"fa fa-edit\"></i>\n                    Edit\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"title\" class=\"col-md-2 control-label\">Title</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"title\" [ngModel] = \"page.title\" placeholder=\"Title\" id=\"title\" *ngIf=\"isEdit === false; else editTitle\" readonly>\n                                    <ng-template #editTitle>\n                                        <input type=\"text\" class=\"form-control\" name=\"title\" placeholder=\"Title\" id=\"title\" [(ngModel)] = \"page.title\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"slug\" class=\"col-md-2 control-label\">Slug</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"slug\" placeholder=\"Slug\" id=\"slug\" [ngModel] = \"page.slug\" *ngIf=\"isEdit === false; else editSlug\" readonly>\n                                    <ng-template #editSlug>\n                                        <input type=\"text\" class=\"form-control\" name=\"slug\" placeholder=\"Slug\" id=\"slug\" [(ngModel)] = \"page.slug\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"fileName\" class=\"col-md-2 control-label\">File Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"fileName\" placeholder=\"File Name\" id=\"fileName\" [ngModel] = \"page.fileName\" *ngIf=\"isEdit === false; else editFileName\" readonly>\n                                    <ng-template #editFileName>\n                                        <input type=\"text\" class=\"form-control\" name=\"fileName\" placeholder=\"File Name\" id=\"fileName\" [(ngModel)] = \"page.fileName\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"meta_tag\" class=\"col-md-2 control-label\">Meta Tag</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"meta_tag\" placeholder=\"Meta Tag\" id=\"meta_tag\" [ngModel] = \"page.metaTag\" *ngIf=\"isEdit === false; else editMetaTag\" readonly>\n                                    <ng-template #editMetaTag>\n                                        <input type=\"text\" class=\"form-control\" name=\"meta_tag\" placeholder=\"Meta Tag\" id=\"meta_tag\" [(ngModel)] = \"page.metaTag\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"meta_desc\" class=\"col-md-2 control-label\">Meta Desc</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"meta_desc\" placeholder=\"Meta Desc\" id=\"meta_desc\" [ngModel] = \"page.metaDesc\" *ngIf=\"isEdit === false; else editMetaDesc\" readonly>\n                                    <ng-template #editMetaDesc>\n                                        <input type=\"text\" class=\"form-control\" name=\"meta_desc\" placeholder=\"Meta Desc\" id=\"meta_desc\" [(ngModel)] = \"page.metaDesc\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"state\" class=\"col-md-2 control-label\">State</label>\n                                <div class=\"col-md-4\">\n                                    <select class=\"form-control\" name=\"state\"  id=\"state\" *ngIf=\"isEdit === false; else editState\" disabled>\n                                        <ng-container>\n                                            <option *ngFor=\"let x of listOfState\" [ngValue]=\"x\" [attr.selected] = \"x == page.state ? true : null\">{{x.label}}</option>\n                                        </ng-container>\n                                    </select>\n                                    <ng-template #editState>\n                                        <select class=\"form-control\" name=\"state\" [(ngModel)] = \"page.state\">\n                                            <option *ngFor=\"let x of listOfState\" [ngValue]=\"x\" [attr.selected] = \"x == page.state ? true : null\">{{x.label}}</option>\n                                        </select>\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"edit-page\" class=\"col-md-2 control-label\">Content</label>\n                                <div class=\"col-md-10\">\n                                    <div class=\"form-control\" [innerHtml] = \"page.content\" *ngIf=\"isEdit === false; else editContent\" disabled></div>\n                                    <ng-template #editContent>\n                                        <app-editor [elementId]=\"'edit-page'\" id=\"edit-page\" [content]=\"page.content\" (onEditorKeyup)=\"keyupHandlerFunction($event)\"></app-editor>\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-list\"></i>\n                <span>Component</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn cyan\" data-toggle=\"modal\" data-target=\"#addModal\" *ngIf=\"isEdit == true\">\n                    <i class=\"fa fa-plus\"></i>\n                    Add\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\" *ngIf=\"page.components.length > 0\">\n                                    <thead>\n                                    <tr>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th>\n                                            <a>Object</a>\n                                        </th>\n                                        <th>\n                                            <a>Function</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let comp of page.components; let i = index\">\n                                        <td>\n                                            {{comp.name}}\n                                        </td>\n                                        <td>\n                                            <input type=\"text\" class=\"form-control\" [ngModel]=\"comp.Object\"  name=\"objecto-{{i}}\" *ngIf=\"isEdit === false; else editObject\" readonly>\n                                            <ng-template #editObject>\n                                                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"comp.Object\" name=\"objecto-{{i}}\" (focus)=\"openModal($event,addModal2,comp)\" readonly>\n                                            </ng-template>\n                                        </td>\n                                        <td>\n                                            <input type=\"text\" class=\"form-control\" [ngModel]=\"comp.functions\" name=\"functions-{{i}}\"  readonly>\n                                        </td>\n                                        <td>\n                                            <a class=\"td_orange\" (click)=\"eraseComponent(comp)\" *ngIf=\"isEdit == true\"><i class=\"fa fa-window-close-o\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n    <div id=\"addModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addModal\"  aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <div class=\"modal-title\">\n                        Searching For Permission\n                        <button class=\"close\" data-dismiss = \"modal\" aria-label=\"hidden\"><i class=\"fa fa-times\"></i></button>\n                    </div>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group flex-group\">\n                                <label class=\"col-md-4\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control input-sm\" name=\"query\" [(ngModel)]=\"query\" (keyup)=\"filter()\" autocomplete=\"off\">\n                                    <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\">\n                                        <ul>\n                                            <li class=\"suggestion-li\" *ngFor=\"let item of filteredList\">\n                                                <a (click)=\"addComponent(item)\">{{item.name}}</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <div class=\"m-footer\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <ng-template #addModal2 let-c=\"close\" let-d=\"dismiss\">\n        <div class=\"modal-header\">\n            <h4 class=\"modal-title\">Object and Functions</h4>\n            <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <div class=\"form-group flex-group\">\n                        <label class=\"col-md-4\">Object</label>\n                        <div class=\"col-md-4\">\n                            <select class=\"form-control\" name=\"ObjectModel\" [(ngModel)] = \"Model\" (ngModelChange) = \"objectChange()\">\n                                <option *ngFor=\"let x of listOfModelIndex\" [ngValue]=\"x\" [attr.selected] = \"x.label === Model.label ?  true : null\">{{x.label}}</option>\n                            </select>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-12\">\n                    <div class=\"form-group flex-group\">\n                        <label class=\"col-md-4\">Functions</label>\n                        <div class=\"col-md-4\">\n                            <select class=\"form-control\" name=\"ObjectFunctions\" [(ngModel)] = \"Function\">\n                                <option *ngFor=\"let h of listOfFunctions\" [value]=\"h\">{{h}}</option>\n                            </select>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"modal-footer\">\n           <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"c('SAVE_DATA')\">Save</button>\n            <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"c('CLEAR_DATA')\">Clear Data</button>\n        </div>\n    </ng-template>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Page/page.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_interfaces_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.interfaces.ts");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var utils_1 = __webpack_require__("./node_modules/tslint/lib/utils.js");
var ng_bootstrap_1 = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var PageComponent = (function () {
    function PageComponent(pService, router, nav, sModal) {
        var _this = this;
        this.pService = pService;
        this.router = router;
        this.nav = nav;
        this.sModal = sModal;
        this.listOfComponent = [];
        this.listOfModelIndex = [];
        this.listOfFunctions = [];
        this.isEdit = false;
        this.notFound = false;
        this.query = '';
        this.filteredList = [];
        this.page = {
            id: -2,
            title: '',
            check: false,
            state: {},
            metaDesc: '',
            metaTag: '',
            slug: '',
            fileName: '',
            content: '',
            components: []
        };
        this.pService.getPageAtt().subscribe(function (data) {
            _this.listOfState = data.states;
        });
        this.pService.getComponentsFrom().subscribe(function (data) {
            _this.listOfComponent = data;
        });
        this.pService.getModelsFrom().subscribe(function (data) {
            _this.listOfModels = data;
        });
        this.sub = this.router.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.page = _this.pService.getPageByProperty('id', _this.id);
            if (_this.page != null) {
                _this.notFound = true;
                if (!utils_1.hasOwnProperty(_this.page, 'components')) {
                    _this.page['components'] = [];
                }
            }
            else {
                _this.nav.navigate(['/backend/not-found']);
            }
            _this.clonePage();
        });
    }
    PageComponent.prototype.ngOnInit = function () { };
    /**
     * This function pass into edit Mode
     */
    PageComponent.prototype.editMode = function () {
        //passa in modalità edit
        this.isEdit = !this.isEdit;
    };
    PageComponent.prototype.resetMode = function () {
        if (confirm('Do you want to reset all data?')) {
            this.cloneCopyPage();
        }
    };
    PageComponent.prototype.openModal = function (event, modal, item) {
        var _this = this;
        //Stop bubbling
        event.target.blur();
        event.preventDefault();
        //assign to ModelObject the item
        this.Function = item.functions;
        this.Model = { label: '', functions: [] };
        //transform List of Object in array
        for (var obj in this.listOfModels) {
            this.listOfModelIndex.push(this.listOfModels[obj]);
        }
        //Check if Model is present
        if (item.Object in this.listOfModels) {
            this.Model = this.listOfModels[item.Object];
        }
        //intialize listOfFunction, and if Model is not empty, assign it list of functions
        this.objectChange();
        //open a Bootstrap Modal.
        var mod = this.sModal.open(modal);
        //check action on Modal (save and close)
        mod.result.then(function (result) {
            if (result === 'SAVE_DATA') {
                for (var obj in _this.listOfModels) {
                    var Modello = _this.listOfModels[obj];
                    if (Modello.label === _this.Model.label) {
                        item.Object = obj;
                    }
                }
                item.functions = _this.Function;
            }
            else {
                item.Object = null;
                item.functions = null;
            }
        }, function (reason) {
            //reason is fired when modal is closed
            var result = console.log(_this.getDismissReason(reason));
            _this.Model = { label: '', functions: [] };
            //this.ModelObject = null;
            _this.Function = '';
        });
    };
    PageComponent.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    PageComponent.prototype.objectChange = function () {
        this.listOfFunctions = this.Model.functions;
    };
    PageComponent.prototype.eraseComponent = function (item) {
        var index = this.page.components.indexOf(item);
        if (index > -1) {
            this.page.components.splice(index, 1);
        }
    };
    PageComponent.prototype.addComponent = function (item) {
        var el = website_interfaces_1.createLtPageComponentFrom(item);
        this.page.components.push(el);
    };
    /**
     * This function filter permission for research
     */
    PageComponent.prototype.filter = function () {
        if (this.query !== "") {
            this.filteredList = this.listOfComponent.filter(function (el) {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
        else {
            this.filteredList = [];
        }
    };
    PageComponent.prototype.clonePage = function () {
        this.copyPage = Object.assign({}, this.page);
    };
    PageComponent.prototype.cloneCopyPage = function () {
        this.page = Object.assign({}, this.copyPage);
    };
    PageComponent.prototype.saveMode = function () {
        var _this = this;
        if (this.page.slug.length > 0) {
            this.pService.savePage(this.page).subscribe(function (page) {
                _this.page = page;
                _this.clonePage();
                _this.pService.updatePageInList(_this.page);
                _this.pService.updateListOfPages();
                _this.editMode();
            });
        }
        else {
            alert('The slug cannot be empty, please!');
            this.cloneCopyPage();
            return;
        }
    };
    PageComponent.prototype.keyupHandlerFunction = function (event) {
        this.page.content = event;
    };
    return PageComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof website_interfaces_1.Page !== "undefined" && website_interfaces_1.Page) === "function" && _a || Object)
], PageComponent.prototype, "page", void 0);
PageComponent = __decorate([
    core_1.Component({
        selector: 'wb-page',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/Page/page.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _b || Object, typeof (_c = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _c || Object, typeof (_d = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _d || Object, typeof (_e = typeof ng_bootstrap_1.NgbModal !== "undefined" && ng_bootstrap_1.NgbModal) === "function" && _e || Object])
], PageComponent);
exports.PageComponent = PageComponent;
var _a, _b, _c, _d, _e;
//# sourceMappingURL=page.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Pages/pages.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> Pages</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/website/menu']\" data-toggle=\"tab\"> Menu</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/website/components']\" data-toggle=\"tab\"> Component</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <lt-entry-pagination\n                                [entry]=\"'50-5'\"\n                                (onEntry)=\"onPerPage($event)\"\n                                >\n                                </lt-entry-pagination>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/website/pages/new']\"><i class=\"fa fa-file\"></i> New</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deletePages()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Title</a>\n                                        </th>\n                                        <th>\n                                            Slug\n                                        </th>\n                                        <th style=\"width: 50px;\" colspan=\"2\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let page of listToShow\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,page)\" [(ngModel)] = \"page.check\">\n                                        </td>\n                                        <td>\n                                            {{page.title}}\n                                        </td>\n                                        <td>\n                                            {{page.slug}}\n                                        </td>\n                                        <td width=\"38px\">\n                                            <a [routerLink] = \"['/backend/website/pages',page.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px; text-align: center;\"></i></a>\n                                        </td>\n                                        <td width=\"38px\">\n                                            <a (click)=\"reBuild(page.id)\"><i class=\"fa fa-building-o\" style=\"color:green; font-size: 16px; text-align: center; cursor: pointer;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <lt-pagination\n                            [pagesToShow]=\"3\"\n                            [perPage]=\"perPage\"\n                            [count]=\"listaPages.length\"\n                            [loading]=\"false\"\n                            [page]=\"actualPage\"\n                            (goNext)=\"onNext($event)\"\n                            (goPage)=\"onPage($event)\"\n                            (goPrev)=\"onPrev()\"\n                        ></lt-pagination>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Pages/pages.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var list_component_1 = __webpack_require__("./src/model/list.component.ts");
var PagesComponent = (function (_super) {
    __extends(PagesComponent, _super);
    function PagesComponent(wb_Service, router) {
        var _this = _super.call(this) || this;
        _this.wb_Service = wb_Service;
        _this.router = router;
        _this.listaPages = [];
        _this.myRoot = '/backend/website/pages';
        _this.isRoot = false;
        _this.onComponentInit({
            name: 'wb_Service',
            permission: 'Hardel.Website.Pages',
            upd: 'updatePages$'
        }, 'router', 'retrieveListOfPages');
        return _this;
    }
    PagesComponent.prototype.ngOnInit = function () { };
    PagesComponent.prototype.retrieveListOfPages = function () {
        this.retrieveListOfData({
            name: 'wb_Service',
            getData: 'getPages',
            setData: 'setPages',
            callApi: 'getPagesFrom',
            check: 'checkPagesExist'
        }, 'listaPages');
    };
    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    PagesComponent.prototype.eventChange = function (ev, data) {
        this.eventChangeData(ev, data);
    };
    PagesComponent.prototype.deletePages = function () {
        this.deleteData({
            name: 'wb_Service',
            setData: 'setPages',
            delFn: 'deletePages'
        }, 'listaPages', "Do you really want delete this Pages?");
    };
    PagesComponent.prototype.reBuild = function (idPage) {
        console.log(idPage);
        this.wb_Service.rebuildPage(idPage).subscribe(function (data) {
            alert(data);
        });
    };
    return PagesComponent;
}(list_component_1.ListComponent));
PagesComponent = __decorate([
    core_1.Component({
        selector: 'wb-pages',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/Pages/pages.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], PagesComponent);
exports.PagesComponent = PagesComponent;
var _a, _b;
//# sourceMappingURL=pages.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 13/11/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var website_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/website.component.ts");
exports.WebsiteComponent = website_component_1.WebsiteComponent;
var pages_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/Pages/pages.component.ts");
exports.PagesComponent = pages_component_1.PagesComponent;
var pagenew_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/NewPage/pagenew.component.ts");
exports.PageNewComponent = pagenew_component_1.PageNewComponent;
var page_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/Page/page.component.ts");
exports.PageComponent = page_component_1.PageComponent;
var components_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/Components/components.component.ts");
exports.ComponentsComponent = components_component_1.ComponentsComponent;
var componentnew_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/NewComponent/componentnew.component.ts");
exports.NewComponent = componentnew_component_1.NewComponent;
var component_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/Component/component.component.ts");
exports.ComponentComponent = component_component_1.ComponentComponent;
var menus_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/Menus/menus.component.ts");
exports.MenusComponent = menus_component_1.MenusComponent;
var menunew_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/NewMenu/menunew.component.ts");
exports.MenuNewComponent = menunew_component_1.MenuNewComponent;
var menu_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/Menu/menu.component.ts");
exports.MenuComponent = menu_component_1.MenuComponent;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/website.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Website</h1>\n        <breadcrumbs></breadcrumbs>\n    </div>\n    <div class=\"content\">\n        <router-outlet></router-outlet>\n        <div class=\"portlet\" *ngIf=\"isRoot === true\">\n            <div class=\"portlet-title\">\n                <div class=\"caption\">\n                    <i class=\"fa fa-database\"></i>\n                    <span>Overviews</span>\n                </div>\n                <div class=\"actions\">\n                </div>\n            </div>\n            <div class=\"portlet-body\">\n                <div class=\"tiles\">\n                    <a [routerLink]=\"['/backend/website/pages']\">\n                        <div class=\"tile double bg-cyan\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-clone fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Pages\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                    <a [routerLink]=\"['/backend/website/menu']\">\n                        <div class=\"tile bg-orange\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-list fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Menu\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                    <a [routerLink]=\"['/backend/website/components']\">\n                        <div class=\"tile bg-lightgreen\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-cubes fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Component\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/website.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var WebsiteComponent = (function () {
    function WebsiteComponent(r) {
        var _this = this;
        this.r = r;
        this.myRoot = '/backend/website';
        this.isRoot = true;
        this.r.events.subscribe(function (val) {
            if (val instanceof router_1.NavigationEnd) {
                if (_this.myRoot === val.url) {
                    _this.isRoot = true;
                }
                else {
                    _this.isRoot = false;
                }
            }
        });
    }
    WebsiteComponent.prototype.ngOnInit = function () { };
    return WebsiteComponent;
}());
WebsiteComponent = __decorate([
    core_1.Component({
        selector: 'app-website',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/website.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object])
], WebsiteComponent);
exports.WebsiteComponent = WebsiteComponent;
var _a;
//# sourceMappingURL=website.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/website.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_routing_1 = __webpack_require__("./src/plugins/Hardel/Website/website.routing.ts");
var breadcrumbs_module_1 = __webpack_require__("./src/app/backend-module/breadcrumbs/breadcrumbs.module.ts");
var common_1 = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var editor_1 = __webpack_require__("./src/app/backend-module/Editor/editor.ts");
var uielement_module_1 = __webpack_require__("./src/app/backend-module/UIElement/uielement.module.ts");
var lt_codemirror_1 = __webpack_require__("./node_modules/lt-codemirror/lib/index.js");
var lt_treeview_1 = __webpack_require__("./node_modules/lt-treeview/lt-treeview.es5.js");
var ng_bootstrap_1 = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var WebsiteModule = (function () {
    function WebsiteModule() {
    }
    return WebsiteModule;
}());
WebsiteModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            website_routing_1.routing,
            breadcrumbs_module_1.BreadCrumbModule,
            editor_1.EditorModule,
            uielement_module_1.UIElementModule,
            lt_codemirror_1.CodemirrorModule,
            lt_treeview_1.LtTreeviewModule,
            ng_bootstrap_1.NgbModule.forRoot(),
        ],
        providers: [website_service_1.WebsiteService],
        declarations: [website_routing_1.websiteComponent]
    })
], WebsiteModule);
exports.WebsiteModule = WebsiteModule;
//# sourceMappingURL=website.module.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/website.routing.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var WB = __webpack_require__("./src/plugins/Hardel/Website/component/index.ts");
var routes = [
    { path: '', component: WB.WebsiteComponent, data: { breadcrumb: 'Website' }, children: [
            { path: 'pages', component: WB.PagesComponent, data: { breadcrumb: 'Pages' }, children: [
                    { path: 'new', component: WB.PageNewComponent, data: { breadcrumb: 'New' } },
                    { path: ':id', component: WB.PageComponent, data: { breadcrumb: 'Page' } }
                ] },
            { path: 'components', component: WB.ComponentsComponent, data: { breadcrumb: 'Components' }, children: [
                    { path: 'new', component: WB.NewComponent, data: { breadcrumb: 'New' } },
                    { path: ':id', component: WB.ComponentComponent, data: { breadcrumb: 'Component' } }
                ] },
            { path: 'menu', component: WB.MenusComponent, data: { breadcrumb: 'Menus' }, children: [
                    { path: 'new', component: WB.MenuNewComponent, data: { breadcrumb: 'New' } },
                    { path: ':id', component: WB.MenuComponent, data: { breadcrumb: 'Menu' } }
                ] }
        ] }
];
exports.routing = router_1.RouterModule.forChild(routes);
exports.websiteComponent = [
    WB.WebsiteComponent,
    WB.PagesComponent,
    WB.PageNewComponent,
    WB.PageComponent,
    WB.ComponentsComponent,
    WB.NewComponent,
    WB.ComponentComponent,
    WB.MenusComponent,
    WB.MenuNewComponent,
    WB.MenuComponent,
];
//# sourceMappingURL=website.routing.js.map

/***/ })

});
//# sourceMappingURL=0.chunk.js.map