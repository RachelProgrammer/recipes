import { he } from "./he";
import { en } from "./en";

const langs = { he, en };

export type resource = keyof typeof he;

export let currentLang = "he" as keyof typeof langs; // deafult language

export const setLang = (lang: keyof typeof langs) => currentLang = lang;

export const getResources = () => langs[currentLang];