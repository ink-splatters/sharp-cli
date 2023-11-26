/* global describe, it, beforeEach, afterEach */
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

// @see https://sharp.pixelplumbing.com/api-operation#normalise

// Strict mode.
'use strict'

// Package modules.
const expect = require('must')
const sinon = require('sinon')
const Yargs = require('yargs')

// Local modules.
const normalise = require('../../../cmd/operations/normalise')
const queue = require('../../../lib/queue')
const sharp = require('../../mocks/sharp')

// Test suite.
;['normalise', 'normalize'].forEach((alias) => {
  describe(alias, () => {
    const cli = (new Yargs()).command(normalise)

    // Reset.
    afterEach('queue', () => queue.splice(0))
    afterEach('sharp', sharp.prototype.reset)

    describe('..', () => {
      // Run.
      beforeEach((done) => cli.parse([alias], done))

      // Tests.
      it('must update the pipeline', () => {
        expect(queue.pipeline).to.have.length(1)
        expect(queue.pipeline).to.include('normalise')
      })
      it('must execute the pipeline', () => {
        const pipeline = queue.drain(sharp())
        sinon.assert.called(pipeline.normalise)
      })
    })

    describe('[options]', () => {
      describe('--lower', () => {
        // Default lower.
        const lower = 25

        // Run.
        beforeEach((done) => cli.parse([alias, '--lower', lower], done))

        // Tests.
        it('must set the lower flag', () => {
          expect(cli.parsed.argv).to.have.property('lower', lower)
        })
        it('must update the pipeline', () => {
          expect(queue.pipeline).to.have.length(1)
          expect(queue.pipeline).to.include('normalise')
        })
        it('must execute the pipeline', () => {
          const pipeline = queue.drain(sharp())
          sinon.assert.calledWithMatch(pipeline.normalise, { lower })
        })
      })

      describe('--upper', () => {
        // Default upper.
        const upper = 25

        // Run.
        beforeEach((done) => cli.parse([alias, '--upper', upper], done))

        // Tests.
        it('must set the upper flag', () => {
          expect(cli.parsed.argv).to.have.property('upper', upper)
        })
        it('must update the pipeline', () => {
          expect(queue.pipeline).to.have.length(1)
          expect(queue.pipeline).to.include('normalise')
        })
        it('must execute the pipeline', () => {
          const pipeline = queue.drain(sharp())
          sinon.assert.calledWithMatch(pipeline.normalise, { upper })
        })
      })
    })
  })
})
