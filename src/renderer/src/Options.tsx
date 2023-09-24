import style from "./themes/Style"
import { Theme } from "./themes/colorThemes"
import { useState } from "react"
import { themesInfo } from "./themes/colorThemes"
import { Data } from "./App"

export default function Options({isOptionsShown,handleDeleteData,setTheme,theme,handleImportData}:Args){

    const [colorsExpanded, setColorsExpanded] = useState(false)
    const [deleteDataPopupExpanded,setDeleteDataPopupExpanded] = useState(false)

    return (
    <div
        className={'w-full h-screen absolute inset-0 flex flex-col items-start gap-2 p-2 transition-transform ' + style(theme.optnionsPanel)}
        style={{transform:isOptionsShown?"":"translateX(-100%)"}}
    >
        <h2 className="text-center w-full text-lg">Options</h2>
        <hr className="border-black w-full"/>
        <Header>Import / export</Header>
        <div className="grid grid-cols-2 w-full gap-1">
            <button className="bg-gray-200 p-1 rounded-sm" onClick={handleImport}>Import <i className="bi-download"></i></button>
            <button className="bg-gray-200 p-1 rounded-sm" onClick={() => {window.electron.ipcRenderer.invoke('export')}}>Export <i className="bi-upload"></i></button>
        </div>
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
                        return <ThemeListPosition key={"theme:"+ index} clickHandler={()=>{setTheme(el.name)}} iconColor={el.icon} text={el.name} />
                    })
                }
            </div>
        </div>
        <button className="text-red-500 text-center w-full hover:bg-red-500 hover:text-white rounded-sm py-1" onClick={() => {setDeleteDataPopupExpanded(true)}}>Delete all data</button>
        <div className="bg-black bg-opacity-30 absolute inset-0 flex justify-center items-center" style={{display:deleteDataPopupExpanded?"grid":"none"}}>
                <div className="rounded-sm bg-white flex flex-col">
                    <p className="mt-2 text-center">Are you sure?</p>
                    <div className="grid grid-cols-2">
                        <button className="hover:bg-gray-200 py-2 px-8" onClick={() => {setDeleteDataPopupExpanded(false);handleDeleteData()}}>Yes</button>
                        <button className="hover:bg-gray-200 py-2 px-8" onClick={() => {setDeleteDataPopupExpanded(false)}}>No</button>
                    </div>
                </div>
        </div>
    </div>
    )

    function handleImport(){
        window.electron.ipcRenderer.invoke('import')
            .then(handleImportData)
            .catch(err => alert(err))
    }

    function handleExpand(){
        setColorsExpanded(!colorsExpanded)
    }

    function ThemeListPosition({clickHandler,text,iconColor}:{clickHandler: () => void, text: string,iconColor:string}){
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
    handleDeleteData: ()=>void,
    setTheme: (themeName:keyof Theme)=>void,
    theme: Theme,
    handleImportData: (data:Data) => void
}