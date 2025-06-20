import { CHECK_USER_REQUEST } from "../constants/UserConstant"
import axios from "axios";

export const checkUserExists=(email)=>async(dispatch)=>{
  try {
      dispatch({type:CHECK_USER_REQUEST});

      const {data} = await axios.post(`{ServerApi}`)
  } catch (error) {
    
  }
}