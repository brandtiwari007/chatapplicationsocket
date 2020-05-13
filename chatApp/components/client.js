import io from 'socket.io-client';
import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, TextInput, Button, ScrollView} from 'react-native';
// import {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

const Client = props => {
  const [userData, setUserData] = useState();
  const [asyncData, setAsyncData] = useState();

  const retrieveData = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('Email');
      //console.log(value, 'current logged in user is ');
      if (value !== null) {
        setAsyncData(value);
        socket.emit('newUserRegister', {email: value});
      }
    } catch (error) {
      //console.log(error);
    }
  });
  //   const socket = io.connect('http://192.168.43.3:8968');
  const [socket] = useState(() => io.connect('http://192.168.43.3:8968'));
  // useEffect(() => {}, []);
  // socket.emit('join', {email: props.route.params.userData});
  // //console.log('*************', socket, '*************');
  const [messageInput, setMessageInput] = useState();
  const [messages, setmessages] = useState([]);

  const updateMessages = useCallback(data => {
    console.log('++', data);
    console.log(data.message, 'here messages in state are');
    const chatData = {
      to: data.to,
      from: data.from,
      message: data.message,
    };

    setmessages(temp => {
      Axios.post('http://192.168.43.3:8968/user/chat', chatData).then(
        response => {
          console.log(response.data);
        },
      );
      console.log('hi', data, [...temp, data]);
      return [...temp, data];
    });
  }, []);

  useEffect(() => {
    retrieveData();
    socket.on('newMessage', data => {
      console.log('new msg', data.data);

      setMessageInput();

      //updateMessages(data.data);
      updateMessages(data);
    });
  }, []);

  return (
    <>
      <View
        style={{
          borderWidth: 2,
          flex: 1,
          backgroundColor: 'gray',
          justifyContent: 'flex-end',
        }}>
        {messages.map((value, index) => {
          //console.log(value, index);
          return (
            <View style={{padding: 2}}>
              <Text
                key={index}
                style={{
                  fontSize: 20,
                  paddingLeft: 20,
                  borderRadius: 20,
                  backgroundColor: '#d1d1d1',
                }}>
                {value.message}
              </Text>
              <Text>{value.from}</Text>
            </View>
          );
        })}
      </View>

      <View style={{justifyContent: 'flex-end'}}>
        <View style={{borderWidth: 3, borderColor: 'green'}}>
          <View style={{flexDirection: 'row', margin: 10}}>
            <TextInput
              style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={text => setMessageInput(text)}
            />
            <Button
              title="send"
              onPress={() => {
                //console.log('sending data', {
                //   to: props.route.params.userData,
                //   from: asyncData,
                //   message: messageInput,
                // });

                socket.emit('privateMessage', {
                  to: props.route.params.userData,
                  from: asyncData,
                  message: messageInput,
                });
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};
export default Client;
