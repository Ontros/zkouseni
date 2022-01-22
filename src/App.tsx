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

function loadKeys(path: string, setKey: (arg0: Questionaire) => void) {
    fetch(path).then((data) => {
        data.json().then((json) => {
            setKey(json)
            localStorage.setItem('keyUrl', path)
        })
    })

}

function App() {
    useEffect(() => {
        var url = localStorage.getItem('keyUrl')
        if (!url) {
            fetch('https://raw.githubusercontent.com/Ontros/zkouseni-keys/main/default.txt').then(response => {
                response.text().then((url: string) => {
                    loadKeys(url, setKey);
                })
            })
        }
        else {
            loadKeys(url, setKey)
        }
    }, [])

    const updateKeys = (path: string) => {
        loadKeys(path, setKey)
    }

    //Answer keys
    const [key, setKey] = useState<Questionaire>({ key1: "error", key2: "error", keys: [] })

    return key.key1 !== "error" ? <Selection questionaire={key} loadKeys={updateKeys} /> : <Loading />
}
export type Key = { a: string, b: string }[]


export default App;
