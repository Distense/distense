import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'

export default class extends Component {
  constructor(props) {
    super(props)
    this.createTagsList = this.createTagsList.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.tags !== nextProps.tags
  }

  createTagsList() {
    return this.props.tags.map(tag => {
      return (
        <Label size="tiny" key={tag}>
          {tag}
        </Label>
      )
    })
  }

  render() {
    if (this.props.tags && this.props.tags.length > 0)
      return <span>{this.createTagsList()}</span>
    else return <span />
  }
}
