const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

async function redirect(req, res, error = {}){
  console.log(chalk.red(`no asset found for ${req.path}`))
  console.error(error);
  res.redirect('/')
}

async function build(req, res){
  let assetPath = path.join(__dirname, '..', '/build' + req.path)
  try {
    if (fs.existsSync(assetPath)) {
      res.sendFile(assetPath)
    }
    else{
      redirect(req, res)
    }
  }
  catch(error) {
    redirect(req, res, error)
  }
}

module.exports = {
  build
}