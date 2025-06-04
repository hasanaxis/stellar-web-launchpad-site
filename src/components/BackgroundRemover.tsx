
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import { toast } from 'sonner';

const BackgroundRemover = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalImage, setOriginalImage] = useState<string>('/lovable-uploads/b0211574-0a3f-49f2-943d-484b4544edc4.png');
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleRemoveBackground = async () => {
    try {
      setIsProcessing(true);
      toast.info('Starting background removal...');
      
      // Fetch the image as a blob
      const response = await fetch(originalImage);
      const blob = await response.blob();
      
      // Load the image
      const imageElement = await loadImage(blob);
      
      // Remove background
      const resultBlob = await removeBackground(imageElement);
      
      // Create URL for the processed image
      const processedUrl = URL.createObjectURL(resultBlob);
      setProcessedImage(processedUrl);
      
      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to remove background');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'image-no-background.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Image downloaded!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: '#3C4247' }}>Background Removal Tool</h2>
        <p className="text-gray-600">Remove the background from your medical imaging photo</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold" style={{ color: '#3C4247' }}>Original Image</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <img 
              src={originalImage} 
              alt="Original medical imaging photo" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Processed Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold" style={{ color: '#3C4247' }}>Processed Image</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
            {processedImage ? (
              <img 
                src={processedImage} 
                alt="Processed image with background removed" 
                className="w-full h-auto rounded-lg"
                style={{ background: 'repeating-conic-gradient(#f0f0f0 0% 25%, transparent 0% 50%) 50% / 20px 20px' }}
              />
            ) : (
              <p className="text-gray-500">Processed image will appear here</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button 
          onClick={handleRemoveBackground}
          disabled={isProcessing}
          className="bg-gradient-to-r from-[#262262] via-[#B41E8E] to-[#EC008C] hover:opacity-90 text-white px-6 py-2"
        >
          {isProcessing ? 'Processing...' : 'Remove Background'}
        </Button>
        
        {processedImage && (
          <Button 
            onClick={downloadImage}
            variant="outline"
            className="px-6 py-2"
          >
            Download Image
          </Button>
        )}
      </div>
    </div>
  );
};

export default BackgroundRemover;
