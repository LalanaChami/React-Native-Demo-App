import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import LoginScreen from './Screens/LoginScreen'
import ChatScreen from './Screens/ChatScreen'

const AppNavigator = createStackNavigator(
  {
    Login:LoginScreen,
    Chat:ChatScreen 
  },
  {
    headerMode:'none'
  }
);

export default createAppContainer(AppNavigator);