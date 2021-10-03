const ratings = require("../data/ratings-data");
const notes = require('../data/notes-data')

const hasParams = function(req, res, next){
    if (Object.entries(req.params).length > 0){
        const { noteId = null } = req.params;
        const { ratingId = null } = req.params;

        if (noteId) res.locals.noteId = noteId;
        if (ratingId) res.locals.ratingId = ratingId;
    };    
    next();
}

const ratingExists = function(req, res, next){
    const { ratingId = null } = req.params;
    const { noteId = null} = req.params;

    const ratingExists = ratings.find((rating)=>rating.id == ratingId);
    const noteExists = notes.find((note)=>note.id == noteId);

    if (!ratingId || !ratingExists) next({status: 404, message: `Rating id ${ratingId} does not exist.`})

    if (req.originalUrl.includes("notes") && !noteExists){
        next({status: 404, message: `Note w/id ${noteId} does not exist.`})
    }

    next();
}

function read(req, res){
    const noteId = res.locals.noteId;
    const ratingId = res.locals.ratingId;

    if (noteId != null && ratingId != null){
        const filteredRatings = ratings.filter((rating)=>{
            if (rating.noteId == noteId && rating.id == ratingId){
                return rating;
            }
        })
        res.status(200).send({data: filteredRatings[0]});
    }else if (!noteId){
        const foundRating = ratings.find((rating)=>rating.id == ratingId);
        res.status(200).send({data: foundRating});
    }else{
        console.log("fell into else statement for some reason")
    }
}

function list(req, res){
  const { noteId = null } = res.locals;
  if (noteId){
      const filteredRatings = ratings.filter((rating)=>rating.noteId == noteId);
      res.status(200).json({data: filteredRatings});
  }else{
      res.status(200).json({data: ratings});
  }
}

module.exports = {
  list : [hasParams, list],
  read: [hasParams, ratingExists, read],
};