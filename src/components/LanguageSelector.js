import React, { useEffect, useState } from "react";
// import i18n from '../i18n';
import i18n from '../i18N/index';
import '../css/login/laguage.css'
import spanish from '../assets/images/login/Lang/Spanish.png'
import english from '../assets/images/login/Lang/English.png'
import Georgian from '../assets/images/login/Lang/Georgian.jpg'
import fileName from "../jsconfig";
const LanguageSelector = () => {
    console.log(i18n)
    // const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // i18n.language contains the language assigned to lng in i18n.js file.
    const [selectedLanguage, setSelectedLanguage] = useState(fileName.name === "Lapoker" ? "Spanish" : fileName.name === "Leader_bet" ? "Georgian" : "English"); // i18n.language contains the language assigned to lng in i18n.js file.
    // const [selectimage, setSelectimage] = useState(localStorage.getItem("locale") === "English" ? "English" : "Spanish")
    const [selectimage, setSelectimage] = useState(fileName.name === "Riverpoker" ? english : localStorage.getItem("locale") === "English" ? english : spanish)
    useEffect(() => {
        if (fileName.name !== "Riverpoker" || fileName.name !== "Leader_bet") {
            var lang = localStorage.getItem("locale")
            if (lang === "English") {
                setSelectimage(english)
            } else if (lang === "Spanish") {
                setSelectimage(spanish)
            } else if (lang === "Georgian") {
                setSelectimage(Georgian)
            }
            setSelectedLanguage("Spanish");
        } else {
            setSelectimage(english);
            setSelectedLanguage("English");
        }
    }, [])
    const chooseLanguage = (e) => {
        e.preventDefault();
        i18n.changeLanguage(e.target.value);   // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
        setSelectedLanguage(e.target.value);
        if (e.target.value === "English") {
            setSelectimage(english)
        } else if (e.target.value === "Spanish") {
            setSelectimage(spanish)

        }
        else if (e.target.value === "Georgian") {
            setSelectimage(Georgian)

        }
        localStorage.setItem("locale", e.target.value);
    }


    return (
        <>
            <div className="mainlangselection">
                <img className="selectImage" src={selectimage} alt="selectImage"></img>
                <div className="select">
                    <select className="selectoption" defaultValue={selectedLanguage} onChange={chooseLanguage}>
                        <option value="Spanish">Spanish</option>
                        <option value="English">English</option>
                        <option value="Georgian">Georgian</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default LanguageSelector;