'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------

*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', ({view, auth}) => {
    if(auth.user){
        return view.render('index')
    }else{
        return view.render('auth.login')
    }
})

Route.on('createMap').render('game.createMap').as('createMap').middleware('auth')
Route.on('createTile').render('game.createTile').as('createTile').middleware('auth')
Route.on('uploadImage').render('game.uploadImage').as('uploadImage').middleware('auth')
Route.on('createStatSystem').render('game.createStatSystem').as('createStatSystem').middleware('auth')
Route.on('createClass').render('game.createClass').as('createClass').middleware('auth')
Route.on('adventure').render('game.adventure').as('adventure').middleware('auth')

Route.group(()=>{
    Route.post('save', 'CreateSystemController.saveSystem')
    Route.post('delete', 'CreateSystemController.deleteSystem')
    Route.get('load', 'CreateSystemController.loadSystem')
}).prefix('CreateClasses/').middleware('auth')


Route.group(()=>{
    Route.post('save', 'CreateSystemController.saveSystem')
    Route.post('delete', 'CreateSystemController.deleteSystem')
    Route.get('load', 'CreateSystemController.loadSystem')
}).prefix('CreateSystem/').middleware('auth')

Route.group(()=>{
    Route.post('save', 'TileController.saveTile')
    Route.post('delete', 'TileController.deleteTile')
    Route.get('load', 'TileController.loadTile')
}).prefix('Tile/').middleware('auth')



Route.group(()=>{
    Route.post('save', 'ImageController.saveImage' )
    Route.get('load', 'ImageController.loadImage')
    Route.post('delete', 'ImageController.deleteImage')
}).middleware('auth').prefix('Image/')

Route.group(()=>{
    Route.post('', 'UserController.register').as('register')
    Route.get('', ({view})=>{
            return view.render('auth.register')
        }).as('registerPage')
}).middleware('guest').prefix('register')

Route.group(()=>{
    Route.post('', 'UserController.login').as('login')
    Route.get('', ({view})=>{
            return view.render('auth.login')
        }).as('loginPage')
}).middleware('guest').prefix('login')

Route
.get('logout', 'UserController.logout')
.middleware('auth')
.as('logout')

Route.group(()=>{
    Route.post('save', 'MapController.saveMap')
    Route.get('load', 'MapController.loadMap')
    Route.get('list', 'MapController.listMaps')
    Route.get('delete', 'MapController.deleteMap')
}).middleware('auth').prefix('Map/')
