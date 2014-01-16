# global describe, it
'use strict'

define ['app'], (app) ->

  describe 'Give it some context', ->
    it 'should run here few assertions', ->
      expect(app.answer).to.eql(42)
