import { eventChannel } from "redux-saga";
import { call, take } from "redux-saga/effects";
import { $ReduxCoreType } from "../../types/reduxCoreType";
import { useCustomSelector } from "../../utils/deepCheckSelector";
import { createSocket } from "../../utils/Socket";



export function* socketGeneratorFunction({accessToken,orgId}){
    try {
        const socket = yield call(createSocket,accessToken,orgId);
        const socketChannel = yield call(createSocketChannel,socket);

        while(true){
            try {
                const payload = yield take(socketChannel);
                switch (payload?.type) {
                    case "connect":
                            console.log("connect switch#%$@$^%$^$^@$#");        
                        break;
                    case "chat/message created":

                        break;
                    default:
                        console.log("chat/message created");
                        
                        break;
                }
                console.log("palpp;'k]k",payload);
                
            } catch (error) {
                
            }
        }
    } catch (error) {
        console.log("socket $$",error);
    }
}


export function createSocketChannel(socket){
    return eventChannel(emit => {

        const eventHandlers = {
            'connect' : () => {
                console.log("connected!!!");
            },
            'disconnect' : () => {
                console.log("disconnect!^^^^^^^^!!");
            },
            'chat/message created' : (data) => {
                emit({ type:"chat/message created", data : data });
            }
        }

        Object.keys(eventHandlers).forEach( eventName  => {
            socket.on(eventName, eventHandlers[eventName]);
        });
        
        return ()=>{
            Object.keys(eventHandlers).forEach( eventName  => {
                socket.off(eventName, eventHandlers[eventName]);
            });
        }
    });
}