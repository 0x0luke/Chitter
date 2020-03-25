import { Text,Alert,View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';


// TODO: User profile images.
class MyAccount extends Component {
    constructor(props){
        super(props);

        this.getAccountDetails = this.getAccountDetails.bind(this);
        this.getAccountPhoto = this.getAccountPhoto.bind(this);

        this.state = {
            authkey: '',
            udid: '',
            AccountDetails: [],
            Following: [],
            Followers: [],

        }
    }


    async getCreds(){
        try{
          var userID = await AsyncStorage.getItem('id');
          var getAuthKey = await AsyncStorage.getItem('X-Authorization');

          console.log(getAuthKey);

          this.setState({ 
            udid: userID,
            authkey: getAuthKey
         });
        }
        catch(error){
          console.log("Error within Async: "+error);
          Alert.alert("There was an issue with getting authentication data from the storage...");
        }
      }

    getAccountDetails(id){

        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Authorization': this.state.token,
          },
        })
          .then((response) => {
              if(response.status != 200)
              {
                throw("Response error: " + response.status);
              }
            })
            .then((responseJson) => {

                this.setState({
                    AccountDetails: responseJson,
                });
            })
            .catch((error) => {
                console.log(error);
            });
      }

      getAccountPhoto(id){

        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id+'/photos', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Authorization': this.state.token,
          },
        })
          .then((response) => {
              if(response.status != 200)
              {
                throw("Response error: " + response.status);
              }
            })
            .catch((error) => {
                console.log(error);
            });
      }



      componentDidMount(){
          this.getCreds();
          this.getAccountDetails(this.state.udid);
      }

    render() {
        return(
            <View>

                <Text style={style.TextStyle}> First Name: {this.state.jsonData.given_name} </Text>
                <Text style={style.TextStyle}> Last name: {this.state.jsonData.family_name} </Text>
                <Text style={style.TextStyle}> Email: {this.state.jsonData.email} </Text>
                <TouchableOpacity
                    style={styles.FollowersButton}
                    title="Followers"
                    onPress={()=>this.props.navigation.navigate('Followers')}>
                <Text style={styles.ButtonTextStyle}>View Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.FollowingButton}
                title="Following"
                onPress={()=>this.props.navigation.navigate('Following')}>
            <Text style={styles.ButtonTextStyle}>View Following</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    TextStyle:{
        textAlign: 'center',
        height: 50,
        borderWidth: 2,
        borderColor:'#202646',
        borderRadius: 20,
        backgroundColor: '#ffffff',
        marginHorizontal: 40,
        marginTop:20,
      },

      FollowersButton: {
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
      FollowingButton: {
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
      }, 
      ButtonTextStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:20,
        textAlign: 'center',
        color:'#ffffff',
      },

})

export default MyAccount;