import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import List from './List';
import Options from './Options';
import themes from './themes/colorThemes'
import style from './themes/Style';
import ListDeleted from './ListDeleted';
import ListArchived from './ListArchived';

export default function App() {
  const [isDataLoaded,setIsDataLoaded] = useState(false);
  const [isOptionsShown,setIsOptionsShown] = useState(false);
  const [currentPage,setCurrentPage] = useState('lists') as ['lists' | 'archived' | 'trash', Dispatch<SetStateAction<'lists' | 'archived' | 'trash'>>];
  const [data,setData] = useState() as [Data, Dispatch<SetStateAction<Data>>];
  const theme = data? themes[data.theme] : themes['t1']

  useEffect(()=>{
    window.electron.ipcRenderer.invoke('read').then((res: string) => {
      const data = JSON.parse(res) as Data
      setData({todos:data.todos,deleted:data.deleted,archived:data.archived,theme: data.theme})
    }).then(()=>{ 
      setIsDataLoaded(true)
    })
  },[])
  
  useEffect(() => {
    if(isDataLoaded){
      saveData();
    }
  },[data])

  return (
    <div className={'h-screen overflow-hidden ' + style(theme.body)}>
      <div className='grid grid-cols-3 justify-items-stretch select-none '>
        {
          (['archived','lists','trash'] as const).map(el => {
            return <button
              key={el}
              onClick={()=>{setCurrentPage(el)}}
              className={'capitalize p-1 ' + style(theme.navButton) + ' ' +( currentPage == el? style(theme.navButtonActive):'')}
            >{el}</button>
          })
        }
      </div>
      <div
        className='[&>div]:overflow-y-auto [&>div]:pb-10 h-screen w-[300vw] pb-14 grid grid-cols-3 transition-all'
        style={{translate:currentPage == 'lists'? '-33.33%':currentPage =='archived'?"0":"-66.66%"}}
      >
        <div>
          {
            data?.archived.map((el,index) => {
              return <ListArchived
                key={"arch" + index}
                index={index}
                theme={theme}
                data={el}
                handleDeleteFromArchive={handleDeleteFromArchive}
                handleRecoverFromArchive={handleRecoverFromArchive}
              />
            })
          }
          {
            data?.archived.length === 0 && <p className='text-center mt-10'>Archive is empty</p>
          }
        </div>
        <div>
        {
            data?.todos.map((list,index) => {
              return <List
                theme={theme}
                listIndex={index}
                key={"list:" + index}
                data={list}
                handleAddElement={handleAddElement}
                handleCheckElement={handleCheckElement}
                handleDeleteList={handleDeleteList}
                handleDeleteListElement={handleDeleteListElement}
                handleRenameList={handleRenameList}
                handleRenameListElement={handleRenameListElement}
                handleMoveToArchive={handleMoveToArchive}
              />
            })
          }
          {
            data?.todos.length == 0 && <p className='text-center mt-10'>Wow, such empty!</p>
          }
        </div>
        <div>
          {
            data?.deleted.length == 0 ? <p className='text-center mt-10'>Recycling has been done!</p> : 
            <>
            <p className='m-2 text-sm'>Data in trash is automaticlly deleted in 7 days. You can manualy recover list or delete it pernamently.</p>
            {data?.deleted.map((el,index) => {
              if(parseInt(el.deletedOn) + (86400000 * 7) < Date.now()){
                handleDeletePermanently(index);
                return
              }
              return <ListDeleted key={'deleted' + index} index={index} theme={theme} data={el} handleDeletePermanently={handleDeletePermanently} handleRecoverDeleted={handleRecoverDeleted}/>
            })}
            </>
          }
        </div>
      </div>
      <button onClick={handleAddList} className={'absolute bottom-2 left-2 rounded-md text-3xl py-2 px-3 h-12 ' + style(theme.newListButton)}>
        <p className='text-lg'><i className="bi-pen"></i> New todo</p>
      </button>
      <button className={'absolute bottom-2 right-2 z-10 rounded-md text-2xl p-2 w-12 h-12 ' + style(theme.optionsButton)} onClick={()=>{setIsOptionsShown(!isOptionsShown)}}>
        <i className='bi-gear flex justify-center align-middle'></i>
      </button>
      <Options handleImportData={handleImportData} theme={theme} setTheme={handleChangeTheme} handleDeleteData={handleDeleteData} isOptionsShown={isOptionsShown}/>
    </div>
  )

  function handleImportData(data:Data){
    setData(data)
  }

  function handleChangeTheme(themeName:keyof typeof themes){
    const newData = copyData();
    if (!newData) return
    newData.theme = themeName
    setData(newData)
  }

  function saveData(){
    window.electron.ipcRenderer.invoke('write',data)
  }

  function handleAddList(){
    const newData = copyData();
    if (!newData) return
    newData.todos.push({name:"New To-do",elements:[]});
    setData(newData)
  }

  function handleRenameList(newName:string,index: number){
    const newData = copyData();
    if (!newData) return
    newData.todos[index].name = newName;
    setData(newData)
  }

  function handleRenameListElement(newName:string, listIndex:number, elementIndex: number){
    const newData = copyData();
    if (!newData) return
    newData.todos[listIndex].elements[elementIndex].name = newName;
    setData(newData)
  }

  function handleDeleteList(index: number){
    const newData = copyData();
    if (!newData) return
    const deleted = newData.todos.splice(index,1);
    newData.deleted.push({deletedOn:Date.now().toString(),item:deleted[0]});
    setData(newData)
  }

  function handleDeleteListElement(listIndex: number, listElementIndex: number){
    const newData = copyData();
    if (!newData) return
    newData.todos[listIndex].elements.splice(listElementIndex,1)
    setData(newData)
  }

  function handleAddElement(index: number){
    const newData = copyData();
    if (!newData) return
    newData.todos[index].elements.push({name:'New task',done:false})
    setData(newData)
  }

  function handleCheckElement(listIndex: number, elementIndex: number, check: boolean){
    const newData = copyData();
    if (!newData) return
    newData.todos[listIndex].elements[elementIndex].done = check
    setData(newData)
  }
  
  function handleDeleteData(){
    setData({todos:[] as List_type[],deleted:[] as {item: List_type,deletedOn: string}[],archived:[] as List_type[],theme: data.theme})
  }

  function handleRecoverDeleted(index: number){
    const newData = copyData();
    if (!newData) return
    const deleted = newData.deleted.splice(index,1);
    newData.todos.push(deleted[0].item);
    setData(newData)
  }

  function handleDeletePermanently(index: number){
    const newData = copyData();
    if (!newData) return
    newData.deleted.splice(index,1);
    setData(newData)
  }

  function handleMoveToArchive(index: number){
    const newData = copyData();
    if (!newData) return
    const archived = newData.todos.splice(index,1);
    newData.archived.push(archived[0]);
    setData(newData)
  }

  function handleDeleteFromArchive(index: number){
    const newData = copyData();
    if (!newData) return
    const deleted = newData.archived.splice(index,1);
    newData.deleted.push({item:deleted[0],deletedOn:Date.now().toString()});
    setData(newData)
  }

  function handleRecoverFromArchive(index: number){
    const newData = copyData();
    if (!newData) return
    const recovered = newData.archived.splice(index,1);
    newData.todos.push(recovered[0]);
    setData(newData)
  }

  function copyData(){
    if(!data) return
    return {
      todos: data.todos.map(el => {
        return {
          ...el,
          elements: [...el.elements]
        }
      }),
      archived: data.archived.map(el => {
        return {
          ...el,
          elements: [...el.elements]
        }
      }),
      deleted: data.deleted.map((el) => {
        return {
          deletedOn: el.deletedOn,
          item: {
            ...el.item,
            elements: [...el.item.elements]
          }
        }
      }),
      theme: data.theme
    } as Data
  }
}

type Data = {
  todos: List_type[],
  archived: List_type[],
  deleted: {
    item: List_type,
    deletedOn: string,
  }[],
  theme: string | number
}

type List_element = {
  name:string,
  done:boolean
}

type List_type = {
  name: string,
  elements: List_element[],
}

export type {List_element}
export type {List_type}
export type {Data}