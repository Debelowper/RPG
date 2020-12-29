'use strict'

class UserController {

    async login ({ auth, request, response }) {

        const { email, password } = request.all()

        try{
            await auth
                .remember(true)
                .attempt(email, password)
        } catch (err) {
            return response.unauthorized('wrong password')
            return response.redirect('login')
        }

        return response.redirect('/')

  }

    async register({request, response}){

        const {username, password, email} = request.post()

        const User = use('App/Models/User')

        const user = new User
        user.password = password
        user.username = username
        user.email = email

        await user.save()

        return response.redirect('login')

    }

    async logout({auth, response}){
        await auth.logout()

        return response.redirect('login')
    }


}

module.exports = UserController
