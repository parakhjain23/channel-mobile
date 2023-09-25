import { UserDetailsType } from "../types/allUserInfoReducerType";
import { channelDetailType } from "../types/channelsReducerType";
import { orgDetailType } from "../types/orgsReducerType";

export function orgIdAndNameMappingUtility(orgs:orgDetailType[]): {[key:string]:string}{
    let orgIdAndNameMapping:{[key:string]:string} = {}
    orgs.forEach((obj)=>{
        orgIdAndNameMapping[obj.id]=obj.name
    })
    return orgIdAndNameMapping
}  

export function userIdAndDataMappingUtility(users:UserDetailsType[]):any{
    let userIdAndDataMapping: any = {}
    users.forEach((obj)=>{
        userIdAndDataMapping[obj.id]={
            displayName:obj.displayName ,
            firstName:obj.firstName,
            lastName:obj.lastName,
            avatarKey:obj.avatarKey,
        }
    })
    return userIdAndDataMapping
}  

export function channelDataMappingUtility(data:{channels:channelDetailType[],userId:string,userName:string}):any{
    let userIdAndTeamIdMapping:any , teamIdAndDataMapping:any = {}
    const {channels,userId,userName}=data
    channels.forEach(channel => {
        const {_id, type, userIds} = channel;
        teamIdAndDataMapping[_id] = channel;

        if (type === 'DIRECT_MESSAGE') {
          let dmUserId = userIds?.find(id => id !== userId);
          userIdAndTeamIdMapping[dmUserId] = _id;
        } else {
          if (type === 'PERSONAL') {
            userIdAndTeamIdMapping[userIds[0]] = _id;
            channel.name = userName + ' (You)';
          }
        }
        // teamIdAndTypeMapping[_id] = type;
        teamIdAndDataMapping[_id] = {
            type:channel.type,
            name:channel?.name,
            isThread:channel?.isThread,
            parentTeamId:channel?.parentTeamId,
            createdBy:channel?.createdBy,
            userIds:channel?.userIds
        }
      });
     return {userIdAndTeamIdMapping,teamIdAndDataMapping} 
}