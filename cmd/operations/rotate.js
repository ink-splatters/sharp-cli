/*!
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Mark van Seventer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// @see https://sharp.pixelplumbing.com/api-operation#rotate

// Strict mode.
'use strict'

// Local modules.
const queue = require('../../lib/queue')

// Configure.
const positionals = {
  angle: {
    defaultDescription: 'auto',
    desc: 'Angle of rotation',
    type: 'number'
  }
}

const options = {
  background: {
    defaultDescription: '#000000',
    desc: 'String parsed by the color module to extract values for red, green, blue and alpha',
    type: 'string'
  }
}

// Command builder.
const builder = (yargs) => {
  const optionNames = Object.keys(options)
  return yargs
    .strict()
    .epilog('For more information on available options, please visit https://sharp.pixelplumbing.com/api-operation#rotate')
    .example('$0 rotate', 'The output will be auto-rotated using EXIF Orientation tag')
    .positional('angle', positionals.angle)
    .options(options)
    .group(optionNames, 'Command Options')
}

// Command handler.
const handler = (args) => {
  return queue.push(['rotate', (sharp) => sharp.rotate(args.angle, { background: args.background })])
}

// Exports.
module.exports = {
  command: 'rotate [angle]',
  describe: 'Rotate the output image',
  builder,
  handler
}
