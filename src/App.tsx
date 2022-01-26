/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.css';
import Loading from './Loading';
import Selection from './Selection';

export type Questionaire = {
    key1: string,
    key2: string,
    keys: Key
}

const wrongURL = () => {
    alert("Something is wrong with the URL you entered (or you might be offline)")
    // window.location.reload()
}

function loadKeys(path: string, setKey: (arg0: Questionaire) => void, setIsLoading: (arg0: boolean) => void) {
    fetch(path).then((data) => {
        data.json().then((json) => {
            if (!json.key1 || !json.key2 || !json.keys) {
                wrongURL()
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
                    loadKeys(url, setKey, setIsLoading);
                })
            })
        }
        else {
            loadKeys(url, setKey, setIsLoading)
        }
    }, [])

    const updateKeys = (path: string) => {
        loadKeys(path, setKey, setIsLoading)
    }

    //Answer keys
    const [key, setKey] = useState<Questionaire>({ key1: "error", key2: "error", keys: [] })
    const [isLoading, setIsLoading] = useState<boolean>(true)

    return isLoading ? <Loading /> : <Selection questionaire={key} loadKeys={updateKeys} />
    // return key.key1 !== "error" ? <Selection questionaire={key} loadKeys={updateKeys} /> : <Loading />
}
export type Key = { a: string, b: string }[]


export default App;
