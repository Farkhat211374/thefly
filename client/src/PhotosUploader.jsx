import axios from "axios";
import {useState} from "react";

export default function PhotosUploader({addedPhotos, onChange}){
    const [photoLink, setPhotoLink]= useState('');


    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: {'Content-type':'multipart/form-data'}
        }).then(response => {
            const {data:filenames} = response;
            onChange(prev => {
                console.log("it is "+ filenames)
                return [...prev, ...filenames];
            });
        })
    }

    return(
        <>
            <div className="flex gap-2" >
                <input
                    value={photoLink}
                    onChange={ev => setPhotoLink(ev.target.value)}
                    type="text" placeholder={'Add using a link...jpg'} />
                <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl" >Add&nbsp;photo</button>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-col-6">
                {addedPhotos.length>0 && addedPhotos.map(link => (
                    <div className="h-32 flex w-full object-cover" key={link}>
                        <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/'+link} alt=""/>
                    </div>
                ))}
                <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    );
}