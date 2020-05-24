const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const mongoose = require('mongoose')

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


async function download (req, res){
  try{
    let id = req.params.id;
    const connect = mongoose.createConnection(mongoURI,{ useNewUrlParser:true, useUnifiedTopology: true})
    connect.once('open', () => {
      let gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: process.env.BUCKET_NAME
      })
      gfs.find({"_id": mongoose.Types.ObjectId(id)}).toArray((error, files) => {
        if(!files[0] || files.length === 0){
          send_error(res, error, "no files available")
        }
        res.setHeader('Content-Type', files[0].contentType)
        gfs.openDownloadStream(mongoose.Types.ObjectId(id)).pipe(res)
      })
    })
  }
  catch(error){
    send_error(res, error, "couldn't download file")
  }
};

async function update_metadata(req, res){
  try{
    const { id, filename } = req.body
    const connect = mongoose.createConnection(mongoURI,{ useNewUrlParser:true, useUnifiedTopology: true})
    connect.once('open', () => {
      let gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: process.env.BUCKET_NAME
      })
      gfs.rename(mongoose.Types.ObjectId(id), filename, (error) => {
        if(error === null){
          gfs.find({"_id": mongoose.Types.ObjectId(id)}).toArray((error, files) => {
            res.send(files)
          })
        }
        else{
          send_error(res, error, "failed updating filename")
        }
      })  
    })
  }
  catch(error){
    send_error(res, error, "failed updating file")
  }
}

async function get_all(req, res){
  try{
    const connect = mongoose.createConnection(mongoURI,{ useNewUrlParser:true, useUnifiedTopology: true})
    connect.once('open', () => {
      let gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: process.env.BUCKET_NAME
      })
      gfs.find({"metadata.user._id": req.params.userId}).toArray((error, files) => {
        res.send(files)
      })
    })
  }
  catch(error){
    send_error(res, error, "failed finding user associated files")
  }
}

module.exports = {
  uploadFile,
  get_all,
  download,
  update_metadata,
}