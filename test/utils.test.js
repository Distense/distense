import { expect } from 'chai'

import { convertDIDRewardToEtherReward } from '../src/utils'

describe('calculateNumEtherReward', () => {
  it('correctly calculates the number of ether based on the value of didPerEther', () => {
    const didReward = 983
    const didPerEther = 1000
    const etherReward = convertDIDRewardToEtherReward(didReward, didPerEther)
    expect(etherReward).to.equal('0.983')
  })

  it('correctly calculates the number of ether based on the value of didPerEther', () => {
    const didReward = 983
    const didPerEther = 797
    const etherReward = convertDIDRewardToEtherReward(didReward, didPerEther)
    expect(etherReward).to.equal('1.233')
  })

  it('correctly calculates the number of ether based on the value of didPerEther', () => {
    const didReward = 701
    const didPerEther = 797
    const etherReward = convertDIDRewardToEtherReward(didReward, didPerEther)
    expect(etherReward).to.equal('0.879')
  })
})
