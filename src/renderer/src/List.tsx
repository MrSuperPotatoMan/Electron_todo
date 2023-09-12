import { List_type } from "./App"
import 'bootstrap-icons/font/bootstrap-icons.css';
import ListElement from "./ListElement";
import RenameTag from "./RenameTag";
import { Theme } from "./themes/colorThemes";
import style from "./themes/Style";
import { useState } from "react";


export default function List({theme,data,handleMoveToArchive,handleAddElement,handleDeleteList,handleDeleteListElement,handleRenameList,handleRenameListElement,handleCheckElement,listIndex}:Args){

  const [expanded,setExpanded] = useState(true)

  return (
    <div className={'m-2 rounded-md overflow-hidden ' + style(theme.list)}>
      <div className={"p-1 cursor-pointer " + style(theme.listHeader)} onClick={() => {setExpanded(!expanded)}}>
        <RenameTag theme={theme.listHeaderRenameTag} defaultText={data.name} changeCb={(newName:string) => {handleRenameList(newName,listIndex)}}/>
      </div>
      <div className='[&>div]:p-1' style={{height:expanded? 'auto':0}}>
        {data.elements.map((el,index) => {
          return <ListElement
          theme={theme}
          key={"list" + listIndex + index}
          data={el}
          listIndex={listIndex}
          elementIndex={index}
          handleCheckElement={handleCheckElement}
          handleDeleteListElement={handleDeleteListElement}
          handleRenameListElement={handleRenameListElement}
          />
        })}
        <div className='grid grid-cols-2 !p-0 [&>button]:p-1'>
          <button onClick={() => {handleAddElement(listIndex)}} className={'border-r-[1px] ' + style(theme.listAddElementButton)}>Add Element <i className='bi-plus'></i></button>
          <button onClick={() => {handleDeleteList(listIndex)}} className={style(theme.listDeleteListButton)}>Delete list <i className='bi-x'></i></button>
        </div>
        <div className="!p-0 transition-all" style={{height: (data.elements.every(el => el.done) && data.elements.length > 0)? "2.5rem" : "0"}}>
          <button onClick={() => {handleMoveToArchive(listIndex)}} className={"text-center w-full py-2 overflow-hidden " + style(theme.moveToAchiveButton)}>
            Move to achive
          </button>
        </div>
      </div>
    </div>
  )
}

type Args = {
  theme: Theme,
  data: List_type,
  listIndex: number,
  handleRenameList: (newName:string,index: number) => void,
  handleRenameListElement: (newName:string, listIndex:number, elementIndex: number) => void,
  handleDeleteList: (index: number) => void,
  handleDeleteListElement: (listIndex: number, listElementIndex: number) => void,
  handleAddElement: (index: number) => void,
  handleCheckElement: (listIndex: number, elementIndex: number, check: boolean) => void,
  handleMoveToArchive: (index: number) => void
}