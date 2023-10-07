const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary");
cloudinary.config({ 
  cloud_name: 'dopkisa4l', 
  api_key: '683725344288849', 
  api_secret: 'b_B6GoO7_N7kL2d9You59A8xpPc' 
});



router.post("/images", async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.body.image,{
        public_id:Date.now(),
        resource_type:"auto",
      })
      res.send(result);

      } catch (err) {
        console.log(err);
        res.status(500).send("Upload Error!!!");
      }
});
;
router.post("/removeimages", async (req, res) => {
    try {
        let image_id = req.body.public_id;
        cloudinary.uploader.destroy(image_id, (result) => {
          res.send(result);
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("Remove Error!!!");
      }
});

module.exports = router;
