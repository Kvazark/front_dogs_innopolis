import React, {useEffect, useState} from 'react';
import "./fileUpload.css";
import axios from "axios";
import SendImage from "./SendImage'";

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
        if(selectedFile===undefined) {
            document.getElementById("image-preview").src = "";
        }
    }, [selectedFile])

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
                <SendImage file={selectedFile} nameFile={selectedFile.name}></SendImage>
            </div>}
        </div>
    );
};


export default FileUpload;