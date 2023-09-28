export interface $ChatsReducerType{
    data: chatDataTypes,
    randomIdsArr: [],
}

export interface chatDataTypes{
    [key:string]:{
        isLoading:boolean,
        messages:[],
        parentMessages:{[key:string]:any},
        draftMessages:{[key:string]:any},
        messagesToSendOnInternetReconnet:any
    }
}