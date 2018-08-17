import PropTypes from 'prop-types';
import React from 'react';
import isEmail from 'validator/lib/isEmail';

module.exports = class extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.value,
    error: false,
  };

  componentWillReceiveProps(update) {
    this.setState({ value: update.value });
  }

  validate = (name,value) => {
    console.log(name)
    console.log(value)
    var valid = true;
    if(name==='email'){
        if(!isEmail(value)){
          return 'Invalid email'
        }else{
          return valid
        }
    }else{
      if(value === '1'){
          return 'cannot be 1'
      }else if(value===""){
          return 'cannot be empty'
      }else{
         return valid
      }
    }
  }

  onChange = (evt) => {

    const name = this.props.name;
    const value = evt.target.value;
    const error = this.validate(name,value)

    this.setState({ value, error });
    //call back
    this.props.onChange({ name, value, error });

  };

  render() {
    return (
      <div>
        <input
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.onChange}
        />
        <span style={{ color: 'red' }}>{ this.state.error }</span>
      </div>
    );
  }
};
