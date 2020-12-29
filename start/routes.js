'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
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
    Route.post('saveMap', 'MapController.saveMap')
    Route.get('loadMap', 'MapController.loadMap')
    Route.get('listMaps', 'MapController.listMaps')
    Route.get('deleteMap', 'MapController.deleteMap')
}).middleware('auth')
