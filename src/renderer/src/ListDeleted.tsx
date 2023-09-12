import { List_type } from "./App"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Theme } from "./themes/colorThemes";
import style from "./themes/Style";
import { useState } from "react"

export default function ListDeleted({theme,data,index,handleDeletePermanently,handleRecoverDeleted}:Args){
  const [expanded,setExpanded] = useState(true)

  return (
    <div className={'m-2 rounded-md overflow-hidden ' + style(theme.list)}>
      <div className={"p-1 cursor-pointer " + style(theme.listHeader)} onClick={() => {setExpanded(!expanded)}}>
        <p className="px-1">{data.item.name}</p>
      </div>
      <div className='[&>div]:p-1' style={{height:expanded? 'auto':0}}>
        {data.item.elements.map((el,index) => {
          return <p key={"del:" + index}>{el.name}</p>
        })}
        <div className='grid grid-cols-2 !p-0 [&>button]:p-1'>
          <button className={'border-r-[1px] ' + style(theme.listAddElementButton)} onClick={() => {handleRecoverDeleted(index)}}>Recover <i className='bi-plus'></i></button>
          <button className={style(theme.listDeleteListButton)} onClick={() => {handleDeletePermanently(index)}}>Delete pernamently <i className='bi-x'></i></button>
        </div>
      </div>
    </div>
  )


}

type Args = {
  theme: Theme,
  index: number,
  data: {
    item: List_type,
    deletedOn: string,
  }
  handleDeletePermanently:(index: number) => void,
  handleRecoverDeleted:(index: number) => void,
}