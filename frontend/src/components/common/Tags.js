import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'

export default class Tags extends Component {
  constructor(props) {
    super(props)
    this.createTagsList = this.createTagsList.bind(this)
  }

  createTagsList() {
    return this.props.tags.map((tag) => {
      console.log(`${tag}`);
      return <Label
        size='tiny'
        key={tag}
      >
        {tag}
      </Label>
    })
  }

  render() {
    return (
      <span>
        {this.createTagsList()}
      </span>
    );
  }
}
