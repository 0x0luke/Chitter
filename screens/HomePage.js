import React, {Compoment} from 'react';
import { Text, View } from 'react-native';

class HomePage extends Compoment {
    constructor(props){
        super(props)
        this.state = {
          login: true
        }
      }
    
    render(){
        return(
            <View>
                <Text>This is the homepage</Text>
            </View>
        )
    }

}
export default HomePage;