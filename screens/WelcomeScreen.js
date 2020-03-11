import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
class WelcomeScreen extends Component {
    constructor(props){
      super(props)
      this.state = {
        login: false
      }
    }

    static navigationOptions = {
        header: null
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  
    render(){
      let welcomeString = "Chitter";
  
      // renders a screen containing the welcome screen above and a button to login
      return(
        <View>
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeText}>{welcomeString}</Text>
          </View>
            <View style={styles.LoginButton}>
              <Button
              title="Login"
              onPress={()=>this.props.navigation.navigate('Login')}>
              </Button> 
            <View style={styles.RegisterButton}>
              <Button
              title = "Register"
              onPress={()=>this.props.navigation.navigate('Register')}>
              </Button>
              </View>

          </View>
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    ButtonContainer:{
      flexDirection: "row",
    },
    welcomeText:{
      alignItems: 'center',
      justifyContent: 'center',
      fontSize:32,
    },
    RegisterButton: {
      justifyContent: 'flex-end',
      marginBottom: 36,
      bottom:0,
    },
    LoginButton: {
      alignItems:'center',
      bottom:0,
    }
  })

export default WelcomeScreen;