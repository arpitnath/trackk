const expect = require('chai').expect

describe('Dummy Test', () => {
  it('should succeed', (done) => {
    setTimeout(done, 1000)
  })

  it('dummy test should pass', () => {
    const dummy = true

    expect(dummy).to.be.true
  })

  it('dummy test should fail', () => {
    const dummy = false

    expect(dummy).to.be.true
  })
})
