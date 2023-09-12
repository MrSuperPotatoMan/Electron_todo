import style from "./themes/Style"
import themes, { Theme } from "./themes/colorThemes"
import { useState } from "react"
import { themesInfo } from "./themes/colorThemes"

export default function Options({isOptionsShown,handleDeleteData,setTheme,theme}:Args){

    const [colorsExpanded, setColorsExpanded] = useState(false)

    return (
    <div
        className={'w-full h-screen absolute inset-0 flex flex-col items-start gap-2 p-2 transition-transform ' + style(theme.optnionsPanel)}
        style={{transform:isOptionsShown?"":"translateX(-100%)"}}
    >
        <h2 className="text-center w-full text-lg">Options</h2>
        <hr className="border-black w-full"/>
        <Header>Import / export</Header>
        <div className="grid grid-cols-2 w-full gap-1">
            <button className="bg-gray-200 p-1 rounded-sm">Import <i className="bi-download"></i></button>
            <button className="bg-gray-200 p-1 rounded-sm">Export <i className="bi-upload"></i></button>
        </div>
        {/* <div className="relative w-full">
            <div className="rounded-md overflow-hidden border border-black">
                <A clickHandler={handleExpand} text="Color theme" iconColor={theme.icon}/>
            </div>
            <div
                className="absolute top-10 bg-white rounded-md overflow-hidden flex flex-col w-full box-border border border-black"
                style={{display:expanded?'block':'none'}}
            >
                {
                    themesInfo.map((el, index) => {
                        return <A key={"theme:"+ index} clickHandler={()=>{setTheme(el.name)}} iconColor={el.icon} text={el.name} />
                    })
                }
            </div>
            <button onClick={handleDeleteData}>Delete data</button>
        </div> */}
        <Header>Color theme</Header>
        <div className="py-2 px-3 bg-gray-200 rounded-sm w-full flex flex-row justify-between cursor-pointer relative" onClick={handleExpand}>
            <p>
                <b>Current theme: </b>
                {theme.name}
            </p>
            
            {
                colorsExpanded? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>
            }
            <div className="absolute bg-gray-200 w-full left-0 top-10 overflow-hidden" style={{height:colorsExpanded?'auto':0}}>
                {
                    themesInfo.map((el, index) => {
                        return <A key={"theme:"+ index} clickHandler={()=>{setTheme(el.name)}} iconColor={el.icon} text={el.name} />
                    })
                }
            </div>
        </div>
        <button>Delete all data</button>
    </div>
    )

    function handleExpand(){
        setColorsExpanded(!colorsExpanded)
    }

    function A({clickHandler,text,iconColor}:{clickHandler: () => void, text: string,iconColor:string}){
        return (
            <button onClick={clickHandler} className="w-full flex flex-row justify-between p-2 hover:bg-gray-300">
                <p>{text}</p>
                <div
                    className="aspect-square w-6 rounded-sm border border-black"
                    style={
                        {backgroundImage:`linear-gradient(to bottom right ,${iconColor})`}}
                >
                </div>
            </button>
        )
    }

    function Header({children}:{children:string}){
        return <h3 className="text-center w-full text-gray-500 font-medium">{children}</h3>
    }
}

type Args = {
    isOptionsShown:boolean,
    handleDeleteData:()=>void,
    setTheme:(themeName:keyof Theme)=>void,
    theme: Theme
}