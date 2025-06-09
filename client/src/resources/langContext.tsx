import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { he } from "./he";
import { en } from "./en";

const resources = { he, en };

type LangKey = keyof typeof resources;

interface LangContextType {
    lang: LangKey;
    toggleLang: () => void;
    r: typeof he; // or typeof en — both have same shape
    dir: "rtl" | "ltr"
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<LangKey>(localStorage.getItem("lang") === "en" ? "en" : "he");
    const r = resources[lang];
    const dir = lang === "he" ? "rtl" : "ltr"

    const toggleLang = () => setLang(l => l === "he" ? "en" : "he");

    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang])

    return (
        <LangContext.Provider value={{ lang, toggleLang, r, dir }}>
            <div dir={dir}>
                {children}
            </div>
        </LangContext.Provider>
    );
};

export const useLang = () => {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error("useLang must be used within LangProvider");
    return ctx;
};
