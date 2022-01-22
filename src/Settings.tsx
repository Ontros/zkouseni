import React, { useState } from 'react'
import { Questionaire, Key } from './App'
import { ReactComponent as Close } from './close.svg'
import { CSSTransition } from 'react-transition-group'

type Props = {
    from: number,
    end: number,
    changeFrom: (event: any) => void,
    changeEnd: (event: any) => void,
    changeAskForSecond: (event: any) => void,
    questionaire: Questionaire,
    areSettingsOpen: boolean,
    setAreSettingsOpen: (arg0: boolean) => void,
    loadKeys: (arg0: string) => void
}

export default function Settings(props: Props) {

    //TODO: split CSS into multiple fiels, error handling, chrome blue input outline, settings window scroll, css specificy of text color
    const { from, end, changeFrom, changeEnd, changeAskForSecond, questionaire, areSettingsOpen, setAreSettingsOpen, loadKeys } = props

    const [keyPath, setKeyPath] = useState(localStorage.getItem('keyUrl') || '')

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
                    <div className="text-input-title">lkafsdjlfkj</div>
                    <div className="settings-row space-around">
                        <label className="radio-container">
                            <input type="radio" value="1" name="quest" className="radio" /> {questionaire.key1}
                        </label>
                        <label className="radio-container">
                            <input type="radio" value="2" name="quest" className="radio" /> {questionaire.key2}
                        </label>
                    </div>
                </div >
            </div>
        </CSSTransition>
    )
}