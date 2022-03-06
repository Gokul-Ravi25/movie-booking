const router = require("express").Router();
const movies = require("../models/Movie");
const User = require("../models/User");

//Create a movie

router.movies("/", async (req,res)=>{
    const newPost = new movies(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
});
// Update a movie

router.put("/:id", async (req,res)=>{
    try{
        const movies = await movies.findById(req.params.id);
        if(movies.userId === req.body.userId){
            await movies.updateOne({$set:req.body});
            res.status(200).json("movies updated!");
        } else{
            res.status(403).json("You Can update only your movies");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete a movie
router.delete("/:id", async (req,res)=>{
    try{
        const movies = await movies.findById(req.params.id);
        if(movies.userId === req.body.userId){
            await movies.deleteOne({$set:req.body});
            res.status(200).json("movies Deleted!");
        } else{
            res.status(403).json("You Can delete only your movies");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//get movies
router.get("/:id", async (req,res)=>{
    try{
        const movies = await movies.findById(req.params.id);
        res.status(200).json(movies);
    } catch (err){
        res.status(500).json(err);
    }
});

//get user's timeline movies

router.get("/timeline/:userId", async (req, res)=>{
    try {
        const currentUser = await User.findById( req.params.userId );
        const userPosts = await movies.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) =>{
                return movies.find({userId: friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
      } catch (err) {
        res.status(500).json(err);
      }
});



module.exports = router;