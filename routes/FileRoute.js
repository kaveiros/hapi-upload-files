const fs = require('fs');
const formidable = require('formidable');



const FileRoute = [{
    config: {
        payload: {
            maxBytes: 10485760,
            parse: true,
            output: 'stream',
            allow: 'multipart/form-data',
            multipart: true
        }
    },
    method: 'POST',
    path: '/upload',
    handler: async (request, h) => {

        let result = await storeFiles(request)


        return h.response({"Files have been uploaded succesfully":result}).code(200)
    }
}]

const storeFiles = (request) => {

    let result = [];
    try {

        const uploads = request.payload.file
        console.log(uploads)
        if (Array.isArray(uploads)) {
            for(var i = 0; i < uploads.length; i++) {
                console.log(uploads[i])
                result.push(uploads[i].hapi.filename);
                fs.writeFile("./uploads/" + uploads[i].hapi.filename, uploads[i]._data, (err)=>{
                    if(err) {
                        console.log(err)
                    }
    
                })
            }
        }
        else {
            result.push(uploads.hapi.filename);
            fs.writeFile("./uploads/" + uploads.hapi.filename, uploads._data, (err)=>{
                if(err) {
                    console.log(err)
                }
            })

        }


    } catch (error) {
        console.log(error)
    }

    return result


} 

module.exports = FileRoute