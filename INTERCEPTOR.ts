import axios from 'axios';
import { CHAT_SERVER_URL, DELVE_SERVER_URL } from './src/api/baseUrls/baseUrls';
import AsyncStorage from '@react-native-async-storage/async-storage';

// chat server instance
export const spaceServerApi = axios.create({
  baseURL: CHAT_SERVER_URL,
}); 

// delve api server instance
export const delveServerApi = axios.create({
  baseURL: DELVE_SERVER_URL,
}); 

//interceptor for chat server
spaceServerApi.interceptors.request.use(
  async (config) => {
      const token =  await AsyncStorage.getItem("accessToken")
      if (token) {
      config.headers.Authorization = `${token}`
      if(config.data)
      config.headers['Content-Type']='application/json'
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
  );


//interceptor for devle server  
delveServerApi.interceptors.request.use(
  async (config) => {
      const token =  await AsyncStorage.getItem("accessToken")
      if (token) {
      if(config.data){
        config.url+=`userToken=${token}`;
        config.headers['Content-Type']='application/json';
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
  