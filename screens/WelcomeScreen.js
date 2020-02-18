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
  
    render(){
      let welcomeString = "Welcome to Chittr";
  
      // renders a screen containing the welcome screen above and a button to login
      return(
        <View>
          <Text style={styles.welcomeText}>{welcomeString}</Text>
          <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}></Button> // switches to the login class and renders that view
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    welcomeText: {
      //Color: 'black',
      fontSize: 50
    }
  })

export default WelcomeScreen;