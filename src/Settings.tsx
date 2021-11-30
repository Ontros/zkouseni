import React, { useState } from 'react'
import { Questionaire, Key } from './App'
type Props = {
    from: number,
    end: number,
    changeFrom: (event: any) => void,
    changeEnd: (event: any) => void,
    changeAskForSecond: (event: any) => void,
    questionaire: Questionaire
}

export default function Settings(props: Props) {

    const { from, end, changeFrom, changeEnd, changeAskForSecond, questionaire } = props

    const [isOpen, setIsOpen] = useState(false);

    var onOpenerClick = (event: any) => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={'settings-container-main'}>
            <div className={`settings-opener settings-opener-${isOpen ? 'open' : 'closed'}`} onClick={onOpenerClick}>
                <div className={`triangle-css triangle-${isOpen ? 'open' : 'closed'}`} ></div>
                {`Nastavení`}
            </div>
            <div className={'settings-container'} style={{ display: isOpen ? "inline" : "none" }}>
                <div className="from-to">
                    <input type="number" className="num-selection" value={from} onChange={changeFrom} />
                    <input type="number" className="num-selection" value={end} onChange={changeEnd} />
                </div>
                <div onChange={changeAskForSecond} className="radioContainer">
                    <input type="radio" value="1" name="quest" className="radio" /> {questionaire.key1}
                    <input type="radio" value="2" name="quest" className="radio" /> {questionaire.key2}
                </div>
            </div >
        </div>
    )
}
