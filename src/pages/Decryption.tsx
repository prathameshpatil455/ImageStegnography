import { useState } from "react";
import { Button } from "@/components/ui/button"; // Import Shadcn UI Button
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const Decryption = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [decryptedText, setDecryptedText] = useState("");
  const { toast } = useToast();

  // Function to handle changes in the image input
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to decrypt the image
  const handleDecrypt = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to decrypt.",
        variant: "destructive",
      });
      return;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let binaryText = "";
      let byte = "";

      for (let i = 0; i < data.length; i += 4) {
        for (let j = 0; j < 3; j++) {
          byte += data[i + j] & 1; // Extract LSB of each color channel

          if (byte.length === 8) {
            if (byte === "00000000") {
              setDecryptedText(binaryText);
              return;
            }
            const char = String.fromCharCode(parseInt(byte, 2));
            binaryText += char;
            byte = "";
          }
        }
      }

      setDecryptedText(binaryText);
    };

    img.src = selectedImage;
  };

  return (
    <div className="flex bg-gray-300 rounded-md min-h-[60vh] max-h-[90vh]">
      <div className="left-container flex-1 p-6 h-full">
        <div className="inputs flex flex-col items-start justify-center min-h-full">
          <p className="text-base">
            Select the Image from which the data is to be extracted:
          </p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 px-2 py-1 bg-white border border-gray-300 rounded"
          />
          <Button
            onClick={handleDecrypt}
            disabled={!selectedImage}
            className="mt-4 bg-blue-500 hover:bg-blue-400 text-white"
          >
            Decrypt
          </Button>
          {selectedImage && (
            <div className="image-preview max-w-full max-h-[40vh] overflow-hidden mt-4">
              <img
                src={selectedImage}
                alt="selected"
                className="object-contain w-full h-full"
              />
            </div>
          )}
        </div>
      </div>

      <div className="right-container flex-1 p-6 h-full">
        <div className="flex flex-col gap-4">
          <p className="text-base">The Secret Message:</p>
          <div className="flex-1 min-h-[50vh] bg-white border border-gray-300 rounded p-4">
            {!decryptedText && (
              <p className="text-gray-500">No secret message found.</p>
            )}
            {decryptedText && <p className="text-gray-600">{decryptedText}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decryption;
