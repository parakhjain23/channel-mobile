import { useDispatch } from "react-redux";
import { eventChannel } from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";
import { createSocket } from "../../utils/Socket";
import { addNewMessageV2 } from "../chats/chatsSlice";
import { actionType } from "../../types/actionDataType";
import { socketEventsEnums } from "../../redux/Enums";
import { $ReduxCoreType } from "../../types/reduxCoreType";
import { handleNotification } from "../../utils/HandleNotification";
import { PlayLocalSoundFile } from "../../utils/Sounds";
import { handleNotificationV2 } from "../../utils/HandleNotificationV2";



export function* socketGeneratorFunction(action: actionType<{ accessToken: string, orgId: string }>) {
    try {
        const { accessToken, orgId } = action.payload
        const socket = yield call(createSocket, accessToken, orgId);
        const socketChannel = yield call(createSocketChannel, socket);

        while (true) {
            try {
                const payload = yield take(socketChannel);
                const { userId, activeChannelId, userIdAndDataMapping } = yield select((state: $ReduxCoreType) => ({
                    userId: state?.allUsers?.currentUser?.id,
                    activeChannelId: state?.appInfo?.activeChannelId,
                    userIdAndDataMapping: state?.allUsers?.userIdAndDataMapping
                }))

                switch (payload?.type) {
                    case socketEventsEnums.connect:
                        break;
                    case socketEventsEnums.disconnect:
                        break;
                    case socketEventsEnums["chat/message created"]:
                        console.log("message created$$");
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
                        try {
                            yield put((addNewMessageV2({ messageObject: messageObj, userId: userId })))
                        }
                        catch (error) {
                            console.warn(error);
                        }
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
                        // if (messageObj?.senderId != userId) {
                        //     PlayLocalSoundFile();
                        //     if (
                        //       messageObj?.teamId !=
                        //       activeChannelId
                        //     ) {
                        //     //   handleNotification(
                        //     //     newData,
                        //     //     'events',
                        //     //     store.getState()?.orgsReducer?.userIdAndDisplayNameMapping,
                        //     //   );
                        //     }
                        //   }
                        if (messageObj?.senderId != userId) {
                            PlayLocalSoundFile();
                            if (messageObj?.teamId != activeChannelId) {
                                yield call(handleNotificationV2, messageObj, 'events', userIdAndDataMapping?.[userId]?.displayName);
                            }
                        }
                        break;

                    case socketEventsEnums["chat/team updated"]:
                        console.log(payload?.data, "PATCHED")
                    case socketEventsEnums["chat/team patched"]:
                        console.log(payload?.data, "UPDATED")
                    default:

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
                socket.off(eventName, (data: any) => emit({ type: eventName, data: data }));
            });
        }
    });
}