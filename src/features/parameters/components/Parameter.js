import React, { Component } from 'react'
import { Button, Form, Input, List } from 'semantic-ui-react'

import BigNumber from 'bignumber.js'

import { constructClientParameterDetails } from '../operations/constructClientParameterDetails'

export class Parameter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      voteValue: '',
      disabled: true,
      submitColor: 'grey'
    }
  }

  componentDidMount() {
    this.setState({
      paramValue: this.props.param.value,
      maxValidInput: new BigNumber(this.props.param.value).times(2)
    })
  }

  submitVote(vote, e) {
    e.preventDefault()
    const title = this.props.param.title
    this.props.voteOnParameter({ title, vote })
    this.setState({
      disabled: true,
      submitColor: 'grey'
    })
  }

  onChangeVoteValue = ({ target: { value: voteValue } }) => {
    if (voteValue === '') this.setState({ voteValue })
    const voteValueNumeric = /^-?\d*\.?\d*$/.test(voteValue)

    let voteValueWithinValidRange
    if (voteValueNumeric && voteValue !== '')
      voteValueWithinValidRange = new BigNumber(voteValue).lte(
        this.state.maxValidInput
      )
    if (voteValueNumeric && voteValueWithinValidRange)
      this.setState({
        voteValue,
        submitColor: 'green',
        disabled: false
      })
    else
      this.setState({
        submitColor: 'grey',
        disabled: true
      })
    this.setState({
      voteValue
    })
  }

  render() {
    const { param } = this.props
    const { disabled, submitColor, voteValue } = this.state

    const p = constructClientParameterDetails(param)

    return (
      <div id="parameter-list-item">
        <List.Item>
          <List.Content>
            <div>
              <div className="parameter-title-value">
                <h2>{p.title}</h2>
                <h4 className="parameter-value-current">
                  Current Value: {p.value}
                </h4>
              </div>
              <div className="parameter-voting">
                <Button.Group>
                  <Button
                    className="button-parameter"
                    id="downvote"
                    size="small"
                    basic
                    onClick={e => this.submitVote(-1, e)}
                  >
                    Min
                  </Button>
                  <Button
                    className="button-parameter"
                    id="upvote"
                    basic
                    onClick={e => this.submitVote(1, e)}
                  >
                    Max
                  </Button>
                </Button.Group>
                <form
                  onSubmit={e => this.submitVote(voteValue, e)}
                  className="parameter-voting-value"
                >
                  <Form.Group inline>
                    <label className="parameter-voting-label">Your vote:</label>
                    <Input
                      type="text"
                      onChange={this.onChangeVoteValue}
                      value={voteValue}
                    />
                    <Button
                      disabled={disabled}
                      className="parameter-value-button"
                      color={submitColor}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form.Group>
                </form>
              </div>
            </div>
          </List.Content>
        </List.Item>
        {/*language=CSS*/}
        <style global jsx>{`
          .button-parameter {
            border: 1px solid lightgray !important;
          }

          .parameter-title-value {
            float: left !important;
            width: 440px;
          }

          .parameter-voting {
            margin: 5px 0 0 480px;
            padding-left: 20px;
            display: flex;
            align-items: center;
          }

          .parameter-value-current {
            margin-top: 5px;
          }

          #parameter-list-item {
            border: 1px solid lightgray;
            border-radius: 3px 3px 3px 3px;
            -moz-border-radius: 3px 3px 3px 3px;
            -webkit-border-radius: 3px 3px 3px 3px;
            padding: 20px;
            min-height: 6.5rem;
            display: flex;
            align-items: center;
            margin-top: 15px;
          }

          .parameter-voting-value {
            margin-left: 20px;
          }

          .parameter-voting-value input {
            width: 130px;
          }

          .parameter-voting-label {
            padding: 0 10px;
          }

          .parameter-value-button.ui.button {
            margin-left: 10px;
          }
        `}</style>
      </div>
    )
  }
}
