export interface $ChannelsReduxType {
    channels: channelDetailType[]; 
    recentChannels: recentChannelDetailType[]; 
    isLoading: boolean;
    activeChannelTeamId: string | null; 
    highlightChannel:any 
    userIdAndTeamIdMapping:{[key:string]:string} 
    teamIdAndNameMapping:{[key:string]:string} 
    teamIdAndTypeMapping:{[key:string]:string} 
    teamIdAndUnreadCountMapping:{[key:string]:string | number} 
    teamIdAndBadgeCountMapping:{[key:string]:string | number} 
  }

export interface recentChannelDetailType {
    __v: number;
    _id: string;
    badgeCount: number;
    createdAt: string;
    disabled: boolean;
    draftAttachments: any[]; 
    draftMessage: string | null;
    isPinned: boolean;
    lastUpdatedAt: string;
    notificationSettings: string; 
    orgId: string;
    teamId: string;
    unreadCount: number;
    updatedAt: string;
    userId: string;
  }

export interface channelDetailType {
  __v: number;
  _id: string;
  createdAt: string;
  createdBy: string;
  groupsAdded: any[]; 
  isAnnouncementChannel: boolean;
  isArchived: boolean;
  isShared: boolean;
  isThread: boolean;
  name: string;
  orgId: string;
  parentTeamId: string | null;
  purpose: string;
  sharedOrgs: any[]; 
  totalMessages: number;
  type: string;
  updatedAt: string;
  updatedBy: string;
  userIds: string[];
}
