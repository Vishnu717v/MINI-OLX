import { useEffect,useState } from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import './home.css'

export const Availableproduct =()=>{
    const [savedVehicles,setSavedVehicle] = useState([]);
    
    const userID = useGetUserID();
    useEffect(()=>{
       
         const fetchSavedVehicle=async()=>{
            try {
                const response=await axios.get(`http://localhost:3007/vehicles/savedVehicles/${userID}`);
                setSavedVehicle(response.data.savedVehicles);
                
            } catch (err) {
                console.error(err);
            };
    
        }
        fetchSavedVehicle()
    }, []);
    

    


    return <div>
        <h1 className="head">Saved Vehicles</h1>
        <ul>
            {savedVehicles.map((vehicle)=>(
                   <li key={vehicle._id}>
                   <div className="save">
                        <div>
                        <h2>
                        {vehicle.name}
                        </h2>
                        </div>
                        <p>{vehicle.ownername}</p>

                   
                        <div className="informations">
                        <p>{vehicle.informations}</p>
                        </div>
                        <div className="mod">
                        <img src={vehicle.imageurl} alt={vehicle.name}/>
                        <p><b>Model:</b> {vehicle.model}</p>
</div></div>
                    </li>
                ))}
        </ul>
    </div>
}
