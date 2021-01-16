export default class Stat {
    constructor(id, type, name, value){
        this.id=id
        this.type = type
        this.name=name ? name : ''
        this.value=value ? value : 0
    }
}
