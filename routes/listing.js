const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/wrapAsync.js");
const Listing=require("../models/listing.js");
const{isLoggedIn,isOwner,validateListing}=require("../middleware.js");
 const listingController=require("../controllers/listings.js");
const multer=require("multer");
const{storage}=require("../cloudConfig.js");
const upload=multer({storage});





router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
  upload.single("listing[image]"),
  wrapAsync(listingController.createListing));

//NEW ROUTE
router.get("/new", isLoggedIn,listingController.renderNewForm);



router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,
   upload.single("listing[image]"),
  wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));
  
// //INDEX ROUTE
// router.get("/", wrapAsync(listingController.index));
//  router.get("/", wrapAsyncasync(req,res)=>{
//   const allListings=await Listing.find({});
//        res.render("listings/index.ejs",{allListings});
//    });

//    //NEW ROUTE
// router.get("/new", isLoggedIn,(req,res)=>{
//   res.render("listings/new.ejs");
//  });
   
  //  //SHOW ROUTE   
  //  router.get("/:id",  wrapAsync(listingController.showListing));
  //  router.get("/:id",  wrapAsync(async(req,res)=>{
  //   let{id}=req.params;
  //   const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
  //   if(!listing){
  //    req.flash("error","Listing you requested for does not exist!!");
  //    res.redirect("/listings");
  //   }
  //   console.log(listing);
  //   res.render("listings/show.ejs",{listing});
  // }));
  
   //CREATE ROUTE
    // router.post("/", isLoggedIn,validateListing, wrapAsyncasync (req, res,next) => {
    //   let url=req.file.path;
    //   let filename=req.file.filename;
    
  //       const newListing = new Listing(req.body.listing);
  //       newListing.owner=req.user._id;
  //       newListing.image={url,filename};
  //       await newListing.save();
  //       req.flash("success","New Listing Created!!");
  //       res.redirect("/listings");
  //     });

   //EDIT ROUTE
   router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
//    router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(async(req,res)=>{
//     let{id}=req.params;
//   const listing=await Listing.findById(id);
//   if(!listing){
//     req.flash("error","Listing you requested for does not exist!!");
//     res.redirect("/listings");
//    }

//   //  let originalImageUrl=listing.image.url;
//   //  originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
//   res.render("listings/edit.ejs",{listing,originalImageUrl});
// }));

// //UPDATE ROUTE
// router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(listingController.updateListing));
//  router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(async(req,res)=>{
//   let {id}=req.params;
//  let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});//... is a deconstruct

//  if(typeof req.file!=="undefined"){
//  let url=req.file.path;
//  let filename=req.file.filename;
//  listing.image={url,filename};
//  await listing.save();
//  }

//   req.flash("success","Listing Updated!!");
//   res.redirect(`/listings/${id}`);
// }));

// //DELETE ROUTE
// router.delete("/:id", isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));
//  router.delete("/:id", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   req.flash("success","Listing Deleted!!");
//   res.redirect("/listings");
// }));
  module.exports=router;