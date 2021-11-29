/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useEffect, useState } from 'react';
import './App.css';
import Loading from './Loading';
import Selection from './Selection';

export type Preset = {
    key1: string,
    key2: string,
    keys: Key
}

function App() {
    useEffect(() => {
        console.log("fetch")
        var L19 = `${window.location.href}/presets/rustinka/slovicka-L19.json`
        const chem = `${window.location.href}/presets/chemie/prvky.json`
        fetch(L19).then((data) => {
            data.json().then((json) => {
                setKey(json)
            })
        })
    }, [])

    const [key, setKey] = useState<Preset>({ key1: "error", key2: "error", keys: [] })

    return key.key1 !== "error" ? <Selection preset={key} /> : <Loading />
}
export type Key = { a: string, b: string }[]


export default App;
