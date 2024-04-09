import { useState } from "react";
import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";

export const Sell =()=>{
    const userID=useGetUserID();
    const [cookies,]=useCookies(["access_token"]);
    const [vehicle,setVehicle]=useState({
        name:"",
        ownername: "",
        informations: [],
        imageurl:"",
        userOwner:userID,
    });

    const navigate=useNavigate();

    const handleChange=(event)=>{
        const {name,value}=event.target;
        setVehicle({...vehicle,[name]:value});
    };
    const handleInformationChange=(event,idx)=>{
        const {value}=event.target;
        const informations=vehicle.informations;
        informations[idx]=value;
        setVehicle({...vehicle,informations});
    };

    const addInformation= () =>{
        setVehicle({...vehicle,informations:[...vehicle.informations,""]});
    };
    const onSubmit= async (event)=>{
        event.preventDefault();
        try {
            await axios.post("http://localhost:3007/vehicles",vehicle,{headers:{ authorization: cookies.access_token}});
            alert("PRODUCT POSTED");
            navigate("/");
        } catch (err) {
            console.error(err);
        }


    }

    return (<div className="sell">
        <h2>SELL PRODUCTS</h2>
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label><br/>
            <input type="text" id="name" name="name" onChange={handleChange}/><br/>
            <label htmlFor="ownername">Ownername</label><br/>
            <input id="ownername" name="ownername" onChange={handleChange}></input><br/>
            <label htmlFor="informations">Information</label><br/>
            {vehicle.informations.map((information, idx) => (
                <input 
                key={idx} 
                type="text" 
                name="informations" 
                value={information} 
                onChange={(event)=> handleInformationChange(event, idx) }/>
            ))}
            <button onClick={addInformation} type="button">Add Information</button><br></br>
            <label htmlFor="model">Model</label><br/>
            <input type="number" id="model" name="model" onChange={handleChange}/><br/>
            <label htmlFor="imageurl">Image URL</label><br/>
            <input type="text" id="imageurl" name="imageurl" onChange={handleChange}/><br/>
            <button  type="submit">Sell Product</button>

        </form>
        
    </div>
    );
}