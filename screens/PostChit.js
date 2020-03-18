import React, {Component} from 'react';
import { Text, View, Alert, TextInput, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';



class PostChit extends Component {

    constructor(props){
        super(props)

        // Binds the functions below so they're accessible from render()
        this.postChit = this.postChit.bind(this);
       // this.findCoords = this.findCoords.bind(this);
        this.getCreds = this.getCreds.bind(this);
        let location = null;

        this.state = {
            authkey: '',
            chit: '',
            login: true,
            userid: '',
            location: '',
        }
    }

    async getCreds(){
      try{
        var getAuthKey = await AsyncStorage.getItem('X-Authorization');

        console.log(getAuthKey);

        this.setState({ 
          authkey: getAuthKey
       });
      }
      catch(error){
        console.log("Error within Async: "+error);
        Alert.alert("There was an issue with getting authentication data from the storage...");
      }
    }

    // pull in geolocation coords
    /*findCoords() {
      Geolocation.getCurrentPosition(
          (position) => {
              const location = JSON.stringify(position);

              this.setState({ location })
          },
          {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000
          }
      );
  };*/

    postChit(){

      const jsonData = {
        timestamp: today,
        chit_content: this.state.chit,
        location: this.state.location,
      }

      const POSTdata = JSON.stringify(jsonData);

        // gets the current date in unix/epoch time
        var today = Date.parse(new Date())

        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Authorization': this.state.authkey,
                'Cache-Control': 'no-cache',
            },
            body: POSTdata
        }).then((response) => {
            Alert.alert("Posted Chit!");
            this.props.navigation.navigate("HomePage");
        }).catch((error) =>{
          Alert.alert("There was a problem posting your Chit, please try again");
          console.log(error);
         });
    };

  componentDidMount(){
  //  this.findCoords();
    this.getCreds();
  }

// do actual rendering of postchit page.
    render(){
      
      return(

        <View>

            <Text style={styles.PostChitText}>Post a Chit</Text>

           <TextInput style={styles.TextInputStyle} placeholder='What&#39;s on your mind?' onChangeText={(chit) => this.setState({chit})}></TextInput>
           <TouchableOpacity
           onPress={this.postChit}
           style={styles.PostButton}
           ><Text style={styles.ButtonTextStyle}>Post Chit</Text></TouchableOpacity>

        </View>

      );

    }
  }

const styles = StyleSheet.create({

  PostChitText:{
    textAlign:'center',
    marginTop:20,
    fontSize:32,
  },

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
  PostButton: {
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

})

export default PostChit;