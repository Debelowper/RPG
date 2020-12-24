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

Route.on('/').render('game.index')

Route
    .get('login', ({view}) =>{
        return view.render('auth.login')
    }).middleware('guest')

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
  .post('login', 'UserController.login')
  .middleware('guest')
  .as('login')

Route
  .get('users/:id', 'UserController.show')
  .middleware('auth')
