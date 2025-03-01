import { useEffect, useState } from "react";

const ImageComponent = ({ src, width, height, className }) => {
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=Loading...`,
  );

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
    };
  }, [src]);

  return (
    <div>
      <img
        className={currentSrc === src ? className : `${className} blur-md`}
        width={width}
        height={height}
        src={currentSrc}
        alt=""
      />
    </div>
  );
};
export default ImageComponent;
