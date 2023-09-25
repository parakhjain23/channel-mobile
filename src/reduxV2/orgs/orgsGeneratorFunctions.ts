import { call, put } from "redux-saga/effects";
import { fetchOrgsApi } from "../../api/getOrgsApi/GetOrgs";
import { getAllOrgsSuccessV2, updateOrgsState } from "./orgsSlice";
import { getAllUsersOfOrgApi } from "../../api/getAllUsersofOrgApi/getAllUsers";
import { getAllUsersSuccessV2 } from "../allUsers/allUsersSlice";

export function* getAllOrgsV2(accessToken:string){
    try {
      var response = yield call(fetchOrgsApi, accessToken)
      if(response?.length == 0){
        yield put(updateOrgsState({noOrgsFound:true}))
      }else{
        yield put(getAllOrgsSuccessV2({orgs:response}))
      }
    } catch (error) {
      console.warn(error);
    }
  }
 
export function* getAllUsersOfOrgV2(data:{accessToken:string,orgId:string}){
    try {
      var response = yield call(getAllUsersOfOrgApi,data?.accessToken,data?.orgId)
      yield put(getAllUsersSuccessV2(response))
    } catch (error) {
      console.warn(error);
    }
  }