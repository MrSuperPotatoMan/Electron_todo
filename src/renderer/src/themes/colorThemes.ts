import t1 from "./list/t1"
import t2 from "./list/t2"

const themes:{
    [index: string]: Theme,
} = {
    t1,
    t2
}

export default themes

const themesInfo:{name:string, icon: string}[] = []

for(const key in themes){
    themesInfo.push({
        name: key,
        icon: themes[key].icon
    })
}

export {themesInfo}

interface StyleObject{
    background?: string,
    border?: string,
    color?: string,
    boxShadow?: string,
    transition?: string,
    ":hover"?:{
        background?: string,
        border?: string,
        color?: string,
        boxShadow?: string,
    }
}

interface RenameTagTheme {
    global?: StyleObject,
    input?: StyleObject,
    pen?: StyleObject,
    apply?: StyleObject,
    discard?: StyleObject,
    checked?: StyleObject
}

interface Theme {
    [index: string]: any,
    body?: StyleObject,
    bodyHover?: StyleObject, 
    list?: StyleObject,
    listHeader?: StyleObject,
    listHeaderRenameTag?: RenameTagTheme,
    listElementRenameTag?: RenameTagTheme,
    listElement?: StyleObject,
    listElementCheckoxEmpty?: StyleObject,
    listElementCheckoxChecked?: StyleObject,
    listElementDeleteButton?: StyleObject,
    listAddElementButton?: StyleObject,
    listDeleteListButton?: StyleObject,
    newListButton?: StyleObject,
    optionsButton?: StyleObject,
    optnionsPanel?: StyleObject,
    moveToAchiveButton?: StyleObject,
    navButton?: StyleObject,
    navButtonActive?: StyleObject,
    icon: string,
    name: string
}

export type {Theme,StyleObject,RenameTagTheme}
