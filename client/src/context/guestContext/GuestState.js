import React,{useReducer} from 'react';
import GuestContext from './guestContext'
import axios from 'axios'
import guestReducer from './guestReducer'
import { TOGGLE_FILTER,
    SEARCH_GUEST,
    CLEAR_SEARCH,
    ADD_GUEST,
    REMOVE_GUEST,
    UPDATE_GUEST,
    EDIT_GUEST,
    CLEAR_EDIT,
    GET_GUESTS,
    GUESTS_ERROR

} from '../types'
const GuestState = (props) => {
    
    const initialSate={
      
      filterGuest:false,
      search:null,
      editAble:null,
        guests:[ ],
        errors:null
    }
    const [state,dispatch]=useReducer(guestReducer,initialSate)



    const getGuests=async ()=>{
        try{
            const res=await axios.get('/guests')
            dispatch({
                type:GET_GUESTS,
                payload:res.data
            })
        }
        catch(err){
            dispatch({
                type:GUESTS_ERROR,
                payload:err.response.msg
            })
        }
    }
    
    const addGuest=async(guest)=>{
        
        const config={
            'Content-Type':'application/json'
        }
       try{
           const res =await axios.post('/guests',guest,config) 
           dispatch({
               type: ADD_GUEST,
               payload: res.data
           })
       }catch(err){
           dispatch({
               type: GUESTS_ERROR,
               payload: err.response.msg
           })
       }
    }
    const removeGuest=async(id)=>{
       try{
        await axios.delete(`/guests/${id}`)
        dispatch({
            type:REMOVE_GUEST,
            payload:id
        })
       }catch(err){
           dispatch({
               type: GUESTS_ERROR,
               payload: err.response.msg
           })
       }
    }
    const updateGuest=async(guest)=>{
      const config={
          headers:{
              'Content-Type':'application/json'
          }
      }
      try{
          const res=await axios.put(`/guests/${guest._id}`,guest,config)
          dispatch({
              type: UPDATE_GUEST,
              payload: res.data
          })
      }catch(err){
          dispatch({
              type: GUESTS_ERROR,
              payload: err.response.msg
          })
      }
    }
    const editGuest = (guest) => {
        dispatch({
            type:EDIT_GUEST,
            payload: guest
        })
    }
    const clearEdit = () => {
        dispatch({
            type: CLEAR_EDIT
        })
    }
    const toggleFilter=()=>{
        dispatch({
            type:TOGGLE_FILTER
        })
    }
    const searchGuest=(guest)=>{
        dispatch({
            type:SEARCH_GUEST,
            payload:guest
        })
    }
    const clearSearch=()=>{
        dispatch({
            type:CLEAR_SEARCH
        })
    }
    return (
    <GuestContext.Provider
    value={{
        guests:state.guests,
        filterGuest:state.filterGuest,
        search:state.search,
        editAble:state.editAble,
        addGuest,
        updateGuest,
        getGuests,
        toggleFilter,
        editGuest,
        clearEdit,
        removeGuest,
        searchGuest,
        clearSearch
    }}
    >{props.children}</GuestContext.Provider>
    )
}

export default GuestState
