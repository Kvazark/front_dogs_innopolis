import React from 'react';
import styles from './mainStyles.module.scss'
import {NavLink} from "react-router-dom";
import FileUpload from "../components/FileUpload";

const BreedDefinition = () => {

    return (
        <section className={styles.container_breed_definition}>
            <NavLink
                className={`${styles.navlink} ${styles.btnback}`}
                to={"/"}
                style={{  position: "absolute"}}>
                TO THE MAIN PAGE
            </NavLink>
            <FileUpload></FileUpload>
        </section>
    );
};

export default BreedDefinition;