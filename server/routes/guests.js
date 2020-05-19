const router=require('express').Router()
const auth=require('../middleware/auth')
const {check,validationResult}=require('express-validator')
const Guest=require('../models/Guest')

router.get('/', auth, async (req, res) => {
    try {
        const guests = await Guest.find({ user: req.user.id })
        res.json(guests)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.post('/',auth,
[
    check('name','Please provide name').not().isEmpty(),
    check('Phone','Please provide phone').not().isEmpty()
],
 async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    const {name,Phone,deitary,isconfirmed}=req.body
    try{
        let guest=new Guest({
            user:req.user.id,
            name,
            Phone,
            deitary,
            isconfirmed
        })
        guest=await guest.save()
        res.json(guest)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.delete('/:id',auth,async(req,res)=>{
    try{
         let guest=await Guest.findById(req.params.id)
         if(!guest){
             return res.status(404).json({msg:'Guest not found'})
         }
         await Guest.findByIdAndRemove(req.params.id)
         res.send('guest removed')
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

router.put('/:id',auth,async(req,res)=>{
    const {name,Phone,deitary,isconfirmed}=req.body
    const udatedGuest={name,Phone,deitary,isconfirmed}
    try{
       let guest=await Guest.findById(req.params.id)
       if(!guest){
           return res.status(404).json({msg:'Guest not found'})
       }
       guest=await Guest.findByIdAndUpdate(req.params.id,{$set:udatedGuest},{new:true})
       res.send(guest)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }

})

module.exports=router