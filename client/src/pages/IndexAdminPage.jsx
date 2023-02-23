import {UserContext} from "../UserContext.jsx";
import {useContext, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import PlanesPage from "./PlanesPage";
import AdminAccountNavigation from "../AdminAccountNavigation";

export default function IndexAdminPage() {
    const [redirect, setRedirect] = useState(null);
    const {ready,user,setUser} = useContext(UserContext)

    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile';
    }

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }


    if(!ready){
        return 'Loading...';
    }


    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }




    if(redirect){
        return <Navigate to={redirect} />
    }
    return(
        <div>

            <AdminAccountNavigation/>

            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto" >
                    Logged in as {user.name }({user.email})<brc/>
                    <button onClick={logout} className="primary max-w-sm mt-2" >Logout</button>
                </div>
            )}
            {subpage === 'planes' && (
                <PlanesPage/>
            )}
        </div>
    );
}






