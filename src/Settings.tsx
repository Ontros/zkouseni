import React, { useRef, useState } from 'react'
import { Questionaire, Key } from './App'
import { ReactComponent as Close } from './close.svg'
import { CSSTransition } from 'react-transition-group'
import { chyba } from './Utils'

type Props = {
    from: number,
    end: number,
    changeFrom: (event: any) => void,
    changeEnd: (event: any) => void,
    changeAskForSecond: (event: any) => void,
    questionaire: Questionaire,
    areSettingsOpen: boolean,
    setAreSettingsOpen: (arg0: boolean) => void,
    loadKeys: (arg0: string) => void,
    nextKeys: string[],
    setNextKeys: (arg0: string[]) => void
}

export default function Settings(props: Props) {

    //
    //TODO: new URL => stats dont reset,Load JSON Key by default, error handling, Language, 
    //chrome blue input outline
    const { from, end, changeFrom, changeEnd, changeAskForSecond, questionaire, areSettingsOpen, setAreSettingsOpen, loadKeys, nextKeys, setNextKeys } = props

    const [keyPath, setKeyPath] = useState(localStorage.getItem('keyUrl') || '')

    const nextKeysRow = useRef()

    const updateNextKeys = () => {
        var arr = []
        console.log(nextKeysRow)
        //@ts-expect-error
        if (!nextKeysRow.current.children) {
            chyba("589")
            return
        }
        //@ts-expect-error
        for (var label of nextKeysRow.current.children) {
            console.log(label.textContent === "Space")
            if (label.children[0].checked) {
                arr.push(label.textContent === "Space" ? " " : label.textContent)
            }
        }
        setNextKeys(arr)
    }

    const inputKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            loadKeys(keyPath)
        }
    }

    const changeKeyPath = (event: any) => {
        setKeyPath(event.target.value)
    }

    return (
        <CSSTransition
            in={areSettingsOpen}
            unmountOnExit
            timeout={500}
            classNames="settings-container-window"
        >
            <div className={'settings-container-window'}>
                <div className={'settings-container'} >
                    <div className="settings-close-row">
                        <Close className={"close"} onClick={(event: any) => {
                            setAreSettingsOpen(!areSettingsOpen)
                        }} />
                    </div>
                    <div className="text-input-title">URL to JSON with answer keys:</div>
                    <div className="settings-row space-between">
                        {/* Key Path Input https://blog.logrocket.com/using-localstorage-react-hooks/*/}
                        <textarea className="text-input flex-grow" style={{ marginRight: '1em' }} value={keyPath} onKeyDown={inputKeyDown} onChange={changeKeyPath} />
                        <div className="button" style={{ margin: '.2em 0 .2em 0em' }} onClick={() => {
                            loadKeys(keyPath.trim())
                        }}>Confirm</div>
                    </div>
                    <div className="text-input-title">Select questions from to:</div>
                    <div className="settings-row flex-center">
                        <input type="number" className="num-selection" value={from} onChange={changeFrom} />
                        <input type="number" className="num-selection" value={end} onChange={changeEnd} />
                    </div>
                    <div className="text-input-title">{"Question -> Answer"}</div>
                    <div className="settings-row space-around">
                        <label className="radio-container">
                            <input type="radio" value="1" name="quest" className="radio" onChange={changeAskForSecond} defaultChecked={true} /> {questionaire.key1}
                        </label>
                        <label className="radio-container">
                            <input type="radio" value="2" name="quest" className="radio" onChange={changeAskForSecond} /> {questionaire.key2}
                        </label>
                    </div>
                    <div className="text-input-title">{"Skip to next question by:"}</div>
                    {/*@ts-expect-error*/}
                    <div className="settings-row space-around" ref={nextKeysRow}>
                        <label className="radio-container">
                            <input onChange={updateNextKeys} className="radio" type="checkbox" defaultChecked={nextKeys.indexOf("Enter") !== -1} />Enter
                        </label>
                        <label className="radio-container">
                            <input onChange={updateNextKeys} className="radio" type="checkbox" defaultChecked={nextKeys.indexOf(" ") !== -1} />Space
                        </label>
                    </div>
                </div >
            </div>
        </CSSTransition>
    )
}