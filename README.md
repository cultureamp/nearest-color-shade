# Nearest Color Shade

Snaps a CSS color value to a set of brand colours and identifies the required tint (added white) or shade (added black) to achieve the best match.

## Installation

```
npm install -g nearest-color-shade
```

## Usage

From the command line:

```
$ nearest-color-shade "#ff0000"
{ color: '$ca-palette-coral', tint: 0.3 }
```

In Node:

```javascript
var nearest = require('nearest-color-shade');
var Color = require('color');
var colors = {
  brandRed: Color('red'),
  brandGreen: Color('green'),
  brandBlue: Color('blue'),
};

nearest(colors, Color('#FF8080'));
// => { color: 'brandRed', tint: 0.5 }
```

## Configuration

Out of the box, nearest-color-shade's command line interface is configured with [Culture Amp's brand colors][ca-colors], but you can override this with a nearest-color.json in your home directory.

```json
{
  "brandRed": "#FF0000",
  "brandGreen": "#00FF00",
  "brandBlue": "#0000FF"
}
```

## Why does this exist?

Culture Amp Front End engineers often receive designs with exact color values, but our style guide requires that these be implemented as a pure brand color plus a percentage of white or black.

This tool makes it easy to identify the intended implementation for a specified output color.

[ca-colors]: https://cultureamp.github.io/cultureamp-style-guide/visuals/colors/
