import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Message } from 'semantic-ui-react'

import { getConnectedCorrectNetwork, hasWeb3 } from '../features/user/reducers'
import { NETWORK_NAME } from '../features/user/network'

export class MetaMaskWarning extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { hasWeb3, correctNetwork } = this.props

    return (
      <div>
        <Grid>
          <Grid.Column>
            <Grid.Row className="margin-bottom-rem">
              {(!hasWeb3 || !correctNetwork) && (
                <Message>
                  <Message.Item>
                    If you don't have it installed, please install{' '}
                    <a target="_blank" href="https://metamask.io/">
                      MetaMask
                    </a>{' '}
                    and connect to {NETWORK_NAME}
                  </Message.Item>
                </Message>
              )}
              {/*{hasWeb3 &&*/}
              {/*!correctNetwork && (*/}
              {/*<Message>*/}
              {/*<Message.Item>*/}
              {/*It seems like you have MetaMask installed but you are not*/}
              {/*connected to the right network*/}
              {/*</Message.Item>*/}
              {/*<Message.Item>*/}
              {/*Please connect to {NETWORK_NAME}*/}
              {/*</Message.Item>*/}
              {/*</Message>*/}
              {/*)}*/}
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  hasWeb3: hasWeb3(state),
  correctNetwork: getConnectedCorrectNetwork(state)
})

export default connect(mapStateToProps, null)(MetaMaskWarning)
