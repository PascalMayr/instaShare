const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const mongoose = require('mongoose')
const MongoClient = require('mongodb')
const qs = require('querystring')

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
  cache: '1', // This option enables caching the existing db connection and reuse it for more storage engines - makes the app easily scalable
  file: (req, file) => {
    return {
      bucketName: process.env.BUCKET_NAME,
      filename: file.originalname,
      metadata:{
        user : {
          _id : req.params.userId
        },
        tags : [],
        available: true,
        company: ''
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
  try{
    upload(req, res, (error) => {
      if(error){
        return send_error(res, error, "Can't upload file")
      }
      // compressing files is done by WiredTiger - no need to store zip files
      // check this blog post: https://www.mongodb.com/blog/post/new-compression-options-mongodb-30
      send_success(res, "File uploaded successfully")
    });
  }
  catch(error){
    return send_error(res, error, "Can't upload File")
  }
};

async function deleteFile(req, res){
  let id = req.params.id;
  try{
    const connect = mongoose.createConnection(mongoURI,{ useNewUrlParser:true, useUnifiedTopology: true})
    connect.once('open', () => {
      let gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: process.env.BUCKET_NAME
      })
      gfs.delete(mongoose.Types.ObjectId(id), (error, data) => {
        if(error){
          send_error(res, error, "Couldn't delete file")
        }
        else{
          send_success(res, "File deleted successfully")
        }
      })
    })
  }
  catch(error){
    send_error(res, error, "Couldn't delete file")
  }
}


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
          send_error(res, error, "No files available")
        }
        res.setHeader('Content-Type', files[0].contentType)
        res.setHeader('Content-Disposition', `attachment; filename="${files[0].filename}"`)
        gfs.openDownloadStream(mongoose.Types.ObjectId(id)).pipe(res)
      })
    })
  }
  catch(error){
    send_error(res, error, "Couldn't download file")
  }
};

async function update_metadata(req, res){
  try{
    const { id, metadata } = req.body
    let metadataObject = metadata ? qs.parse(metadata) : {}
    let filename = metadataObject.filename ? metadataObject.filename : ''
    const connect = mongoose.createConnection(mongoURI,{ useNewUrlParser:true, useUnifiedTopology: true})
    connect.once('open', () => {
      let gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: process.env.BUCKET_NAME
      })
      gfs.rename(mongoose.Types.ObjectId(id), filename, (error) => {
        if(error === null){
          gfs.find({"_id": mongoose.Types.ObjectId(id)}).toArray((error, files) => {
            // updating additional metadata
            delete metadataObject.filename
            delete metadataObject.user
            metadataObject.available = metadataObject.available === 'true' ? true : false
            metadataObject.tags = metadataObject.tags !== undefined && metadataObject.tags.length > 0 && typeof metadataObject.tags.split === 'function' ? metadataObject.tags.split(',') : []
            MongoClient.connect(mongoURI, function(error, client){
              // defining the database
              const db = client.db(process.env.DB_NAME);
              // defining the collection which is going to be queried
              const collection = db.collection(process.env.BUCKET_NAME + '.files')
              // defining the query
              const query = {"_id": mongoose.Types.ObjectId(id)}
              // finding existing document, merging metadata with new metadata, updating the document and sending it back to the client
              collection.find(query).toArray(function(error, docs){
                if(error)
                send_error(res, error, "Couldn't update file metadata")
                // mergin new with existing metadata
                const fullMetadata = {...docs[0].metadata, ...metadataObject}
                collection.updateOne(query, {$set : {metadata: fullMetadata}}, {}, (error, result) => {
                  collection.find(query).toArray(function(err, docs){
                    res.json(docs)
                  })
                });
              })
            })
          })
        }
        else{
          send_error(res, error, "Failed updating filename")
        }
      })
    })
  }
  catch(error){
    send_error(res, error, "Failed updating file")
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
    send_error(res, error, "Failed finding user associated files")
  }
}

module.exports = {
  uploadFile,
  get_all,
  download,
  update_metadata,
  deleteFile
}