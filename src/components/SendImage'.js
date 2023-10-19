import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from "../pages/mainStyles.module.scss"

const SendImage = ({file, nameFile}) => {
    const [currentNameFile, setCurrentNameFile] = useState('');
    const [checkChange, setCheckChange] = useState('');
    const uploadImage = (file) => {
        setCurrentNameFile(file.name)
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:8001/img_object_detection_to_json', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                setResult(response.data)
                setCheckChange(true)
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const [result, setResult] = useState("");
    const [breedDog, setBreedDog] = useState("");

    const [resultText, setResultText] = useState("");
    useEffect(() => {
        if (result.detect_objects) {
            if (result.detect_objects[0]) {
                setBreedDog(result.detect_objects[0].name);
                setResultText("It is a ");
            }else{
                setResultText("Breed is not found");
                setBreedDog("")
            }
        }
        if(currentNameFile !== nameFile) {
            setCheckChange(false)
        }
    },)
    const [infoDog, setInfoDog] = useState("");
    // const getInfoBreed = async (breedDog) => {
    //     try {
    //         ///поменять адрес
    //         const response = await axios.get(`https://api.api-ninjas.com/v1/dogs?name=${breedDog}`,
    //             {headers: { 'X-Api-Key': 'YOUR_API_KEY'}},
    //     )
    //
    //         setInfoDog(response.data)
    //         console.log(infoDog)
    //     } catch (error) {
    //         alert(error)
    //     }
    // };

    return (
        <div>
            <button className="btn-todetermine"
                    onClick={() => {
                        uploadImage(file)
                    }}>
                find out the breed
            </button>
            {checkChange &&
                <div className={styles.block_result_breed}>
                    <p>{resultText}<span>{breedDog ? breedDog : ""}</span>!</p>
                    {/*<button onClick={getInfoBreed}></button>*/}
                </div>
            }
        </div>

    );
};

export default SendImage;