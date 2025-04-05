const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../util/wrapAsync.js");
const ExpressError=require("../util/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const{validatereview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController=require("../controllers/reviews.js");
const review=require("../models/review.js");


  //REVIEWS  POST ROUTE
  router.post("/",isLoggedIn, validatereview, wrapAsync(reviewController.createReview));

  //REVIEWS DELETE ROUTE
  router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

  module.exports=router;
