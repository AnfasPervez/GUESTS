import React, { useState ,useContext,useEffect} from 'react';
import GuestContext from '../../context/guestContext/guestContext'

const GuestForm = () => {
    const context=useContext(GuestContext)
    const { addGuest, editAble, updateGuest, clearEdit } = context

   
   useEffect(()=>{
       if(editAble!==null){
           setGuest(editAble)
       }else{
           setGuest({
               name: '',
               Phone: '',
               deitary: 'Non-Veg'
           })
       }
   },[editAble,context])
    const [guest,setGuest]=useState({

        name:'',
        Phone:'',
        deitary:'Non-Veg'
    })
    const {name,Phone,deitary}=guest

    const handleChange = e=>{
        setGuest({
            ...guest,
            [e.target.name]:e.target.value
        })
    }
    const onsubmit=(e)=>{

        e.preventDefault()
        if(editAble===null)
        {
            addGuest(guest)
        }else{
       updateGuest(guest)
       clearEdit()
    }
        setGuest({
            name: '',
            Phone: '',
            deitary: 'Non-Veg'
        })

    }
    return (
        <div  className="invite-section">
            <h1>{editAble!==null?'Edit Guest':'Invite Someone'}</h1>
            <form onSubmit={onsubmit}>
                <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange}/>
                <input type="text" placeholder="Phone" name="Phone" value={Phone} onChange={handleChange}/>
                <p className="options-label">deitary</p>
                <div className="options">
                  <label className="container">Non-veg
                  <input type="radio" name="deitary" value="Non-Veg" checked={deitary === 'Non-Veg'} onChange={handleChange}/>
                  <span className="checkmark"></span>
                  </label>
                    <label className="container">Vegan
                  <input type="radio" name="deitary" value="Vegan" checked={deitary === 'Vegan'} onChange={handleChange} />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Pascatarian
                  <input type="radio" name="deitary" value="Pascatarian" checked={deitary === 'Pascatarian'} onChange={handleChange} />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <input type="submit" value={editAble !== null ? 'Update Guest' : 'Add Guest'} className="btn"/>    
            {editAble !==null?<input type="button" value="cancel" onClick={clearEdit} className="btn clear"/>:null}
            </form>
        </div>
    )
}

export default GuestForm
