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

Route
    .on('/')
    .render('game.index')
    .middleware('auth')
    .as('/')


Route
  .post('register', 'UserController.register')
  .middleware('guest')
  .as('register')


Route
    .get('register', ({view})=>{
        return view.render('auth.register')
    })
    .middleware('guest')
    .as('registerPage')

Route
    .get('login', ({view}) =>{
        return view.render('auth.login')
    })
    .middleware('guest')
    .as('loginPage')

Route
  .post('login', 'UserController.login')
  .middleware('guest')
  .as('login')

Route
    .post('login', 'UserController.login')
    .middleware('guest')
    .as('login')

Route
  .get('users/:id', 'UserController.show')
  .middleware('auth')

  Route
    .get('logout', 'UserController.logout')
    .middleware('auth')
    .as('logout')

Route
    .post('saveMap', 'MapController.saveMap')
    .middleware('auth')

Route
    .get('loadMap', 'MapController.loadMap')
    .middleware('auth')

Route
    .get('listMaps', 'MapController.listMaps')
    .middleware('auth')

Route
    .get('deleteMap', 'MapController.deleteMap')
    .middleware('auth')
