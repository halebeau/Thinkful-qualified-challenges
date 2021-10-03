function validateZip(req, res, next) {
  const zip = req.params.zip
  if(zip.length === 5 && Number(zip)){
    next()
  } else{
    next(`Zip (${zip}) is invalid!`)
  }
}

module.exports = validateZip;