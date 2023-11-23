export interface $ChatsReducerType{
    data: chatDataTypes,
    randomIdsArr: [],
}

export interface chatDataTypes{
    [key:string]:{
        isLoading:boolean,
        messages:messagesType[],
        parentMessages:{[key:string]:any},
        draftMessages:{[key:string]:any},
        messagesToSendOnInternetReconnet:any
    }
}

export interface messagesType{
    __v: number,
    _id: string,
    attachment: any[],
    content: string,
    createdAt: string,
    deleted: boolean,
    isActivity: boolean,
    isLink: boolean,
    isParent: boolean,
    mentions: any[],
    orgId: string,
    parentId: string | null,
    reactions: any[],
    senderId: string,
    senderType: string,
    showInMainConversation: boolean,
    teamId: string,
    threadReplyCount: number,
    updatedAt: string
}
