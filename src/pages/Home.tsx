const Home = () => {
  return (
    <div className="wrapper flex flex-col justify-start items-start gap-4 p-5 bg-cover bg-center text-black">
      <h1 className="text-4xl font-bold">
        Steganography: Hidden Messages in Plain Sight
      </h1>
      <p className="text-xl">
        Steganography is the practice of concealing a message within another
        non-secret text or data, such as hiding a message within an image or
        audio file.
      </p>
      <h2 className="text-3xl font-semibold mt-4">
        How to Hide Text in an Image with Steganography:
      </h2>
      <ol className="list-decimal pl-6 text-lg text-left">
        <li>Select an image as a cover medium.</li>
        <li>Convert the text message to binary.</li>
        <li>
          Embed the binary message into the least significant bits (LSBs) of the
          cover image pixels.
        </li>
        <li>Save the modified image, which now contains the hidden message.</li>
      </ol>
      <h2 className="text-3xl font-semibold mt-4">
        Use Cases of Steganography:
      </h2>
      <ul className="list-disc pl-6 text-lg text-left">
        <li>Covert communication in sensitive environments.</li>
        <li>Digital watermarking to prove ownership of images.</li>
        <li>Embedding metadata for copyright or tracking purposes.</li>
        <li>Protecting sensitive information during transmission.</li>
      </ul>
      <p className="text-xl mt-4">
        Explore the fascinating world of steganography and its practical
        applications!
      </p>
    </div>
  );
};

export default Home;
