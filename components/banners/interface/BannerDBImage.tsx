"use client";
import Image, { ImageLoader } from "next/image";

type BannerDBImageProps = {
  image: string;
};

export default function BannerDBImage({ image }: BannerDBImageProps) {
  const normalized = image.replace(/\\/g, "/");
  const src = `${normalized}`;

  const myLoader: ImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 50}`;
  };

  return (
    <Image
      loader={myLoader}
      src={src}
      alt="Saved Banner"
      className="rounded-2xl w-75 object-cover"
      width={300}
      height={300}
    />
  );
}
