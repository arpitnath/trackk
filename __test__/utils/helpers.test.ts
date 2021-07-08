// const expect = require('chai').expect
import { expect } from 'chai'

describe('Dummy Helpers Test', () => {
  let listOfNames
  before(() => {
    listOfNames = ['arpit', 'mohaaan']
  })

  it('should generate 2 names', async () => {
    const limitOfNames = 2

    expect(listOfNames.length).to.be.equal(limitOfNames)
  })
})
