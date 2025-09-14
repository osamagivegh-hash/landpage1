const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// إنشاء مجلد uploads إذا لم يكن موجوداً
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// إعداد multer للرفع
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // إنشاء اسم فريد للملف
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// فلترة الملفات المسموحة
const fileFilter = (req, file, cb) => {
  // السماح بصور فقط
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('فقط ملفات الصور مسموحة!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB حد أقصى
  },
  fileFilter: fileFilter
});

// رفع صورة واحدة
router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'لم يتم رفع أي ملف' });
    }

    // إرجاع رابط الصورة
    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      message: 'تم رفع الصورة بنجاح',
      imageUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'خطأ في رفع الصورة', error: error.message });
  }
});

// رفع عدة صور
router.post('/images', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'لم يتم رفع أي ملفات' });
    }

    const imageUrls = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename
    }));
    
    res.json({
      message: 'تم رفع الصور بنجاح',
      images: imageUrls
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'خطأ في رفع الصور', error: error.message });
  }
});

// حذف صورة
router.delete('/image/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'تم حذف الصورة بنجاح' });
    } else {
      res.status(404).json({ message: 'الصورة غير موجودة' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'خطأ في حذف الصورة', error: error.message });
  }
});

module.exports = router;


