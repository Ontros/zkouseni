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
    setAreSettingsOpen: (arg0: boolean) => void
}

export default function Settings(props: Props) {

    const { from, end, changeFrom, changeEnd, changeAskForSecond, questionaire, areSettingsOpen, setAreSettingsOpen } = props


    return (

        <CSSTransition
            in={areSettingsOpen}
            unmountOnExit
            timeout={5000}
            classNames="settings-container-main"
        >
            <div className={'settings-container-main'}>
                <div className={'settings-container'} style={{ display: "inline" }}>
                    <div className="settings-close-row">
                        <Close className={"close"} onClick={(event: any) => {
                            setAreSettingsOpen(!areSettingsOpen)
                        }} />
                    </div>
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
        </CSSTransition>
    )
}
// <Transition
//     native
//     items={areSettingsOpen}
//     from={{ opacity: 1 }}
//     enter={{ opacity: 1 }}
//     leave={{ opacity: 1 }}

// >
//     {show => show && ((springProps: any) => (
// ))}
// </Transition>

{/* <div className={'settings-container-main'}> */ }
{/* <button className={`button`} onClick={onOpenerClick}>{`⚙️`}</button> */ }
{/* </div> */ }

//cubic-bezier(.69,-0.01,.51,1.35)
//0.5s cubic-bezier(.31,0,.44,1.37)