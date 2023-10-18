import React, {useEffect, useState} from 'react';
import "./fileUpload.css";
import axios from "axios";

const FileUpload = () => {
    ////при захвате файла и наведении на область срабатывает
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = () => {
        document.getElementById("dropcontainer").classList.add("drag-active");
    };

    const handleDragLeave = () => {
        document.getElementById("dropcontainer").classList.remove("drag-active");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        document.getElementById("dropcontainer").classList.remove("drag-active");
        document.getElementById("images").files = e.dataTransfer.files;
        handleFileChange(e);
    };
    const [selectedFile, setSelectedFile] = useState('');

    function checkInputImage(){
        if (selectedFile) {
            let reader = new FileReader()
            reader.onloadend = (event) => {
                document.getElementById("image-preview").src = event.target.result;
            }
            reader.readAsDataURL(selectedFile)
        }else   document.getElementById("image-preview").src = "";
    }
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    useEffect(() => {
        checkInputImage();
        console.log(selectedFile===undefined)
        if(selectedFile===undefined) document.getElementById("image-preview").src = "";
    }, [selectedFile])

    ////////axios post///////////////////
    const [responsee, setResponse] = useState("");
    const uploadImage = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:8001/img_object_detection_to_json', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                alert('фотография обрабатывается...')
                setResponse(response.data)
                console.log(responsee);
            })
            .catch(error => {
                console.log(error);
            });
    };
    return (
        <div className="main-block">
            <label htmlFor="images" className="drop_container" id="dropcontainer">
                <input type="file" id="images" accept="image/*" required
                       onDragOver={handleDragOver}
                       onDragEnter={handleDragEnter}
                       onDragLeave={handleDragLeave}
                       onDrop={handleDrop}
                       onChange={handleFileChange}
                />
            </label>
            <div className={selectedFile? "image-view":"image-notview"}>
                <img src="" id="image-preview" />
            </div>
            {selectedFile &&
            <div>
                <button className="btn-todetermine"
                onClick={()=>{uploadImage(selectedFile)}}>
                    find out the breed
                </button>
            </div>}
        </div>
    );
};


export default FileUpload;