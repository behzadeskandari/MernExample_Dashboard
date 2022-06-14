const express = require('express');

let router = express.Router();
const { checkLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');
const {sortArgsHelper} = require('../../config/helpers')

const { Article } = require('../../models/article_model');



router.route('/admin/add_article')
.post(checkLoggedIn,grantAccess('createAny','article'), async (req, res) => {
    try {



        const article = new Article({
            ...req.body,
            score: parseInt(req.body.score)
        });

        const result = await article.save();
        res.status(200).json(result);


    } catch (error) {
        res.status(400).json({message: "Error Adding article", error: error });
    }

})


router.route('/admin/:id')
.get(checkLoggedIn,grantAccess('readAny', 'article'), async (req,res) => {
    try {
        const _id = req.params.id;
        const article = await Article.findById(_id);
        if(!article || article.length === 0) {
            return res.status(400).json({message: "Article Not Found"})
        }
        res.status(200).json(article);

    } catch (error) {
           res.status(400).json({message: "Error Fethcing Article", error: error });
     
    }
})
.patch(checkLoggedIn,grantAccess('updateAny', 'article'), async (req,res) => {
    try {
        const _id = req.params.id;

        const article = await Article.findOneAndUpdate(
            {_id},
            {
                "$set": req.body 
            },
            {
                new:true
            }
        );
        if(!article) return res.status(400).json({message: "Article Not Found"});

        res.status(200).json(article);
    } catch (error) {
        res.status(400).json({message: "Error Updating Article", error: error });
    
    }
})
.delete(checkLoggedIn,grantAccess('deleteAny', 'article'), async (req,res) => {
    try {
        const _id = req.params.id;
        const article = await Article.findByIdAndRemove(_id);
        if(!article) return res.status(400).json({message: "Article Not Found"});

        res.status(200).json({_id:article._id});
    } catch (error) {
        res.status(400).json({message: "Error Deleteing Article", error: error });
     
    }
})

router.route("/admin/paginate")
.get(checkLoggedIn,grantAccess('readAny', 'articles'), async (req,res)=> {
    try {
        // const aggQuery = Article.aggregate([
        //     { $match : {status: "public"}},
        //     { $match: { title: { $regex:/title/ }}}
        // ]);


        const limit = req.params.limit ? req.params.limit : 5;
        const aggQuery = Article.aggregate();

        const options = {
            page : req.body.page,
            limit,
            sort:{_id:'asc'}
        }

        const articles = await Article.aggregatePaginate(aggQuery,options)
        
        res.status(200).json(articles)
    } catch (error) {
        res.status(400).json({message: "Error", error: error})
    }
})


router.route("/get_byid/:id")
.get(async (req,res)=> {
    try {
        const _id = req.params.id;
        const article = await Article.find({_id:_id,status:'public'});
        if(!article || article.length === 0){
            return res.status(400).json({message: "Article Not Found"})
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(400).json({message: "Error fetching article", error: error})
    }
})


router.route("/loadmore")
.post(async (req,res) => {
    try {
        
        let sortArgs = sortArgsHelper(req.body);
        const articles = await Article.find({status: 'public'})
        .sort([[sortArgs.status, sortArgs.order]])
        .skip(sortArgs.skip)
        .limit(sortArgs.limit)

        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({message: "Error fetching articles", error: error})
    }
})


module.exports = router;