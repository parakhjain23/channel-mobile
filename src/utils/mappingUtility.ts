import { UserDetailsType } from "../types/allUserInfoReducerType";
import { channelDetailType } from "../types/channelsReducerType";
import { orgDetailType } from "../types/orgsReducerType";

export function orgIdAndDataMappingUtility(orgs: orgDetailType[]): { [key: string]: any } {
  let orgIdAndNameMapping: { [key: string]: any } = {}
  orgs.forEach((obj) => {
    orgIdAndNameMapping[obj.id] = {
      name: obj.name,
      createdBy: obj.createdBy
    }
  })
  return orgIdAndNameMapping
}

export function userIdAndDataMappingUtility(users: UserDetailsType[]): any {
  let userIdAndDataMapping: any = {}
  users.forEach((obj) => {
    userIdAndDataMapping[obj.id] = {
      displayName: obj.displayName,
      firstName: obj.firstName,
      lastName: obj.lastName,
      fullName: `${obj?.firstName + ' ' + obj?.lastName}`,
      avatar: obj.avatar,
      mobileNo: obj.mobileNumber,
      email: obj.email,
    }
  })
  return userIdAndDataMapping
}

export function channelDataMappingUtility(data: { channels: channelDetailType[], userId: string, userName: string }): any {
  let userIdAndTeamIdMapping: any = {}, teamIdAndDataMapping: any = {}
  var {channels, userId, userName} = data;

  channels.forEach(channel => {

    const {_id, type, userIds} = channel;
    if (type === 'DIRECT_MESSAGE') {
      let dmUserId = userIds?.find(id => id !== userId);
      userIdAndTeamIdMapping[dmUserId] = _id;
    } else {
      if (type === 'PERSONAL') {
        userIdAndTeamIdMapping[userIds[0]] = _id;
        channel.name = userName + ' (You)';
      }
    }
   teamIdAndDataMapping[_id] = {
          type: channel.type,
          name: channel?.name,
          isThread: channel?.isThread,
          parentTeamId: channel?.parentTeamId,
          createdBy: channel?.createdBy,
          userIds: channel?.userIds,
          _id: channel?._id
        }
  });
  return { userIdAndTeamIdMapping, teamIdAndDataMapping }
}