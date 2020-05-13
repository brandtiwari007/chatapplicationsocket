import React, {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PageView from './userpage';
const Login = ({navigation}) => {
  const [loginDetail, setLoginDetail] = useState({
    email: '',
    password: '',
  });
  const userLoggedIn = () => {
    if (loginDetail.email && loginDetail.password) {
      AsyncStorage.setItem('Email', loginDetail.email).then(response => {
        console.log('data set', loginDetail.email);
      });
      axios
        .post('http://192.168.43.3:8968/user/login', loginDetail)
        .then(response => {
          console.log(response.data);
          navigation.navigate('pageView');
        });
    }
  };

  return (
    <>
      <View
        style={{
          marginTop: 120,
          marginLeft: 10,
          marginRight: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderRightColor: 'green',
        }}>
        <Text>Email</Text>
        <TextInput
          style={{borderWidth: 1}}
          placeholder="email"
          onChangeText={email => setLoginDetail({...loginDetail, email})}
        />
        <Text>password</Text>
        <TextInput
          style={{borderWidth: 1}}
          placeholder="password"
          onChangeText={password => setLoginDetail({...loginDetail, password})}
        />
        <View style={{marginLeft: 100, marginRight: 100, margin: 20}}>
          <Button title="Login" onPress={() => userLoggedIn()} />
        </View>
      </View>
    </>
  );
};
export default Login;
