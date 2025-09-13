'use client';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-600 font-serif">
          أوسال
        </h1>
        </div>

        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Loading Text */}
        <div className="mt-6">
          <p className="text-gray-600 text-lg">جاري التحميل...</p>
          <p className="text-gray-500 text-sm mt-2">
            نعد تجربة طعامك
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

