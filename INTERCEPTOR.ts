import axios from 'axios';
import { CHAT_SERVER_URL, DELVE_SERVER_URL } from './src/api/baseUrls/baseUrls';
import AsyncStorage from '@react-native-async-storage/async-storage';

// chat server instance
const Chatapi = axios.create({
  baseURL: CHAT_SERVER_URL,
}); 

// delve api server instance
const api = axios.create({
  baseURL: DELVE_SERVER_URL,
}); 

//interceptor for chat server
Chatapi.interceptors.request.use(
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
api.interceptors.request.use(
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
  


  //end points for chat api
  export const sendMsgApi = (body) => {
    return Chatapi.post('/chat/message',body);
  };

  export const delMsgApi = (body, msgId) => {
    return Chatapi.patch(`/chat/message/${msgId}`, body);
  };

  export const getMsgOfTeamApi = (teamId, skip) => {
    return Chatapi.get(`/chat//message?teamId=${teamId}&deleted=false&$limit=30&$paginate=false&parentMessages=true&$skip=${skip}`);
  }

  export const draftMsgApi = (body, orgId, userId, teamId) => {
    return Chatapi.patch(`/chat/teamUser?orgId=${orgId}&userId=${userId}&teamId=${teamId}`,body);
  }

  export const getOrgsApi = () => {
    return Chatapi.get(`/users?followedOrgs=true`);
  }
  
  export const getAllUsersOfOrgApi = (orgId) => {
    return Chatapi.get(`/orgs/${orgId}?getCouponDetails=true`);
  }
  
  export const getUserDetailsApi = () => {
    return Chatapi.get(`/users?getCurrentUser=true`);
  }

  export const searchUserProfileApi = (userId) => {
    return Chatapi.get(`/users/${userId}`);
  }

  export const getChannelsApi = (orgId, userId) => {
    return Chatapi.get(`/chat/team?orgId=${orgId}&$paginate=false&includeUsers=false&userIds=${userId}`);
  }

  export const getRecenctChannelsApi = (orgId, userId) => {
    return Chatapi.get(`/chat/teamUser?$sort[lastUpdatedAt]=-1&orgId=${orgId}&userId=${userId}&$paginate=false`);
  }


  //end point for delve api
  export const getChannelsByQueryApi = (body,query) => {
    return api.post(`/search/prod-space?query=${query}&API_KEY=TmkzBMbr3Z1eiLjMOQ0kqhqp4f0GVCzR1w&size=15&`,body)
  }

export default Chatapi;