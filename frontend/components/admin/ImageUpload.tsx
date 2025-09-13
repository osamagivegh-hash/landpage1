'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload = ({ onImageUpload, currentImage, className = '' }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        setUploadError('فقط ملفات الصور مسموحة');
        return;
      }

      // التحقق من حجم الملف (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('حجم الملف يجب أن يكون أقل من 5MB');
        return;
      }

      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // رفع الصورة
      uploadImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:5000/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        onImageUpload(result.imageUrl);
        setUploadError('');
      } else {
        const error = await response.json();
        setUploadError(error.message || 'فشل في رفع الصورة');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('حدث خطأ في رفع الصورة');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        صورة الوجبة *
      </label>

      {/* منطقة الرفع */}
      <div
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isUploading
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
            : 'border-gray-300 hover:border-red-400 hover:bg-red-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-red-600 animate-spin mb-2" />
            <p className="text-sm text-gray-600">جاري رفع الصورة...</p>
          </div>
        ) : preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-1">
              اضغط لرفع صورة أو اسحبها هنا
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF حتى 5MB
            </p>
          </div>
        )}
      </div>

      {/* رسالة الخطأ */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="text-sm">{uploadError}</p>
        </div>
      )}

      {/* زر رفع بديل */}
      {!preview && !isUploading && (
        <button
          type="button"
          onClick={handleClick}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <ImageIcon className="w-4 h-4" />
          <span>اختيار صورة</span>
        </button>
      )}
    </div>
  );
};

export default ImageUpload;

