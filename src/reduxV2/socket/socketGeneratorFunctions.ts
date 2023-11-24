import { useDispatch } from "react-redux";
import { eventChannel } from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";
import { createSocket } from "../../utils/Socket";
import { addNewMessageV2 } from "../chats/chatsSlice";



export function* socketGeneratorFunction({accessToken,orgId}){
    try {
        const socket = yield call(createSocket,accessToken,orgId);
        const socketChannel = yield call(createSocketChannel,socket);

        while(true){
            try {
                const payload = yield take(socketChannel);
                switch (payload?.type) {
                    case "connect":
                        console.log("connect =-=-");        
                        break;
                    case "chat/message created":
                        console.log("inside chat msg switch case``````````~~~~~~~",payload?.data);
                        
                        // if (
                        //     store.getState()?.channelsReducer?.teamIdAndTypeMapping[data?.teamId] ==
                        //     undefined
                        //   ) {
                        //     store.dispatch(
                        //       getChannelByTeamIdStart(
                        //         store.getState()?.userInfoReducer?.accessToken,
                        //         data?.teamId,
                        //         store.getState()?.userInfoReducer?.user?.id,
                        //       ),
                        //     );
                        //   }
                        var newData = payload?.data;
                        if (!('isActivity' in newData)) {
                        newData.isActivity = false;
                        }
                        yield put((addNewMessageV2({
                            messageObject : newData,
                            userid: yield select( state => state?.allUsers?.currentUser?.id)
                        })))
                        //   newData?.content == 'closed this channel' && newData?.isActivity
                        //     ? null
                        //     : store.getState()?.channelsReducer?.activeChannelTeamId !=
                        //       newData?.teamId
                        //     ? (store.getState()?.channelsReducer?.recentChannels?.[0]?._id !=
                        //         newData?.teamId &&
                        //         store.dispatch(
                        //           moveChannelToTop(
                        //             [newData?.teamId],
                        //             newData?.senderId,
                        //             store.getState()?.userInfoReducer?.user?.id,
                        //           ),
                        //         ),
                        //       store.dispatch(
                        //         increaseUnreadCount(
                        //           [newData?.teamId],
                        //           newData?.senderId,
                        //           store.getState()?.userInfoReducer?.user?.id,
                        //         ),
                        //       ))
                        //     : store.getState()?.channelsReducer?.recentChannels?.[0]?._id !=
                        //         newData?.teamId &&
                        //       store.dispatch(
                        //         moveChannelToTop(
                        //           [newData?.teamId],
                        //           newData?.senderId,
                        //           store.getState()?.userInfoReducer?.user?.id,
                        //         ),
                        //       );
                        //   if (newData?.senderId != store.getState()?.userInfoReducer?.user?.id) {
                        //     PlayLocalSoundFile();
                        //     if (
                        //       newData?.teamId !=
                        //       store.getState()?.channelsReducer?.activeChannelTeamId
                        //     ) {
                        //       handleNotification(
                        //         newData,
                        //         'events',
                        //         store.getState()?.orgsReducer?.userIdAndDisplayNameMapping,
                        //       );
                        //     }
                        //   }
                        break;
                    default:
                        console.log("not registered event!!!");
                        
                        break;
                }
                
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