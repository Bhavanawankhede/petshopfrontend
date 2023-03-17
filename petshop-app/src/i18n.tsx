import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import translationEnglish from "./Translation/English/Translation.json";
import translationHindi from "./Translation/Hindi/Translation.json";
import translationUrdu from "./Translation/Urdu/Translation.json";



//---Using translation
// const resources = {
//     en: {
//         translation: translationEnglish,
//     },
//     es: {
//         translation: translationSpanish,
//     },
//     fr: {
//         translation: translationFrench,
//     },
// }

//---Using different namespaces
const resources = {
    en: {
        home: translationEnglish,
    },
    hn: {
        home: translationHindi,
    },
    ur: {
        home: translationUrdu,
    },
}

i18next
.use(initReactI18next)
.init({
  resources,
  lng:"en", //default language
});

export default i18next;