import React from 'react';
import styles from './mainStyles.module.scss'
import {NavLink} from "react-router-dom";

const Home = () => {
    return (
        <div className={styles.home_container}>
            <h3>Determine the breed of the dog</h3>
            <NavLink className={`${styles.navlink} ${styles.btnstart}`}
                     to={"/breedDefinition"}>
                START
            </NavLink>
        </div>
    );
};

export default Home;