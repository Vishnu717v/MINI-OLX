import { useEffect,useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import {useGetUserID} from "../hooks/useGetUserID";
import "./home.css";


export const Home =()=>{
    const [vehicles,setVehicle] = useState([]);
    const [savedVehicles,setSavedVehicle] = useState([]);
    const [cookies,]=useCookies(["access_token"]);
    const userID = useGetUserID();
    useEffect(()=>{
        const fetchVehicle=async()=>{
            try {
                const response=await axios.get("http://localhost:3007/vehicles");
                setVehicle(response.data);
                
            } catch (err) {
                console.error(err);
            }
    
        };
         const fetchSavedVehicle=async()=>{
            try {
                const response=await axios.get(`http://localhost:3007/vehicles/savedVehicles/ids/${userID}`);
                setSavedVehicle(response.data.savedVehicles);
                
            } catch (err) {
                console.error(err);
            };
    
        }

        fetchVehicle();
        if(cookies.access_token) fetchSavedVehicle();
    }, []);
    const saveVehicle=async (vehicleID)=>{
         try {
                const response=await axios.put("http://localhost:3007/vehicles",{
                    vehicleID,
                    userID
                },{headers:{ authorization: cookies.access_token}});
                setSavedVehicle(response.data.savedVehicles);
                
            } catch (err) {
                console.error(err);
            };
    
    }

    const isVehicleSaved=(id)=>savedVehicles.includes(id);
    
    


    return <div  >
        <h1 className="head">Vehicles</h1>
        
        <ul>
            {vehicles.map((vehicle)=>(
                   <li key={vehicle._id}>
                   
                   <div className="bor">
                   
                        <div >
                        <h2>
                        {vehicle.name}
                        </h2>
                        <button onClick={()=> saveVehicle(vehicle._id)} disabled={isVehicleSaved(vehicle._id)}
                        >
                            {isVehicleSaved(vehicle._id)? "Saved" : "Save"}
                        </button>
                        </div>
                        <p>{vehicle.ownername}</p>

                   
                        <div className="informations">
                        <p>{vehicle.informations}</p>
                        </div>
                        <div className="pic">
                        <img src={vehicle.imageurl} alt={vehicle.name}/>
                        
                        <p><b>Model :</b> {vehicle.model}</p>
                        </div>
                        </div>
                    </li>
                    
                ))}
        </ul>
    </div>
}