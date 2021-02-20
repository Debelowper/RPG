import React, {useEffect} from 'react'
import ActionMenu from './ActionMenu'
import {move} from './Move'
import {spawn} from './Spawn'
import {attack} from './Attack'
import {castSpell} from './CastSpell'

export default function ActionController({characters, structures, tiles, selectedAction, setSelectedAction, setAction, currentCharacter, setActionFunction, inCombat, isYourTurn}){

    const buildAction = () => {
        if(isYourTurn || !inCombat){
            switch(selectedAction.name){
                case 'move':
                    return move({
                        characters: characters,
                        structures: structures,
                         tiles: tiles,
                         currentCharacter:currentCharacter,
                         setAction: setAction,
                         option: selectedAction.option,
                         inCombat: inCombat
                     })
                     break
                case 'attack':
                    return attack({
                        characters: characters,
                        structures: structures,
                        tiles: tiles,
                        currentCharacter:currentCharacter,
                        setAction: setAction,
                        option: selectedAction.option,
                        inCombat: inCombat
                    })
                    break
                case 'castSpell':
                    return castSpell({
                        characters: characters,
                        structures: structures,
                        tiles: tiles,
                        currentCharacter:currentCharacter,
                        setAction: setAction,
                        option: selectedAction.option,
                        inCombat: inCombat
                    })
                    break
                case 'spawn':
                    return spawn({
                        characters: characters,
                        currentCharacter: currentCharacter,
                        setAction: setAction
                    })
                    break
                default:
                return ()=>console.log('select an action')
            }
        }else{
            return () => console.log('cant go now')
        }

    }

    useEffect(()=>{
        setActionFunction(buildAction)
    }, [JSON.stringify(selectedAction), JSON.stringify(characters), JSON.stringify(structures), JSON.stringify(tiles), currentCharacter, inCombat])

    return(
        <ActionMenu
            setSelectedAction={setSelectedAction}
            selectedAction={selectedAction}
            actionList={characters[currentCharacter] ? characters[currentCharacter].actions : {}}
        />
    )
}
