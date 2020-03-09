import { View, TextInput, Button, json } from 'react-native';
import React, {Component} from 'react';

class Register extends Component {
    constructor(props){
      super(props)

      this.POSTData = this.POSTData.bind(this)
  
      this.state = {
        family: '',
        username: '',
        password: '',
        email: ''
      };
    }
    // makes post request to given uri with the states defined above 
    POSTData(){
      return fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: json.Stringify ({
            'given_name': this.state.username,
            'family_name': this.state.family,
            'email': this.state.email,
            'password': this.state.password
        }),
      }).catch((error) =>{
          console.log(error);
        });
      }
      
      render(){
      // renders 4 text inputs for the username and password of the user and creates a register button to navigate to the register page.
        return(
          <View>
          <TextInput onChangeText={text => this.setState({email: text})}>Email: </TextInput>
          <TextInput onChangeText={text => this.setState({username: text})}>Username: </TextInput>
          <TextInput onChangeText={text => this.setState({family: text})}>Family Name: </TextInput>
          <TextInput onChangeText={text => this.setState({password: text})}>Password: </TextInput>
          <Button
          title="Register"
          onClick={()=> this.props.navigation.navigate('Login') }
          onClick={()=> {this.POSTData();}}></Button>
          </View>
        );
      }
  
  
  }

export default Register;