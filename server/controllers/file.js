const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const MongoClient = require('mongodb')

//helper function
const send_error = function(res, error = {}, message = ""){
  res.json({
    message: message,
    error
  });
}

const send_success = function(res, message = ""){
  res.json({
    message: message
  });
}

const mongoURI = process.env.DB_CONNECTION+process.env.DB_NAME

// creating storage engine
let storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      bucketName: process.env.BUCKET_NAME,
      filename: file.originalname,
      metadata:{
        user : {
          _id : req.params.userId
        }
      }
    }
  }
});

let upload = null;

storage.on('connection', (db) => {
  //Setting up upload for a single file
  upload = multer({
    storage: storage
  }).single('file1');
  
});

async function uploadFile(req, res){
  upload(req, res, (err) => {
    if(err){
      return send_error(res, err, "can't upload file")
    }
    send_success(res, "uploaded file successfully")
  });
};

module.exports = {
  uploadFile,
}