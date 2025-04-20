
import React, { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageSelected: (url: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const { toast } = useToast();
  
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      // For now, we'll simulate the upload with a timeout
      // This will be replaced with actual Supabase storage upload
      setTimeout(() => {
        const fakeImageUrl = URL.createObjectURL(file);
        onImageSelected(fakeImageUrl);
        toast({
          title: "Image uploaded successfully",
          description: "Your image has been uploaded"
        });
      }, 1000);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
    }
  }, [onImageSelected, toast]);

  return (
    <div className="mt-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button variant="outline" className="w-full" type="button" asChild>
          <span>
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </span>
        </Button>
      </label>
    </div>
  );
};
