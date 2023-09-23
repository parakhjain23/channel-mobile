export interface $ChatReducerType{
    data: chatDataTypes,
    randomIdsArr: [],
}

export interface chatDataTypes{
    [key:string]:{
        isLoading:boolean,
        messages:[]
    }
}