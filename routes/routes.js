const { Router } = require('express');
const router = Router();
const url = `http://localhost:8080`;
const axios = require('axios');

//function that compares two posts by key
function compareByValue(key, order){
    return function compare (a,b){
        let comparison = 0;
        const one = a[key];
        const two = b[key];
        if (one > two) {
            comparison = 1;
        } else if (two > one) {
            comparison = -1;
        }
        if (order == "desc") {
            return comparison  * -1;
        } else {
            return comparison 
        }
    }
}
//Route functions:
const ping = (req, res) => {
    res.status(200).json({success: true});
}

const getPosts = (req, res) => {
    let posts = [];
    const providedTags = req.query.tags;
    if (!providedTags){
        res.status(400).json({error:"Tags parameter is required"})
    }
    const tags = providedTags.split(',');
    let sortBy = req.query.sortBy;
    if (sortBy && sortBy !=="id" && sortBy !="reads" && sortBy !=="likes" && sortBy !=="popularity"){
        res.status(400).json({error:"sortBy parameter is invalid"})
    } else if (!sortBy){
        sortBy="id";
    }
    let direction = req.query.direction;
    if (direction && direction !=="desc" && direction !=="asc"){
        res.status(400).json({error:"direction parameter is invalid"})
    } else if (!direction){
        direction="asc";
    }
    let promises =[];
    tags.forEach(function(tag){
        myUrl = `https://hatchways.io/api/assessment/blog/posts?tag=${tag}`
        promises.push(axios.get(myUrl))
    });
    axios.all(promises).then(function(results) {
        results.forEach(function(response) {
            let newPosts = response.data.posts;
            newPosts.map((post)=>{
                let obj = posts.find(obj => obj.id == post.id);
                if (!obj){
                    posts.push(post)
                }
            })
        });
        posts.sort(compareByValue(sortBy,direction));
        res.json(posts)
           
    })
}
//Routes
router.get('/api/ping', ping);
router.get('/api/posts', getPosts)
module.exports = router;