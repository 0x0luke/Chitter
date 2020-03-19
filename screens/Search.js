import { Text,Alert,View, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
// this import allows the user on iOS devices to elastic band the page (Not sure the best way to describe this, details are availible online.)
import Constants from 'expo-constants';

class Search extends Component {
    constructor(props){
        super(props);
        
        // bind the functions so they're able to use states.
        this.userSearch = this.userSearch.bind(this);
        this.renderResults = this.renderResults.bind(this);
        this.FollowUser = this.FollowUser.bind(this);
        this.getCreds = this.getCreds.bind(this);

        this.state = {
            loading: false,
            jsonData: [],
            CurrentUserID: '',
            authkey: '',
            followingData:[],
            isUserFollowing: false,
        }
    }

    componentDidMount(){
        // makes sure the ID from the async is availible.
        this.getCreds();
    }

        // helps us craft the POST request for following the user and also gets us the ID we need for the check so users can't follow themselves.
    async getCreds(){
        try{
            var id = await AsyncStorage.getItem('id');
            var auth = await AsyncStorage.getItem('X-Authorization');
            this.setState({ 
                CurrentUserID: id,
                authkey: auth
            });
        }
            catch(error){
            console.log("Error within Async: "+error);
            }
        }
        
    // this function takes a ID of a user and searches for it in the database
    userSearch(q){
        console.log("Our q param passed in was: "+ q)
        return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+q)
       .then((response) => response.json())
       .then((responseJson) => {
      
        this.setState({
         loading: false,
         jsonData: responseJson,
        });
         
       })
       .catch((error) =>{
        console.log(error);
       });
      }


      GetCurrentFollowing(q){
        console.log("Our q param passed in was: "+ q)
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+q+'/following')
       .then((response) => response.json())
       .then((responseJson) => {
      
        this.setState({
         loading: false,
         followingData: responseJson,
        });
         
       })
       .catch((error) =>{
        console.log(error);
       });
      }

      // this function manages the follow user parameter 
      FollowUser(q){
        console.log("Our q param passed in was: "+ q)
        // the actual check to make sure users can't follow themselves.
        if(this.state.CurrentUserID == q){
            Alert.alert("You can't follow yourself!");
        } else {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+q+'/follow', {
            method: 'POST',
            headers: {
                'X-Authorization': this.state.authkey,
            },
        })
       .then((response) => {
            if(response.status == 200){
                Alert.alert("User followed!");
            }else if(response.status == 401){
                Alert.alert("You're not logged in, please Login and try again.");
                this.props.navigation.navigate('Login');
            }
       }
       )
       .catch((error) =>{
        console.log(error);
       });
    }
}
    
      // render the results nicely in a scrollable list, this future proofs the design of the application by allowing the user to scroll through possible results.
      renderResults(item){
        return(
          <View style={styles.UserContainer}>
              <SafeAreaView style={styles.scrollable}>
                <Text style={styles.NameStyle}>{item.given_name + " "+ item.family_name}</Text>
                <TouchableOpacity
                    style={styles.FollowButton}
                    title="Follow"
                    onPress={() => this.FollowUser(item.user_id)}>
                    <Text style={styles.ButtonTextStyle}>Follow</Text>
                    </TouchableOpacity>
              </SafeAreaView>
          </View>
        );
      }
    // the actual render function, allows for dynamic querying of the API aka doesn't require the user to hit a button to search, I use the map function to create a single Obj for each full JSON entity we get back from the api. 
    render(){
        return(
            <View>
                <View>
                <TextInput style={styles.TextInputStyle} type='query' placeholder='Search for a User' onChangeText={(query) => this.userSearch(query)}></TextInput>
                </View>
                <ScrollView style={styles.ScrollContainer}>
                {this.state.jsonData.map(item => this.renderResults(item))} 
                </ScrollView>
            </View>
        );
    }


}

// our massive stylesheet which throws everything together.
const styles = StyleSheet.create({
    UserContainer:{
        flex:1,
        marginTop: Constants.statusBarHeight,
      },
    ScrollContainer:{
        marginTop: 20,
        textAlign:'center',
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
      NameStyle:{
        flex:1,
        fontSize:18,
        marginLeft:8,
        marginTop:5,
        textAlign: 'center',
      },
      scrollable:
      {
        marginBottom:20,
        borderWidth: 2,
        borderColor:'#202646',
        borderRadius: 20,
        //marginHorizonal: 20
      },
      FollowButton: {
        flex:1,
        justifyContent: 'center',
        marginBottom: 16,
        marginTop:  12,
        marginRight:295,
        marginHorizontal: 20,
        fontSize: 20,
        color:'#ffffff',
        textAlign:'center',
        padding:5,
        backgroundColor: '#202646',
        borderRadius:5
      },
      ButtonTextStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:12,
        textAlign: 'center',
        color:'#ffffff',
      },
})

export default Search;