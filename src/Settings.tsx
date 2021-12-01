import React, { useState } from 'react'
import { Questionaire, Key } from './App'
import { ReactComponent as Close } from './close.svg'
type Props = {
    from: number,
    end: number,
    changeFrom: (event: any) => void,
    changeEnd: (event: any) => void,
    changeAskForSecond: (event: any) => void,
    questionaire: Questionaire,
    areSettingsOpen: boolean
}

export default function Settings(props: Props) {

    const { from, end, changeFrom, changeEnd, changeAskForSecond, questionaire, areSettingsOpen } = props


    return (
        <div className={'settings-container-main'}>
            <div className={'settings-container'} style={{ display: "inline" }}>
                <div className="settings-close-row"><Close className={"close"} /></div>
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