const Listing=require("../models/listing");


module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
         res.render("listings/index.ejs",{allListings});
     };

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
   };    
   
   module.exports.showListing=(async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
     req.flash("error","Listing you requested for does not exist!!");
     res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
  });

module.exports.createListing=async (req, res,next) => {
  let url=req.file.path;
  let filename=req.file.filename;
 
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New Listing Created!!");
    res.redirect("/listings");
  };

// module.exports.renderEditForm=(async(req,res)=>{
//     let{id}=req.params;
//   const listing=await Listing.findById(id);
//   if(!listing){
//     req.flash("error","Listing you requested for does not exist!!");
//     res.redirect("/listings");
//    }

//    let originalImageUrl=listing.image.url;
//    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
//   res.render("listings/edit.ejs",{listing,originalImageUrl});
// });
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!!");
    return res.redirect("/listings");
  }

  let originalImageUrl;

  if (listing.image && listing.image.url) {
    originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");
  } else {
    // Handle missing image gracefully - can use a default image or leave it undefined
    originalImageUrl = "path/to/default/image.jpg"; // Or null, whatever fits your logic
  }

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};


module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
   let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});//... is a deconstruct

   if(typeof req.file!=="undefined"){
   let url=req.file.path;
   let filename=req.file.filename;
   listing.image={url,filename};
   await listing.save();
   }

    req.flash("success","Listing Updated!!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!!");
    res.redirect("/listings");
  };