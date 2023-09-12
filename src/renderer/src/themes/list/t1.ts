import { Theme } from "../colorThemes"

const cPrimary = '#007bff'
const cSecondary = '#6c757d'
// const cInfo = '#17a2b8'
const cSuccess = '#28a745'
// const cWarning = '#ffc107'
const cDanger = '#dc3545'
const cDark = '#343a40'
const cLight = '#f8f9fa'
const cWhite = '#ffffff'

const t1:Theme = {
    body: {
        background: cLight,
    },
    list:{
        background: cWhite,
        boxShadow: "0 2px 4px -2px " + cSecondary
    },
    listHeader:{
        background: cPrimary,
        color: cWhite
    },
    listElement:{
        color: cDanger
    },
    listElementRenameTag:{
        checked:{
            color: cSecondary
        },
        apply:{
            background: cSuccess,
            color: cWhite,
            transition:"0.1s",
            ":hover":{
                boxShadow: "0 0 0 1px " + cSuccess
            }
        },
        discard:{
            color: cWhite,
            background: cDanger,
            transition:"0.1s",
            ":hover":{
                boxShadow: "0 0 0 1px " + cDanger
            }
        },
        pen:{
            ":hover":{
                boxShadow: "0 0 6px -1px " + cSecondary
            }
        },
        input:{
            boxShadow: "0 0 0 1px black"
        }
    },
    listElementCheckoxEmpty:{
    },
    listElementCheckoxChecked:{
        color: cSecondary
    },
    listElementDeleteButton:{
        // transition: '0.1s',
        ":hover":{
            background: cDanger,
            color: cWhite
        }
    },
    newListButton:{
        background: cPrimary,
        boxShadow: "0 0 10px -2px " + cLight,
        transition: '0.2s',
        color: cWhite,
        ":hover":{
            background: cLight,
            color: cPrimary
        }
    },
    optionsButton:{
        background: cPrimary,
        boxShadow: "0 0 10px -2px " + cLight,
        color: cWhite,
        transition: '0.2s',
        ":hover":{
            background: cLight,
            color: cPrimary
        }
    },
    listHeaderRenameTag:{
        input:{
            background: cLight,
            color: cDark
        },
        apply:{
            background:cSuccess,
            transition:"0.1s",
            ":hover":{
                boxShadow: "0 0 0 2px " + cSuccess
            }
        },
        discard:{
            background:cDanger,
            transition:"0.1s",
            ":hover":{
                boxShadow: "0 0 0 2px " + cDanger
            }
        },
        pen:{
            transition:'0.1s',
            ":hover":{
                boxShadow:"0 0 4px 1px white"
            },
        },
    },
    optnionsPanel:{
        background: cLight
    },
    listAddElementButton:{
        transition: '0.1s',
        ":hover":{
            color: cPrimary
        }
    },
    listDeleteListButton:{
        transition: '0.1s',
        ":hover":{
            color: cDanger
        }
    },
    moveToAchiveButton: {
        background: cSuccess,
        color: cWhite,
    },
    icon: `${cWhite} 48%, ${cPrimary} 52%`,
    name: 't1',
    navButton: {
        ":hover":{
            background: cPrimary + '11'
        }
    },
    navButtonActive: {
        color: cPrimary
    }
}

export default t1