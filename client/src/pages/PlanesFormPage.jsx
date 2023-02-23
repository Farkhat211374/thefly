import PhotosUploader from "../PhotosUploader.jsx";
import PerksLabel from "../PerksLabel.jsx";
import {useState,Navigate} from "react";
import axios from "axios";
import AdminAccountNavigation from "../AdminAccountNavigation.jsx";

export default function PlanesFormPage(){
    const [name, setName] = useState('');
    const [year, setYear] = useState(0);
    const [addedPhotos, setAddedPhotos]= useState([]);
    const [description, setDescription] = useState('');
    const [seats, setSeats] = useState(1);
    const [perks, setPerks] = useState([]);
    const [redirect, setRedirect] = useState(false);

    function inputHeader(text){
        return(
            <h2 className="text-2xl mt-4" >{text}</h2>
        );
    }

    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm" >{text}</p>
        );
    }

    function preInput(header, description){
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function addNewPlane(ev){
        ev.preventDefault();
        const placeData = {name,year,addedPhotos,description,seats}
        await axios.post('/planes', placeData);
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to={'/admin/planes-'}/>
    }

    return(
        <div>
            <AdminAccountNavigation/>
            <form onSubmit={addNewPlane} >
                {preInput('Name', 'name of your plane. must be correct')}
                <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="name of plane" />

                {preInput('Year', 'the year from which the operation began')}
                <input type="number" value={year} onChange={ev => setYear(ev.target.valueAsNumber)} placeholder="year of starts" />

                {preInput('Photos', 'more = better')}

                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'description of the plane')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                <h2 className="text-2xl mt-4" >Perks (test) for Flight section</h2>
                <p className="text-gray-500 text-sm" >select all perks you need</p>
                <PerksLabel selected={perks} onChange={setPerks} />

                {preInput('Seats', 'number of seats in the plane')}
                <input value={seats} onChange={ev => setSeats(ev.target.valueAsNumber)} type="number" placeholder="number" />
                <button className="primary my-4">Save</button>
            </form>
        </div>
    );
}