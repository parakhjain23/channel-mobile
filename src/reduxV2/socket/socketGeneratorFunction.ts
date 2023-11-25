import { useDispatch } from "react-redux";
import { eventChannel } from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";
import { createSocket } from "../../utils/Socket";
import { addNewMessageV2 } from "../chats/chatsSlice";
import { actionType } from "../../types/actionDataType";
import { socketEventsEnums } from "../../redux/Enums";
import { $ReduxCoreType } from "../../types/reduxCoreType";



export function* socketGeneratorFunction(action: actionType<{ accessToken: string, orgId: string }>) {
    try {
        const { accessToken, orgId } = action.payload
        const socket = yield call(createSocket, accessToken, orgId);
        const socketChannel = yield call(createSocketChannel, socket);

        while (true) {
            try {
                const { userId, activeChannelId } = yield select((state: $ReduxCoreType) => ({
                    userId: state?.allUsers?.currentUser?.id,
                    activeChannelId: state?.appInfo?.activeChannelId
                }))
                const payload = yield take(socketChannel);

                switch (payload?.type) {
                    case socketEventsEnums.connect:
                        console.log("connect =-=-");
                        break;
                    case socketEventsEnums.disconnect:
                        console.log("disconnect --==-==-");
                        break;
                    case socketEventsEnums["chat/message created"]:
                        const messageObj = payload?.data
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
                        if (!('isActivity' in messageObj)) {
                            messageObj.isActivity = false;
                        }
                        yield put((addNewMessageV2({
                            messageObject: messageObj,
                            userId: userId
                        })))
                        //   messageObj?.content == 'closed this channel' && messageObj?.isActivity
                        //     ? null
                        //     : store.getState()?.channelsReducer?.activeChannelTeamId !=
                        //       messageObj?.teamId
                        //     ? (store.getState()?.channelsReducer?.recentChannels?.[0]?._id !=
                        //         messageObj?.teamId &&
                        //         store.dispatch(
                        //           moveChannelToTop(
                        //             [messageObj?.teamId],
                        //             messageObj?.senderId,
                        //             store.getState()?.userInfoReducer?.user?.id,
                        //           ),
                        //         ),
                        //       store.dispatch(
                        //         increaseUnreadCount(
                        //           [messageObj?.teamId],
                        //           messageObj?.senderId,
                        //           store.getState()?.userInfoReducer?.user?.id,
                        //         ),
                        //       ))
                        //     : store.getState()?.channelsReducer?.recentChannels?.[0]?._id !=
                        //         messageObj?.teamId &&
                        //       store.dispatch(
                        //         moveChannelToTop(
                        //           [messageObj?.teamId],
                        //           messageObj?.senderId,
                        //           store.getState()?.userInfoReducer?.user?.id,
                        //         ),
                        //       );
                        //   if (messageObj?.senderId != store.getState()?.userInfoReducer?.user?.id) {
                        //     PlayLocalSoundFile();
                        //     if (
                        //       messageObj?.teamId !=
                        //       store.getState()?.channelsReducer?.activeChannelTeamId
                        //     ) {
                        //       handleNotification(
                        //         messageObj,
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
        console.warn(error);
    }
}


export function createSocketChannel(socket) {
    return eventChannel(emit => {
        Object.keys(socketEventsEnums).forEach(eventName => {
            socket.on(eventName, (data: any) => emit({ type: eventName, data: data }))
        });

        return () => {
            Object.keys(socketEventsEnums).forEach(eventName => {
                socket.off(eventName,(data: any) => emit({ type: eventName, data: data }));
            });
        }
    });
}