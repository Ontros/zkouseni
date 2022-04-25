/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.css';
import Loading from './Loading';
import Selection from './Selection';
//@ts-expect-error
import detectBrowserLanguage from 'detect-browser-language'
import { Lang } from './Utils'

export type Questionaire = {
    key1: string,
    key2: string,
    keys: Key,
    config: Config
}

export type Config = {
    isSwitchable?: boolean,
    allowCustomAnswers?: boolean,
    predefinedAnswers?: string[]
}

const wrongURL = (lang: number) => {
    alert(Lang(lang, ["Something is wrong with the URL you entered (or you might be offline)", "Něco je špatně se zadanou URL (nebo mohl spadnout internet)"]))
    // window.location.reload()
}

function loadKeys(lang: number, path: string, setKey: (arg0: Questionaire) => void, setIsLoading: (arg0: boolean) => void) {
    fetch(path).then((data) => {
        data.json().then((json) => {
            if (!json.key1 || !json.key2 || !json.keys) {
                wrongURL(lang)
                return
            }
            setIsLoading(true)
            setKey(json)
            localStorage.setItem('keyUrl', path)
            setIsLoading(false)
        }).catch(wrongURL)
    }).catch(wrongURL)

}

function App() {
    useEffect(() => {
        var url = localStorage.getItem('keyUrl')
        if (!url) {
            fetch('https://raw.githubusercontent.com/Ontros/zkouseni-keys/main/default.txt').then(response => {
                response.text().then((url: string) => {
                    loadKeys(lang, url, setKey, setIsLoading);
                })
            })
        }
        else {
            loadKeys(lang, url, setKey, setIsLoading)
        }
    }, [])

    const updateKeys = (path: string) => {
        loadKeys(lang, path, setKey, setIsLoading)
    }

    //Answer keys
    const [key, setKey] = useState<Questionaire>({ key1: "error", key2: "error", keys: [], config: {} })
    const [isLoading, setIsLoading] = useState<boolean>(true)
    //Language ID
    const [lang, setLang] = useState(detectBrowserLanguage().substring(0, 2).toLowerCase() === 'cs' ? 1 : 0) //1 = czech; 0 = english

    return isLoading ? <Loading /> : <Selection questionaire={key} loadKeys={updateKeys} lang={lang} setLang={setLang} />
    // return key.key1 !== "error" ? <Selection questionaire={key} loadKeys={updateKeys} /> : <Loading />
}
export type Key = { a: string, b: string }[]


export default App;
