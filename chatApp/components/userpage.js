import React, {useState, useEffect, useCallback} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';
import Client from './client';
const PageView = ({navigation}) => {
  const [userData, setUserData] = useState();

  const dataFetch = useCallback(() => {
    axios.post('http://192.168.43.3:8968/user/getUsers').then(response => {
      setUserData(response.data);
    });
  }, []);

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <View style={{backgroundColor: 'grey'}}>
      <View style={{width: 300, height: '100%', backgroundColor: 'white'}}>
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 2,
            marginHorizontal: 5,
          }}>
          {userData &&
            userData.map((data, index) => {
              return (
                <TouchableOpacity
                  style={{padding: 5, borderWidth: 2}}
                  onPress={() =>
                    navigation.navigate('client', {userData: data.email})
                  }>
                  <Text style={{}}>{data.email}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    </View>
  );
};
export default PageView;
