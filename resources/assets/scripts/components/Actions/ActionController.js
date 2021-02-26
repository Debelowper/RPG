import React, {useEffect} from 'react'
import ActionMenu from './ActionMenu'
import {move} from './Move'
import {ability} from './Ability'

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
                        selectedAction: selectedAction,
                        inCombat: inCombat
                     })
                     break
                case null:
                    return ()=>console.log('select an action')
                default:
                    return ability({
                        characters: characters,
                        structures: structures,
                        tiles: tiles,
                        currentCharacter:currentCharacter,
                        setAction: setAction,
                        selectedAction: selectedAction,
                        inCombat: inCombat
                    })
                    break

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
