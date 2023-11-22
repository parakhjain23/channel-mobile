import { useEffect } from "react";
import io from 'socket.io-client';
import { SOCKET_URL } from "../api/baseUrls/baseUrls";
import { $ReduxCoreType } from "../types/reduxCoreType";
import { useCustomSelector } from "./deepCheckSelector";
import SocketService from "./SocketService";
function socketactions(socket) {
    socket.on('chat/message created',(data)=>{
        console.log("socket working !!!working!!!!",data);
        
    })
}

const SocketInit = () => {
const { accessToken, currentOrgId } = useCustomSelector((state: $ReduxCoreType) => ({
    accessToken: state?.appInfo?.accessToken,
    currentOrgId: state?.orgs?.currentOrgId
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
        SocketService(socket)
    },
    [accessToken,currentOrgId]);
    
  
    return null;
}
 
export default SocketInit;