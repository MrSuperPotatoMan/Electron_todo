import { StyleObject, Theme } from './themes/colorThemes'
import RenameTag from './RenameTag'
import { useState } from 'react'
import style from './themes/Style'

type Props = {
    children: JSX.Element,
    buttonRight: {
        theme: StyleObject,
        clickCallBack: () => void,
        innerText: string | JSX.Element
    },
    buttonLeft: {
        theme: StyleObject,
        clickCallBack: () => void,
        innerText: string | JSX.Element
    },
    archivable: boolean,
    archiveCallBack?: () => void,
    theme: Theme
}

function ListPrototype({children,buttonLeft,buttonRight,archivable,archiveCallBack,theme}: Props) {
    const [expanded,setExpanded] = useState(true)

    return (
        <div className={'m-2 rounded-md overflow-hidden ' + style(theme.list)}>
            <div className={"p-1 cursor-pointer " + style(theme.listHeader)} onClick={() => {setExpanded(!expanded)}}>
                {/* <RenameTag theme={theme.listHeaderRenameTag} defaultText={data.name} changeCb={(newName:string) => {handleRenameList(newName,listIndex)}}/> */}
            </div>
            <div className='[&>div]:p-1' style={{height:expanded? 'auto':0}}>
            {children}
            <div className='grid grid-cols-2 !p-0 [&>button]:p-1'>
                <button onClick={buttonLeft.clickCallBack} className={'border-r-[1px] ' + style(buttonLeft.theme)}>{buttonLeft.innerText}</button>
                <button onClick={buttonRight.clickCallBack} className={style(buttonRight.theme)}>{buttonRight.innerText}</button>
            </div>
            <div className="!p-0 transition-all" style={{height: archivable? "2.5rem" : "0"}}>
                <button onClick={archiveCallBack} className={"text-center w-full py-2 overflow-hidden " + style(theme.moveToAchiveButton)}>
                Move to achive
                </button>
            </div>
            </div>
        </div>
    )
}

export default ListPrototype