import {UserContext} from "../UserContext.jsx";
import {useContext, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";

export default function AccountPage(){
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


    function linkClasses (type=null){
        let classes = 'py-2 px-6';
        if(type === subpage){
            classes += ' bg-blue-500 text-white rounded-full';
        }
        return classes;
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return(
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
                <Link className={linkClasses('tickets')} to={'/account/tickets'}>My tickets</Link>
                <Link className={linkClasses('flights')} to={'/account/flights'}>My flights</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto" >
                    Logged in as {user.name }({user.email})<brc/>
                    <button onClick={logout} className="primary max-w-sm mt-2" >Logout</button>
                </div>
            )}
        </div>
    );
}