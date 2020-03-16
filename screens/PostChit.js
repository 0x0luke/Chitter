import React, {Component} from 'react';
import { Text, View, AsyncStorage, Alert, Button, TextInput } from 'react-native';
import Geolocation from 'react-native-geolocation-service';



class PostChit extends Component {

    constructor(props){
        super(props)

        // Binds the functions below so they're accessible from render()
        this.postChit = this.PostChit.bind(this);
        this.findCoords = this.findCoords.bind(this);
        let location = null;

        this.state = {
            authkey: '',
            chit: '',
            login: true,
            userid: '',
            location: '',
        }
    }

    // pull in geolocation coords
    findCoords = () => {
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
  };

    postChit(){

        var id = AsyncStorage.getItem('id');
        var auth = AsyncStorage.getItem('X-Authorization');

        // gets the current date in unix/epoch time
        var today = Date.parse(new Date())

        this.setState({
          authkey: auth,
          userid: id,
        });

        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Authorization': this.state.authkey,
            },
            body: JSON.stringify({

              chit_id: 1,
              timestamp: today,
              chit_content: this.state.chit,
              location: this.state.location,

            })
        }).then((response) => {
            Alert.alert("Posted Chit!");
            this.props.navigation.navigate("HomePage");
        })
    };

  componentDidMount(){
    this.findCoords()
  }

// do actual rendering of postchit page.
    render(){
      
      return(

        <View>

            <h3>Post a Chit</h3>

           <TextInput placeholder='Chit_Content' onChangeText={(chit) => this.setState({chit})}></TextInput>
           <Button
           onPress={this.PostChit}
           ></Button>

        </View>

      );

    }
  }

const styles = StyleSheet.create({



})

export default PostChit;