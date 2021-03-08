import {ring, line, arc} from './Shapes'
import {HexUtils, Hex} from 'react-hexgrid'

export default class RangeUtils{
    constructor(tileList, structureList, characterList, tileRefs, structRefs){
        this.tileList = tileList
        this.structureList = structureList
        this.tileRefs = tileRefs
        this.structRefs = structRefs

        this.blockingTiles = tileList.map(el => el.blocks_sight ? el.id : null)
        this.blockingStructs = structureList.map(el => el.blocks_sight ? el.id : null)

        this.coveringTiles = tileList.map(el => el.cover ? el.id : null)
        this.coveringStructs = structureList.map(el => el.cover ? el.id : null)

    }

    getLOSTiles (hex, range) {
        if(hex){
            let radiuses = this.getCircleRadiuses(hex, range)

            return this.getBlockedLines({radiuses:radiuses, blockingTiles:this.blockingTiles,
                tileRefs:this.tileRefs, blockingStructs:this.blockingStructs, structRefs:this.structRefs
            })
        }
        return {}
    }

    getAreaTargets({target, shape, source, radius=1, angle=1, canHitSelf=true}){

        let outerHexes
        let radiuses

        switch(shape){
            case 'circle':
                outerHexes = ring(target, radius)
                radiuses = outerHexes.map(el=>{
                    return line(target, el)
                })
                break
            case 'cone':
                outerHexes = arc(target, source, angle)
                radiuses = outerHexes.map(el=>{
                    return line(target, el)
                })
                break
        }


        let response = this.getBlockedLines({
            radiuses:radiuses, blockingTiles:this.coveringTiles,
            tileRefs:this.tileRefs, blockingStructs:this.coveringStructs,
            structRefs:this.structRefs, center:target, source:source
        })

        if(canHitSelf == false){
            delete response[HexUtils.getID(source)]
        }

        return response
    }

    getRangedTarget({source, target, range}){
        if(HexUtils.distance(source, target) <= range){
            const hexes = line(source, target)
            let trueTarget = null

            let covered = false
            hexes.forEach(el=>{
                if(!covered){
                    covered = this.doesThingBlockAction(this.coveringTiles , el, this.tileRefs)
                    covered = this.doesThingBlockAction(this.coveringStructs , el, this.structRefs)
                }
                if(!trueTarget && covered){
                    trueTarget = el
                }
            })
            return trueTarget ? trueTarget : target
        }else{
            return null
        }
    }

    doesThingBlockAction(thing, hex, refs){
        let tile = refs.current[HexUtils.getID(hex)]
        if(tile){
            if(thing.find(el => el == tile.pattern)){
                return true
            }
        }
        return false
    }

    getUniqueCloserNeighbours({radiuses, blockingTiles, tileRefs, blockingStructs, structRefs, center, source}){
        let neighbours = HexUtils.neighbours(center)
        let closerNeighbours = []
         neighbours.forEach(el=>{
            if(HexUtils.distance(el, source) < HexUtils.distance(center, source)){
                if(
                    !this.doesThingBlockAction(blockingTiles, el, tileRefs) &&
                    !this.doesThingBlockAction(blockingStructs, el, structRefs)
                ){
                    closerNeighbours.push(...HexUtils.neighbours(el))
                }
            }
        })

        let uniques = {}
        closerNeighbours.forEach(el => {
            uniques[HexUtils.getID(el)] = el
        })

        let index
        Object.keys(uniques).forEach((el, i)=>{
            if(HexUtils.getID(center) == el){
                index = el
            }
        })
        delete uniques[index]

        return Object.values(uniques)
    }





    getBlockedLines ({radiuses, blockingTiles, tileRefs, blockingStructs, structRefs, center=null, source=null}) {
        let reachableHexes = {}
        let newRadiuses = radiuses

        if(source && center){
            if(
                this.doesThingBlockAction(blockingTiles, center, tileRefs) ||
                this.doesThingBlockAction(blockingStructs, center, structRefs)
            ){
                let uniqueCloserNeighbours = this.getUniqueCloserNeighbours(arguments[0])

                newRadiuses = newRadiuses.filter(rad=>{
                    let x = uniqueCloserNeighbours.reduce((acc, el)=>{
                        if(rad.find(hex => HexUtils.getID(hex) == HexUtils.getID(el) )){
                            return acc || true
                        }
                        return acc
                    }, false)
                    return x
                })
            }
        }

        newRadiuses.forEach((rad)=>{
            let reachable = false
            rad.forEach(el=>{
                if(!reachable){
                    reachableHexes[HexUtils.getID(el)] = el
                    if(center != null ? HexUtils.getID(el) != HexUtils.getID(center) : true){
                        reachable = this.doesThingBlockAction(blockingTiles, el, tileRefs)
                        reachable = this.doesThingBlockAction(blockingStructs, el, structRefs)
                    }
                }
            })
        })
        return reachableHexes
    }

    getCircleRadiuses (hex, radius) {
        const outerRing = ring( hex, radius)

        const radiuses = outerRing.map(el => {
            return line(hex, el)
        })
        return radiuses
    }

}
