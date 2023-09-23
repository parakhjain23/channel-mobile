export interface $ChatsReducerType{
    data: chatDataTypes,
    randomIdsArr: [],
}

export interface chatDataTypes{
    [key:string]:{
        isLoading:boolean,
        messages:[]
    }
}