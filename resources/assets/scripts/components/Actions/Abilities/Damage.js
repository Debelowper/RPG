export function damage(damage, type, bypassDef, targetChar){
    //calculates damage
    let def = bypassDef == 'none' || bypassDef == 'percent' ? targetChar.defenses[type] : 0
    let defPercent = bypassDef == 'none' || bypassDef == 'def' ? (1-targetChar.defensesPercentage[type]/100) : 1
    let dmg = (damage - def)*defPercent
    dmg = dmg >= 0 ? dmg : 0

    //consumes action resource and sets update action
    targetChar.losses.hp +=  dmg
    return targetChar
}
