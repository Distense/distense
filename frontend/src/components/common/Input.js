import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class Input extends Component {
  static propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    isMultiline: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    updateValue: PropTypes.func,
    onBlur: PropTypes.func,
    isSearch: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      timeoutID: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleOnChange = (e) => {
    const newValue = e.target.value;
    this.props.onChange(newValue);
    this.setState({ value: newValue });
  };

  handleOnBlur = () => {
    this.props.onChange(this.state.value);
    this.props.onBlur && this.props.onBlur();
  };

  handleClear = () => {
    this.setState({ value: '' });
    this.props.onChange('');
  };

  render() {
    const { type, className, isSearch, isMultiline } = this.props; // eslint-disable-line no-unused-vars
    const { value } = this.state;

    return (
      <div className={classNames('input')} >
        {!isMultiline &&
        <input
          className={classNames('box', className, { 'search-input': isSearch })}
          type={type}
          value={value}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        }
        {isMultiline &&
        <textarea
          className="box"
          value={value}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        }
      </div>
    );
  }
}