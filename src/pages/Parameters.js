import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  Form,
  Grid,
  List,
  Message,
  Segment
} from 'semantic-ui-react'

import { voteOnParameter } from '../actions/parameters'
import { getParameters } from '../reducers/parameters'

import Head from '../components/common/Head'
import Layout from '../components/Layout'
import { constructParameterClientDetails } from '../shared'


class Parameters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parameters: this.props.parameters || [],
      parameterValue: ''
    }
  }

  componentDidMount() {
    this.paramTimeout = setTimeout(() => {
      this.setState({
        loading: false,
        parameters: this.props.parameters
      })
    }, 2000)
  }

  componentWillUnmount() {
    clearTimeout(this.paramTimeout)
  }

  handleInputChange(event) {
    const target = event.target
    const name = target.name
    const value = target.value

    if (value.length < 3)
      this.setState({
        [name]: value
      })
  }

  onSubmit = async e => {
    e.preventDefault()

    const title = this.target.name
    const newValue = this.target.value
    this.props.voteOnParameter({ title, newValue })
    this.setState({
      redirect: true
    })
  }

  render() {
    const { parameters } = this.props
    const { parameterValue } = this.state

    return (
      <Layout>
        <Head title="Votable Parameters"/>
        <Message>
          <Message.Header>
            Parameters
          </Message.Header>
          <List bulleted>
            <List.Item>
              This page displays the parameters of Distense and their current values
            </List.Item>
            <List.Item>
              Youu must own DID to vote
            </List.Item>
            <List.Item>
              The maximum vote is twice the current value
            </List.Item>
            <List.Item>
              Basically the maximum you can change the value is by the percentage of DID you own
            </List.Item>
            <List.Item>
              We should probably just have up or down buttons here
            </List.Item>
          </List>
        </Message>
        <Grid.Row>
          <Card.Group>
            {parameters.length > 0 ? (
              parameters.map((parameter, i) => (
                <Parameter
                  key={i}
                  param={parameter}
                  onChange={this.handleInputChange}
                  onSubmit={this.onSubmit}
                  parameterValue={parameterValue}
                />
              ))
            ) : (
              <Segment>Loading Distense parameters...</Segment>
            )}
          </Card.Group>
        </Grid.Row>
        {/*language=CSS*/}
        <style global jsx>{`

          .parameter-card-width {
            width: 366px !important;
          }
        `}</style>
      </Layout>

    )
  }
}

const Parameter = ({ param }) => {

  const p = constructParameterClientDetails(param)

  return (
    <Card className='parameter-card-width' raised>
      <Card.Content>
        <Card.Header>
          {p.title}
        </Card.Header>
        <Card.Meta>
          {p.placeholder}
        </Card.Meta>
        <Form>
          <Form.Group size="small">
            <Form.Input
              placeholder=''
              type="text"
              value={p.parameterValue}
            />
            <Form.Button basic color="green" compact={true}>
              Vote
            </Form.Button>
          </Form.Group>
        </Form>
        <Card.Content>
          Current Value: {p.value}
        </Card.Content>
        {/*<Card.Content extra>*/}
          {/*<Button.Group>*/}
            {/*<Button basic color='red'>Max Down</Button>*/}
            {/*<Button basic color='green'>Max Up</Button>*/}
          {/*</Button.Group>*/}
        {/*</Card.Content>*/}
      </Card.Content>
    </Card>
  )
}

const mapStateToProps = state => ({
  parameters: getParameters(state)
})

const mapDispatchToProps = dispatch => ({
  voteOnParameter: vote => dispatch(voteOnParameter(vote))
})

export default connect(mapStateToProps, mapDispatchToProps)(Parameters)
