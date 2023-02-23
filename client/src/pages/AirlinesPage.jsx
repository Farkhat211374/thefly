import {Link, useParams } from "react-router-dom";

import PlanesFormPage from "./AirlinesFormPage";
import AdminAccountNavigation from "../AdminAccountNavigation";

export default function AirlinesPage(){

    return(
        <div>
            <AdminAccountNavigation/>
            list of all added planes<br/>

            <div className="text-center">
                <Link className="inline-flex gap-1 bg-blue-500 text-white py-2 px-6 rounded-full" to={'/admin/planes/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Add new plane
                </Link>
            </div>
        </div>
    );
}