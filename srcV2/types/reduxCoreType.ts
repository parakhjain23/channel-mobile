import { $AppInfoReducerType } from "./appInfoReducerType";
import { $ChannelsReduxType } from "./channelsReducerType";
import { $OrgsReducerType } from "./orgsReducerType";
import { $SearchedDataReducerType } from "./searchedDataType";
import { $AllUserInfoReducerType } from "./allUserInfoReducerType";
import { $ChatsReducerType } from "./ChatsReducerType";

export interface $ReduxCoreType{
    allUsers: $AllUserInfoReducerType,
    appInfo: $AppInfoReducerType,
    orgs: $OrgsReducerType,
    channels: $ChannelsReduxType,
    chats: $ChatsReducerType,
    searchedData: $SearchedDataReducerType
}