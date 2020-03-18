import { Text,Alert,View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
    constructor(props){
      super(props)
      
      this.login = this.login.bind(this)
      this.storeCreds = this.storeCreds.bind(this);

      this.state = {
        username: '',
        password: '',
        id: '',
        token: '',
      };
    }

    // async function to store the creds to the asyncstorage
    async storeCreds(){
      try{
        let id = this.state.id;
        let token = this.state.token;

        await AsyncStorage.removeItem('id');
        await AsyncStorage.removeItem('X-Authorization');

        console.log("Storing our ID and Tokens now: "+ id + " " + token);

        await AsyncStorage.setItem('id', id.toString());
        await AsyncStorage.setItem('X-Authorization', token.toString());

        this.props.navigation.navigate('HomePage');
      }
      catch(error){
        console.log("Error within Async: "+error);
        Alert.alert("There was an issue with logging in, please try again!");
      }
    }

    // makes post request to given uri with the states defined above 
    login(){
      const JSONdata = {
        email: this.state.email,
        password: this.state.password
      }

      const POSTdata = JSON.stringify(JSONdata);

      console.log("sending request with this data: "+ POSTdata)
        return fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: POSTdata
        })
          .then((response) => {
              if(response.status != 200)
              {
                throw("Response error: " + response.status);
              }
              return response.json();
            })
            .then((responseJson) => {
              this.setState({
                id:responseJson.id,
                token: responseJson.token
              });
              console.log("Attempting to store authkeys...")
              this.storeCreds();
            }).catch((error) => {
                console.log(error);
            });
      }

      render(){
      // renders 2 text inputs for the username and password of the user and creates a login button which calls the function above to authenticate against the database
        return(
          <View>
          <TextInput style={styles.TextInputStyle} type='text' placeholder='Email' onChangeText={(email) => this.setState({email})}></TextInput>
          <TextInput style={styles.TextInputStyle} type='password' placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({password})}></TextInput>
          <TouchableOpacity
          style={styles.LoginButton}
          title = "Login"
          onPress = {this.login}
          ><Text style={styles.ButtonTextStyle}>Login</Text></TouchableOpacity>
          <TouchableOpacity
          style={styles.RegisterButton}
          title="Register"
          onPress={()=>this.props.navigation.navigate('Register')}>
          <Text style={styles.ButtonTextStyle}>Need an Account?</Text>
          </TouchableOpacity>
          </View>
        );
      }
  
  }

  const styles = StyleSheet.create({

    TextInputStyle:{
      textAlign: 'center',
      height: 50,
      borderWidth: 2,
      borderColor:'#202646',
      borderRadius: 20,
      backgroundColor: '#ffffff',
      marginHorizontal: 40,
      marginTop:20,
    },
    ButtonTextStyle:{
      alignItems: 'center',
      justifyContent: 'center',
      fontSize:20,
      textAlign: 'center',
      color:'#ffffff',
    },
    RegisterButton: {
      flex:1,
      justifyContent: 'center',
      marginBottom: 36,
      marginTop:  12,
      marginHorizontal: 84,
      fontSize: 20,
      color:'#ffffff',
      textAlign:'center',
      padding:20,
      backgroundColor: '#202646',
      borderRadius:5
    },
    LoginButton: {
      flex: 1,
      justifyContent: 'center',
      marginTop: 350,
      marginHorizontal: 84,
      fontSize: 20,
      color:'#ffffff',
      textAlign:'center',
      padding:20,
      backgroundColor: '#202646',
      borderRadius:5
    }
  })

export default Login;