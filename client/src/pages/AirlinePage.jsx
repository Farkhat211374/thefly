import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function AirlinePage(){
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [airlines,setAirlines] = useState([]);
    useEffect(()=>{
        axios.get('/airline').then(response =>{
            setAirlines(response.data);
        })
    },[])

    async function addAirline(ev) {
        ev.preventDefault();

        try {
            await axios.post("/airline", {
                name,
                code,
            });
            alert('Registration successful. Now you can log in');

        }catch (e){
            alert('Registration failed. Please try again later');
        }
    }

    return(
        <div className="flex justify-between">
            <div className="">
                <h1>Air lines</h1>
                {airlines.length > 0 && airlines.map(airline => (
                    <div>
                        {airline.name}
                    </div>
                ))}
            </div>
            {/*   //////////////////////////////////////////////////////////     */}
            <div className="mt-4 grow flex items-center justify-around">
                <div className="mb-64">
                    <h1 className="text-4xl text-center mb-4">Add new Airline</h1>
                    <form className="max-w-md mx-auto" onSubmit={addAirline} >
                        <input type="text"
                               placeholder="name"
                               value={name}
                               onChange={ev => setName(ev.target.value)} />
                        <input type="text"
                               placeholder="code (ICAO)"
                               value={code}
                               onChange={ev => setCode(ev.target.value)} />
                        <button className="primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
}