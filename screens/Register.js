import { View, TextInput, Button, Alert } from 'react-native';
import React, {Component} from 'react';


class Register extends Component {
    constructor(props){
      super(props)

      this.RegisterAccount = this.RegisterAccount.bind(this);
  
      this.state = {
        family: '',
        username: '',
        password: '',
        email: ''
      };
    }

    // makes post request to given uri with the states defined above 
    RegisterAccount() {
      console.log("Function called")
      //craft json data
      const JSONdata = {
        given_name: this.state.username,
        family_name: this.state.family,
        email: this.state.email,
        password: this.state.password
      }
      
      const POSTdata = JSON.stringify(JSONdata);
      
      console.log(POSTdata);
      return fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: POSTdata
        }).then((response) => {
          Alert.alert("Account Created!")
          this.props.navigation.navigate('Login')
        }).catch((error) => {
          console.log(error);
        });
      }
      
      render(){
      // renders 4 text inputs for the username and password of the user and creates a register button to navigate to the register page.
        return(
          <View>
          <TextInput type='text' placeholder='Email' onChangeText={(email) => this.setState({email})}></TextInput>
          <TextInput type='text' placeholder='Username' onChangeText={(username) => this.setState({username})}></TextInput>
          <TextInput type='text' placeholder='Family Name' onChangeText={(family) => this.setState({family})}></TextInput>
          <TextInput type='password' placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({password})}></TextInput>
          <Button
          title="Register"
          onPress={this.RegisterAccount}
          ></Button>
          </View>
        );
      }
  
  
  }

export default Register;