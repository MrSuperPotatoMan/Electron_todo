import {useState,MouseEvent} from 'react'
import { RenameTagTheme } from './themes/colorThemes'
import style from './themes/Style'

export default function RenameTag({defaultText,changeCb,theme,checked}:Args){
    const [isChangeMode,setIsChangeMode] = useState(false)
    const [inputValue,setInputValue] = useState(defaultText)

    return (
        <>
{        isChangeMode?
            <div className={'grid grid-cols-[auto_24px_24px] gap-1 ' + style(theme?.global)} onClick={(ev:MouseEvent)=>{ev.stopPropagation()}}>
                <input
                    spellCheck="false"
                    type='text'
                    autoFocus
                    value={inputValue}
                    onChange={(ev)=>{setInputValue(ev.target.value)}}
                    className={'rounded-md px-1 outline-none ' + style(theme?.input)}
                />
                <button className={'rounded-md text-center ' + style(theme?.apply)} onClick={handleSaveChanges}>
                    <i className='bi-check'></i>
                </button>
                <button className={'rounded-md text-center ' + style(theme?.discard)} onClick={handleDiscard}>
                    <i className='bi-x'></i>
                </button>
            </div>:
            
            <div className={'grid grid-cols-[auto_24px] ' + style(theme?.global)}>
                <p className={'pl-1 break-all select-none ' + (checked?( "line-through " + (theme?.checked? style(theme?.checked) : '')):"")}>{defaultText}</p>
                <button className={'rounded-md text-center ' + style(theme?.pen)} onClick={handleClick}>
                    <i className='bi-pen'></i>
                </button>
            </div>}
            </>
    )

    function handleClick(ev:MouseEvent){
        ev.stopPropagation()
        setIsChangeMode(true)
    }
    function handleSaveChanges(ev:MouseEvent){
        ev.stopPropagation()
        setIsChangeMode(false)
        changeCb(inputValue)
    }
    function handleDiscard(ev:MouseEvent){
        ev.stopPropagation()
        setIsChangeMode(false)
        setInputValue(defaultText)
    }
}

type Args = {
    defaultText:string,
    changeCb:(newText:string)=>void,
    theme?: RenameTagTheme,
    checked?: boolean
}