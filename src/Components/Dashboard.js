import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

 function Dashboard(){
    return(
       <div>
        <NavBar/>
        <Outlet/>
       </div> 
    )
 }
 export default Dashboard;