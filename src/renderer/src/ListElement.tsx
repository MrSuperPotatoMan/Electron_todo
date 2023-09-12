import { List_element } from "./App";
import RenameTag from "./RenameTag";
import style from "./themes/Style";
import { Theme } from "./themes/colorThemes";

export default function ListElement({theme,elementIndex,listIndex,data,handleCheckElement,handleDeleteListElement,handleRenameListElement}:Args){
    return (
      <div
        className='grid grid-cols-[32px_auto_28px] border-b-[1px] cursor-pointer [&>i]:mx-2 select-none'
        onClick={() => {handleCheckElement(listIndex, elementIndex,!data.done)}} 
      >
        {
          data.done?<i className={"bi-check-square-fill " + style(theme.listElementCheckoxChecked)}></i>:<i className={"bi-square " + style(theme.listElementCheckoxEmpty)}></i>
        }
        <div>
          <RenameTag checked={data.done} theme={theme.listElementRenameTag} defaultText={data.name} changeCb={handleRename}/>
        </div>
        <button className={"text-center rounded-md ml-1 " + style(theme.listElementDeleteButton)} onClick={(ev)=>{ev.stopPropagation();handleDeleteListElement(listIndex,elementIndex)}}>
          <i className="bi-trash"></i>
        </button>
      </div>
    )

    function handleRename(newName:string){
      handleRenameListElement(newName,listIndex,elementIndex)
    }
}

type Args = {
  data:List_element,
  theme: Theme,
  listIndex: number,
  elementIndex: number
  handleCheckElement: (listIndex: number ,elementIndex: number, check: boolean) => void
  handleDeleteListElement: (listIndex: number ,listElementIndex: number) => void,
  handleRenameListElement: (newName:string, listIndex:number, elementIndex: number) => void,
}