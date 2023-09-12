import { StyleSheet,css } from "aphrodite"
import { StyleObject } from "./colorThemes";

export default function style(style?:StyleObject){
    const s = StyleSheet.create({
        a: {...style}
    })
    return css(s.a)
}