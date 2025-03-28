import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInEng from '../locales/en/translation.json';
import translationsInGerman from '../locales/sp/translation.json';
import translationsInGeorgian from '../locales/ge/translation.json';

// import fileName from "../jsconfig";
// import translationsInItalian from '../locales/it/translation.json';

// the translations
const resources = {
  English: {
    translation: translationsInEng
  },
  Spanish: {
    translation: translationsInGerman
  },
  Georgian: {
    translation: translationsInGeorgian
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources, // resources are important to load translations for the languages.
    // lng: localStorage.getItem("locale")||"Spanish", // It acts as default language. When the site loads, content is shown in this language.  
    // lng: (fileName.name === "Riverpoker" || fileName.name === "Leader_bet" ? localStorage.getItem("locale") || "Georgian" : localStorage.getItem("locale") || "Spanish"), // It acts as default language. When the site loads, content is shown in this language.  
    lng: "English",
    debug: false,
    // fallbackLng: (fileName.name === "Riverpoker" || fileName.name === "Leader_bet" ? "English" : "Spanish"), // use de if selected language is not available
    fallbackLng: "English",
    interpolation: {
      escapeValue: false
    },
    ns: "translation", // namespaces help to divide huge translations into multiple small files.
    defaultNS: "translation"
  });
// if (fileName.name === "Riverpoker") {
//   localStorage.setItem("locale", "English")
// } else {
//   localStorage.removeItem("locale")
// }

export default i18n;