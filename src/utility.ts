export function Capitalize(text: string) {
    if (text && text.length) {
        return text[0].toUpperCase() + text.substring(1) 
    }
    return text
}