import { Theme } from "../colorThemes"

// const b1 = '#daf5f0'
// const b2 = '#a7dbd8'
// const b3 = '#87ceeb'
// const b4 = '#69d2e7'
// const g1 = '#b5d2ad'
// const g2 = '#bafca2'
// const g3 = '#90ee90'
// const g4 = '#7fbc8c'
// const y1 = '#fdfd9'
// const y2 = '#ffdb58'
// const y3 = '#f4d738'
// const y4 = '#e3a018'
// const r1 = '#f8d6b3'
// const r2 = '#ffa07a'
// const r3 = '#ff7a5c'
// const r4 = '#ff6b6b'
const p1 = '#fcdfff'
// const p2 = '#ffc0cb'
const p3 = '#ffb2ef'
const p4 = '#ff69b4'
// const v1 = '#e3dff2'
// const v2 = '#c4a1ff'
// const v3 = '#a388ee'
// const v4 = '#9723c9'
const white = '#ffffff'
const black = '#000000'

const t2:Theme = {
    body:{
        background: p1
    },
    list:{
        background: white,
        border: 'solid 2px black'
    },
    listHeader:{
        background: p4,
        boxShadow: '0 0 0 2px ' + black,
    },
    newListButton:{
        background: p1,
        border: 'solid 2px black'
    },
    optionsButton:{
        background: p1,
        border: 'solid 2px black'
    },
    listElementCheckoxChecked:{
        color: p4
    },
    listElementRenameTag:{
        checked:{
            color: p3
        }
    },
    icon: 'white , ' + p1,
    name: 't2'
}
export default t2