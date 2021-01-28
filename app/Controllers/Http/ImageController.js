'use strict'

const Drive = use('Drive')
const Image = use('App/Models/Image')
const Database = use('Database')
const Env = use('Env')
const sharp = require('sharp')

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


        let transform = sharp()

        request.multipart.file('file', validationOptions, async (file) => {
            file.size = file.stream.byteCount
            await file.runValidations()

            const error = file.error()
            if (error.message) {
              throw new Error(error.message)
            }
            body['fileName'] = auth.user.username+'_'+file.clientName

            //resizing image with sharp
            const data = await transform
                .resize({
                    height:1024,
                    width:1024,
                    fit:sharp.fit.fill,
                })
                .jpeg({
                  quality: 100,
                  chromaSubsampling: '4:4:4'
                })
                .toFormat('jpeg')

            file.stream.pipe(transform).pipe(data)
              ///

            if(!await Drive.disk('s3').exists(body['fileName'])){
                await Drive.disk('s3').put(body['fileName'], data, {ContentType: 'jpeg',ACL: 'public-read'})
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
        image.name = auth.user.username+'_'+body.name
        image.image_type_id = body.type
        image.filename = body.fileName

        try{
          await image.save()
        }catch(e){
          return e.message
        }

          return 'image saved'
    }

    async loadImage({auth}){
        let id = auth.user.id

        //https://rpgtiles.s3-sa-east-1.amazonaws.com/gbelow_guilherme.jpeg

        const query = await Database.table('images').where('user_id', id)

        var images = []
        query.forEach((el)=>{
            const url = 'https://'+Env.get('S3_BUCKET')+'.s3-'+Env.get('S3_REGION')+'.'+'amazonaws.com/'+el.filename

            let name = el.name.split('_').shift()
            el.name = el.name.replace(name+'_', '')

            images.push({id:el.id, url: url, name: el.name, type: el.image_type_id  })
        })

        if(images == null){
            return 'no images found!'
        }else{
            return images
        }
    }

    async deleteImage({auth, request}){
        const {imgId} = request.post()
        let file = await Database.table('images').where('id', imgId).first()
        try{
            const msg = await Drive.disk('s3').delete(file.filename)
        }catch(e){
            return e.message
        }

        const affectedRows = await Database.table('images').where('id', imgId).delete()
        return 'file deleted'
    }
}

module.exports = ImageController
