import { useState } from "react";
import { Button } from "@/components/ui/button"; // Import Shadcn UI Button
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input"; // Import Shadcn UI Input
import { Textarea } from "@/components/ui/textarea"; // Import Shadcn UI Textarea
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Encryption = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [encryptedImage, setEncryptedImage] = useState<string | null>(null);
  const [isDownloadButtonDisabled, setIsDownloadButtonDisabled] =
    useState<boolean>(true);
  const { toast } = useToast();

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    checkButtonDisabled();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setSelectedImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }

    checkButtonDisabled();
  };

  const checkButtonDisabled = () => {
    setIsButtonDisabled(!selectedImage || !text.trim());
  };

  const handleEncrypt = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to encrypt.",
      });
      return;
    }

    // Convert the text to binary
    const textBinary =
      text
        .split("")
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join("") + "00000000"; // Append 8 bits for the end of the text

    // Embed the binary text into the image using LSB steganography
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        toast({
          title: "Error",
          description: "Failed to get canvas context.",
        });
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      // Check the maximum capacity for embedding the text
      const maxCapacity = Math.floor((img.width * img.height * 3) / 8);
      if (textBinary.length > maxCapacity) {
        toast({
          title: "Text too long!",
          description: `Maximum embeddable characters: ${maxCapacity}`,
        });
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let textIndex = 0;
      for (let i = 0; i < data.length; i += 4) {
        for (let j = 0; j < 3; j++) {
          if (textIndex < textBinary.length) {
            // Embed one bit of text into each color channel (RGB)
            data[i + j] =
              (data[i + j] & 0xfe) | parseInt(textBinary[textIndex++], 2);
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Convert the canvas to base64 image data URL
      const encryptedImage = canvas.toDataURL("image/png");

      // Display the encrypted image
      setEncryptedImage(encryptedImage);
      setIsDownloadButtonDisabled(false);

      toast({
        title: "Encryption successful!",
        description: "Image is ready for download.",
      });
    };

    img.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to load the selected image.",
      });
    };

    // Ensure the image source is set properly (add fallback for selectedImage)
    img.src = selectedImage || "";
  };

  const handleDownload = () => {
    // Create a link element and trigger the download of the encrypted image
    const downloadLink = document.createElement("a");
    downloadLink.href = encryptedImage!;
    downloadLink.download = "encrypted_image.png";
    downloadLink.click();

    toast({
      title: "Download successful!",
    });
  };

  return (
    <div className="flex bg-gray-300 rounded-md min-h-[60vh] max-h-[90vh]">
      <div className="left-container flex-1 p-6 h-full">
        <div className="inputs flex flex-col items-start justify-center min-h-full">
          <p className="text-base">Select the Image to be Embedded with:</p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 px-2 py-1 bg-white border border-gray-300 rounded"
          />
          <p className="text-base mt-4">Enter the text to be encrypted:</p>
          <Textarea
            rows={5}
            value={text}
            onChange={handleTextChange}
            className="mt-2 p-2 bg-white resize-none border border-gray-300 rounded w-full"
          />
          <Button
            onClick={handleEncrypt}
            disabled={isButtonDisabled}
            className="mt-4 bg-blue-500 hover:bg-blue-400 text-white"
          >
            Encrypt
          </Button>
        </div>
      </div>

      <div className="right-container flex-1 p-6">
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleDownload}
            disabled={isDownloadButtonDisabled}
            className={`bg-green-500 hover:bg-green-400 text-white max-w-32 `}
          >
            Download
          </Button>

          {(encryptedImage || selectedImage) && (
            <div className="image-preview max-h-[50vh] overflow-hidden">
              <AspectRatio ratio={16 / 9} className="w-full">
                <img
                  src={encryptedImage || selectedImage || ""}
                  alt="encrypted"
                  className="object-contain w-full h-full"
                />
              </AspectRatio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Encryption;
