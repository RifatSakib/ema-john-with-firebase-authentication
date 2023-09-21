import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { UserContext } from '../../App';
const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    //this code is copied for "react hook form"
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        
        console.log("Form Submit", data);
    
    }
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue= {loggedInUser.name} {...register("Name",  { required: true })} placeholder='Your Name'/>
        {errors.Name && <span className='error'>Name is required</span>}
        
        <input defaultValue= {loggedInUser.email} {...register("Email", { required: true })} placeholder='Your Email'/>
        {errors.Email && <span className='error'>Email is required</span>}
        
        <input {...register("Address", { required: true })} placeholder='Your Address' />
        {errors.Address && <span className='error'>Address is required</span>}
        
        <input {...register("Phone", { required: true })} placeholder='Your phone' />
        {errors.Phone && <span className='error'>Phone is required</span>}
        
       <input type="submit" />
      </form>
    );
};

export default Shipment;