import { orgDetailType } from "../types/orgsReducerType";

export function orgIdAndNameMappingUtility(orgs:orgDetailType[]): {[key:string]:string}{
    let orgIdAndNameMapping:{[key:string]:string} = {}
    orgs.forEach((obj)=>{
        orgIdAndNameMapping[obj.id]=obj.name
    })
    return orgIdAndNameMapping
}  