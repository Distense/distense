const assertJump = function(error) {
  assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
}
const SafeMath = artifacts.require('SafeMath')
const SafeMathMock = artifacts.require("./helpers/SafeMathMock");


contract('SafeMath', function(accounts) {

  let safeMath;

  before(async function() {
    safeMath = await SafeMathMock.new();
  });

  it('calculates percentages correctly',  async () => {

    let num = 10
    let denom = 100
    let percent = await safeMath.percent(num, denom, 2)
    let result = await safeMath.result();
    assert.equal(result, 10)

    num = 10
    denom = 100
    await safeMath.percent(num, denom, 4)
    result = await safeMath.result();
    assert.equal(result, 1000)

    num = 16
    denom = 100
    await safeMath.percent(num, denom, 4)
    result = await safeMath.result();
    assert.equal(result, 1600)

    num = 49
    denom = 100
    await safeMath.percent(num, denom, 0)
    result = await safeMath.result();
    assert.equal(result, 0)

    num = 1000
    denom = 100
    await safeMath.percent(num, denom, 4)
    result = await safeMath.result();
    assert.equal(result, 100000)

    num = 100
    denom = 100
    await safeMath.percent(num, denom, 2)
    result = await safeMath.result();
    assert.equal(result, 100)

  })

  it("multiplies correctly", async function() {
    let a = 5678;
    let b = 1234;
    let mult = await safeMath.multiply(a, b);
    let result = await safeMath.result();
    assert.equal(result, a*b);
  });

  it("adds correctly", async function() {
    let a = 5678;
    let b = 1234;
    let add = await safeMath.add(a, b);
    let result = await safeMath.result();

    assert.equal(result, a+b);
  });

  it("subtracts correctly", async function() {
    let a = 5678;
    let b = 1234;
    let subtract = await safeMath.subtract(a, b);
    let result = await safeMath.result();

    assert.equal(result, a-b);
  });

  it("should throw an error if subtraction result would be negative", async function () {
    let a = 1234;
    let b = 5678;
    try {
      let subtract = await safeMath.subtract(a, b);
      assert.fail('should have thrown before');
    } catch(error) {
      assertJump(error);
    }
  });

  it("should throw an error on addition overflow", async function() {
    let a = 115792089237316195423570985008687907853269984665640564039457584007913129639935;
    let b = 1;
    try {
      let add = await safeMath.add(a, b);
      assert.fail('should have thrown before');
    } catch(error) {
      assertJump(error);
    }
  });

  it("should throw an error on multiplication overflow", async function() {
    let a = 115792089237316195423570985008687907853269984665640564039457584007913129639933;
    let b = 2;
    try {
      let multiply = await safeMath.multiply(a, b);
      assert.fail('should have thrown before');
    } catch(error) {
      assertJump(error);
    }
  });

});
