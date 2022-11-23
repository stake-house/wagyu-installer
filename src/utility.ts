export function Capitalize(text: string) {
    if (text && text.length) {
        return text[0].toUpperCase() + text.substring(1) 
    }
    return text
}

export function FormatPubkey(pubkey: string): string {
    if(pubkey && pubkey.length > 6) {
        // return pubkey.substring(0, 3) + "…" + pubkey.substring(-3, 3)
        return pubkey.substring(0, 6) + "..." + pubkey.substring(pubkey.length -6)
    }
    return pubkey 
}