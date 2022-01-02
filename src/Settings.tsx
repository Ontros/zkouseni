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

    const { from, end, changeFrom, changeEnd, changeAskForSecond, questionaire, areSettingsOpen, setAreSettingsOpen, loadKeys } = props

    const [keyPath, setKeyPath] = useState('')

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
            classNames="settings-container-main"
        >
            <div className={'settings-container-main'}>
                <div className={'settings-container'} style={{ display: "inline" }}>
                    <div className="settings-close-row">
                        <Close className={"close"} onClick={(event: any) => {
                            setAreSettingsOpen(!areSettingsOpen)
                        }} />
                    </div>
                    <div className="text-input-title">Url of Key JSON:</div>
                    <div className="settings-row space-between">
                        {/* Key Path Input */}
                        <input className="text-input flex-grow" type="text" value={keyPath} onKeyDown={inputKeyDown} onChange={changeKeyPath} />
                        <div className="button" style={{ margin: '.2em 0 .2em 1em', marginRight: 0 }} onClick={() => {
                            loadKeys(keyPath)
                        }}>Confirm</div>
                    </div>
                    <div className="settings-row space-between">
                        <div className="from-to">
                            <input type="number" className="num-selection" value={from} onChange={changeFrom} />
                            <input type="number" className="num-selection" value={end} onChange={changeEnd} />
                        </div>
                        <div onChange={changeAskForSecond} className="radioContainer">
                            <input type="radio" value="1" name="quest" className="radio" /> {questionaire.key1}
                            <input type="radio" value="2" name="quest" className="radio" /> {questionaire.key2}
                        </div>
                    </div>
                </div >
            </div>
        </CSSTransition>
    )
}