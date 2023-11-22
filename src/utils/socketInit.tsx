import { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from 'socket.io-client';
import { SOCKET_URL } from "../api/baseUrls/baseUrls";
import { $ReduxCoreType } from "../types/reduxCoreType";
import { useCustomSelector } from "./deepCheckSelector";
import SocketService from "./SocketService";
import SocketServiceV2 from "./SocketServiceV2";
// function socketactions(socket) {
//     socket.on('chat/message created',(data)=>{
//         console.log("socket working !!!working!!!!",data);
        
//     })
// }

const SocketInit = () => {
  const dispatch=useDispatch();
const { accessToken, currentOrgId, channels, allUsers } = useCustomSelector((state: $ReduxCoreType) => ({
    accessToken: state?.appInfo?.accessToken,
    currentOrgId: state?.orgs?.currentOrgId,
    channels : state?.channels,
    allUsers : state?.allUsers
  }))
    let socket;   
    useEffect(()=>{
        console.log("inside socket useeffect");
        socket = io(SOCKET_URL, {
            forceNew: true,
            transports: ['websocket', 'polling'],
            reconnectionAttempts: 10,
        });
        if (accessToken != undefined) {
            socket.emit(
              'create',
              'authentication',
              {
                strategy: 'jwt',
                accessToken: accessToken,
                orgId: currentOrgId,
                product: 'channel',
                deviceType: 'WEB',
              },
              (error, authResult) => {
                // console.warn('ERROR', error);
              },
            );
        }
        socket.on('connect',()=>{
            console.log("connecreedd$$$$");
            
        })
        // socketactions(socket);
        SocketServiceV2(socket,dispatch,accessToken,currentOrgId,channels,allUsers)
    },
    [accessToken,currentOrgId]);
    
  
    return null;
}
 
export default SocketInit;