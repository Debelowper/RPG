'use strict'

const Drive = use('Drive')
const Image = use('App/Models/Image')
const Database = use('Database')
const Env = use('Env')

class ImageController {

    async saveImage({auth, request}){

        const validationOptions = {
            types: ['jpeg', 'jpg', 'png', 'svg'],
            size: '2mb'
        }

        var body = {}

        request.multipart.field((name, value) =>{
            body[name] = value
        })

        request.multipart.file('file', validationOptions, async (file) => {
            file.size = file.stream.byteCount
            await file.runValidations()

            const error = file.error()
            if (error.message) {
              throw new Error(error.message)
            }
            body['fileName'] = auth.user.username+'_'+file.clientName

            if(!await Drive.disk('s3').exists(body['fileName'])){
                await Drive.disk('s3').put(body['fileName'], file.stream, {ContentType: file.headers['content-type'],ACL: 'public-read'})
            }else{
                throw new Error('image with that name already exists')
            }

        })

        try{
          await request.multipart.process()
        }catch(e){
          console.log(e.message)
          return e.message
        }

        const image = new Image
        image.user_id = auth.user.id
        image.name = body.name
        image.image_type_id = body.type
        image.filename = body.fileName

        try{
          await image.save()
        }catch(e){
          return e.message
        }

          return 'image saved'
    }

    async updateImage({auth, request}){

    }

    async loadImage({auth, request}){
        let id = auth.user.id

        //https://rpgtiles.s3-sa-east-1.amazonaws.com/gbelow_guilherme.jpeg

        const query = await Database.table('images').where('user_id', id)

        var images = []
        query.forEach((el)=>{
            const url = 'https://'+Env.get('S3_BUCKET')+'.s3-'+Env.get('S3_REGION')+'.'+'amazonaws.com/'+el.filename
            images.push(url)
        })

        if(images == null){
            return 'no images found!'
        }else{
            return images
        }
    }

    async deleteImage({auth, request}){
        const {fileName} = request.post()
        try{
            const file = Drive.disk('s3').delete(fileName)
        }catch(e){
            return e.message
        }
        return 'file deleted'
    }
}

module.exports = ImageController
