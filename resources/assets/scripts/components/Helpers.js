
export function calcGridParams(x, y, size) {

    let kx = 0.77
    let ky = 0.88

    let spacesX = kx*2*size*x + size
    let spacesY = ky*2*size*y + size

    var viewboxParams = [-size, -size, spacesX, spacesY]

    let width = kx*x*size + 'vh'
    let height = ky*y*size + 'vh'

    return {
        x:x,
        y: y,
        width:width ,
        height:height,
        size:size,
        viewboxParams: viewboxParams
    }
}
