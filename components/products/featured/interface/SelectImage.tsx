"use client";
import Image, { ImageLoader } from "next/image";

export default function SelectImage({ url }: { url: string }) {
  const normalURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url
    .replace(/\\/g, "/")
    .replace("uploads", "data/files")}`;
  const myLoader: ImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 50}`;
  };
  return (
    <Image
      loader={myLoader}
      src={normalURL}
      width={40}
      height={40}
      alt="prd-img"
    />
  );
}
