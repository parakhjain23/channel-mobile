import { eventChannel } from "redux-saga";
import { call, take } from "redux-saga/effects";
import { $ReduxCoreType } from "../../types/reduxCoreType";
import { useCustomSelector } from "../../utils/deepCheckSelector";
import { createSocket } from "../../utils/Socket";



export function* socketGenerator({accessToken,orgId}){
    try {
        const socket = yield call(createSocket,accessToken,orgId);
        const socketChannel = yield call(createSocketChannel,socket);

        while(true){
            try {
                const payload = yield take(socketChannel);
            } catch (error) {
                
            }
        }
    } catch (error) {
        console.log("socket $$",error);
    }
}


export function createSocketChannel(socket){
    return eventChannel(emit => {
        const chatHandler = ()=>{
            console.log("message created handler runsss!!!");
        }
        socket.on('connect',()=>{console.log("connected!!!",socket);
        })
        socket.on('disconnect',()=>{console.log("disconnect!^^^^^^^^!!");
        })
        socket.on('chat/message created',chatHandler)
        
        const unsub = ()=>{
            socket.off('chat/message created',chatHandler);
        }
        return unsub;
    });
}