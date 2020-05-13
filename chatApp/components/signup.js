import React from 'react';
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

const Signup = ({navigation}) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const submit = () => {
    console.log('hellooo');
    if (userData.username && userData.email && userData.password) {
      console.log('bye');
      axios
        .post('http://192.168.43.3:8968/user/signup', userData)
        .then(response => {
          console.log('re', response.data);
        })
        .catch(err => console.log(err));
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
        <Text>username</Text>
        <TextInput
          style={{borderWidth: 1}}
          placeholder="username"
          onChangeText={username => setUserData({...userData, username})}
        />
        <Text>Email</Text>
        <TextInput
          style={{borderWidth: 1}}
          placeholder="email"
          onChangeText={email => setUserData({...userData, email})}
        />
        <Text>password</Text>
        <TextInput
          style={{borderWidth: 1}}
          placeholder="password"
          onChangeText={password => setUserData({...userData, password})}
        />
        <View style={{marginLeft: 100, marginRight: 100, margin: 20}}>
          <Button title="submit" onPress={submit} />
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text> Already have an account press here</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Signup;
