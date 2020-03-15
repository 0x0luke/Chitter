import React, {Component} from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import Geolocation from 'react-native-geolocation-service';



class PostChit extends Component {

    constructor(props){
        super(props)

        // Binds the functions below so they're accessible from render()
        this.postChit = this.PostChit.bind(this);
        this.findCoords = this.findCoords.bind(this);

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

        /*
          {
            "chit_id": 0,
            "timestamp": 0,
            "chit_content": "string",
            "location": {
              "longitude": 0,
              "latitude": 0
            },
            "user": {
              "user_id": 0,
              "given_name": "string",
              "family_name": "string",
              "email": "string"
            }
          }
*/

        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Authorization': this.state.authkey,
            },
            body: JSON.stringify({
                
            })
        })
    }

  componentDidMount(){
    this.findCoords()
  }

// do actual rendering of postchit page.
    render(){
      
      return(

        <View>

            <h3>Post a Chit</h3>

        </View>

      );

    }
  }

const styles = StyleSheet.create({



})

export default PostChit;