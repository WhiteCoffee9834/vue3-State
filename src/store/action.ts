import { isState } from "./state";

function updateCode(state:isState){
  return (code:string)=>{
    state.code = code
  }
}

function updateToken(state:isState){
  return (token:string)=>{
    state.token = token
  }
}

function updateUser(state:isState){
  return (user:any)=>{
    state.user = user
  }
}

export function createAction(state:isState){
  return {
    updateToken:updateToken(state),
    updateCode:updateCode(state),
    updateUser:updateUser(state)
  }
}