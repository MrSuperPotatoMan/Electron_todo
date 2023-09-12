import { List_type } from "./App"
import { Theme } from "./themes/colorThemes"
import style from "./themes/Style"
import { useState } from "react"

export default function ListArchived({data,theme,handleDeleteFromArchive,handleRecoverFromArchive,index}:Args){
    const [expanded,setExpanded] = useState(true)

    return (
    <div className={'m-2 rounded-md overflow-hidden ' + style(theme.list)}>
        <div className={"p-1 cursor-pointer " + style(theme.listHeader)} onClick={() => {setExpanded(!expanded)}}>
            <p className="px-1">{data.name}</p>
        </div>
        <div className='[&>div]:p-1' style={{height:expanded? 'auto':0}}>
            <div className="[&>p]:border-b-[1px]">
            {
                data.elements.map((el,index) => {
                    return <p key={"arch_el:" + index} className="px-2 py-1">{el.name}</p>
                })
            }
            </div>
            <div className='grid grid-cols-2 !p-0 [&>button]:p-1'>
                <button onClick={() => {handleRecoverFromArchive(index)}} className={'border-r-[1px] ' + style(theme.listAddElementButton)}>Restore <i className='bi-plus'></i></button>
                <button onClick={() => {handleDeleteFromArchive(index)}} className={style(theme.listDeleteListButton)}>Delete list <i className='bi-x'></i></button>
            </div>
        </div>
    </div>
    )
}

type Args = {
    data: List_type,
    theme : Theme,
    index: number,
    handleDeleteFromArchive: (index: number) => void,
    handleRecoverFromArchive: (index: number) => void
}