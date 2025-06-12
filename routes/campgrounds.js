const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');

router.route('/')
    .get(campgrounds.index)
    .post(isLoggedIn, validateCampground, upload.array('image'), campgrounds.createCampground)


router.get('/new', isLoggedIn, campgrounds.renderNewForm)


router.route('/:id')
    .get(campgrounds.showCampground)
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, campgrounds.updateCampground)
    .delete(isLoggedIn, isAuthor, campgrounds.deleteCampground)



router.get('/:id/edit', isLoggedIn, isAuthor, campgrounds.renderEditForm)



module.exports = router;
