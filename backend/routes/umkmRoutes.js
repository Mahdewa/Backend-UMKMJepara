const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const {
  getAllUmkm,
  getDetailUmkm,
  createUmkm,
  updateUmkm,
  deleteUmkm
} = require('../controllers/umkmController');

const protect = require('../middleware/authMiddleware');

router.get('/', getAllUmkm);
router.get('/:id', getDetailUmkm);
router.post('/', protect, upload.single('gambar'), createUmkm);
router.put('/:id', protect, upload.single('gambar'), updateUmkm);
router.delete('/:id', protect, deleteUmkm);

module.exports = router;