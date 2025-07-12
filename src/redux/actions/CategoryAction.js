import axios from "axios";
import { FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS } from "../constants/PropertyConstant";
import { ServerApi } from "../../config/ServerApi";

export const fetchCategories=()=>async(dispatch)=>{
  try {
      dispatch({type:FETCH_CATEGORIES_REQUEST});

      const {data} = await axios.get(`${ServerApi}/category/getAll`);
      
      
      dispatch({
        type:FETCH_CATEGORIES_SUCCESS,
        payload:data.categories
      });

      
      
  } catch (error) {
         console.error("Error fetching categories:", error);
        dispatch({
            type:FETCH_CATEGORIES_FAILURE,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        });    
  }
}