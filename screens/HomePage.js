import React, {Compoment, AsyncStorage} from 'react';
import { Text, View, FlatList } from 'react-native';

class HomePage extends Compoment {
    constructor(props){
        super(props)

        this.state = {
          login: true,
          authkey: '',
          chits: '',
          loading: true,
          jsonData: '',
        }
        
      }

      

      getPosts = () => {
        var auth = AsyncStorage.getItem("X-Authorization");

        this.setState({ 
          authkey: auth 
        });

        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits?start=0&count=50', {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Authorization': this.state.authkey,
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if ((response) != null) {
            console.log(response);
            this.setState({
              jsonData: responseJson,
            })
          }
        }).catch((error) => {
            console.log(error);
        });
      };

      compomentDidMount() {
        this.getPosts();
      }

    
      renderChits(obj){
        return(

          <View>
            <View>
              <Text>{item.user.given_name}</Text>
              <Text>{item.user.family_name}</Text>
              <Text>{item.chit_content}</Text>
              <Text>{item.location}</Text>
            </View>
          </View>
          /* do rendering such as 

          <View style={styles.itemBlock}>
            <View style={styles.itemMeta}>
              <Text style={styles.itemName}>{item.RxDrugName}</Text>
              <Text style={styles.itemLastMessage}>{item.RxNumber}</Text>
            </View>

            <View style={styles.footerStyle}>
              <View style={{ paddingVertical: 10 }}>
                <Text style={styles.status}>{ item.StoreNumber }</Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/right_arrow_blue.png')} />
              </View>

            </View>
        </View>

          */
        );
      }


      render(){
          return(
              <View>
                {this.state.jsonData.map(item => this.renderChits(item))}
              </View>
          );
      }

}
export default HomePage;