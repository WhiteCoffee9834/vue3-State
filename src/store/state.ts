import { reactive } from "vue";
export interface isState {
  code: string;
  token: string;
  user:user;
}

interface user{
  Number:number|null;
}

export const state:isState = {
  code:"",
  token:"",
  user:{
    Number:null
  }
}

export function createState(){
  return reactive(state)
}