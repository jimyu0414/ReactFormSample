import React from 'react';
import isEmail from 'validator/lib/isEmail';

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "03-basic-input";

  state ={
    people:[
      {
        name:'Jimmy lu',
        email:'jimyu0414@gmail.com'
      },
      {
        name:'Caroline Green',
        email:'Caroline@justgroup.com.au'
      }
    ],
    fieldErrors: {
      name:'',
      email:''
    },
  }

  onFormSubmit = (evt) => {
    evt.preventDefault();
    let fullName = this.refs.firstname.value +" "+ this.refs.lastname.value
    var onePerson = {
          name:'',
          email:''
        }
    onePerson.name = fullName;
    onePerson.email = this.refs.email.value
    const fieldErrors = this.validate(onePerson);
    console.log(Object.keys(fieldErrors).length);
    if (Object.keys(fieldErrors).length > 0) return;


      const peopleList = this.state.people.concat(onePerson)
      this.setState(
        {
            people: peopleList,
        }
      )

      this.refs.firstname.value = ''
      this.refs.lastname.value= ''
      this.refs.email.value=''


  };

  validate = (person) => {
    console.log(person)
    const fullname = person.name.trim();
    const errors={}
    if (!person.email){
      errors.email = 'Required Email';
      this.setState({
        fieldErrors: errors
      })
    }
    if (person.email && !isEmail(person.email))
    errors.email = 'Invalid Email';
    this.setState({
      fieldErrors: errors
    })
    if (!fullname)
    errors.name = 'Name Required';
    this.setState({
      fieldErrors: errors
    })
    console.log(errors)
    return errors
  }

  render() {

    const nameList = this.state.people.map((person,i) =>
      <Name
        key={i}
        number={i}
        name={person.name}
        email={person.email}
      />
    )

    return (

      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input style={{ marginRight : 5, marginBottom: 5 }}
            placeholder='FirstName'
            ref='firstname'
          />
          <input style={{marginRight: 5}}
            placeholder='LastName'
            ref='lastname'/>

            <input style={{ marginBottom : 5 }}
              placeholder='email'
              ref='email'
            />
            <br />
          <span style={{ color: 'red' , marginRight: 15}}>{this.state.fieldErrors.name}</span>
          <span style={{ color: 'red' , marginBottom: 10}}>{this.state.fieldErrors.email}</span>
          <br/>
      <div>
          <input type='submit' />
        </div>
        </form>

        <ul>
          <h1 style={{ marginLeft : -35 }}>Here below are  the sign up List</h1>
          {nameList}
        </ul>

      </div>
    );
  }
};

class Name extends React.Component{
  render(){
    let count = this.props.number + 1;
    return(
        <li>{count}: &nbsp; {this.props.name} &nbsp; ------{this.props.email}</li>
    )
  }
}
