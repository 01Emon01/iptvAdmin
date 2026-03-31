"use client";
import Image, { ImageLoader } from "next/image";

type styleProps = {
  data: string;
};

export default function ProductTableImage({ data }: styleProps) {
  const normalizePath = (path: string) =>
    path.replace(/\\/g, "/").replace(/^uploads\//, "");
  const img = normalizePath(data);

  const myLoader: ImageLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/files/${src}?w=${width}&q=${
      quality || 50
    }`;
  };
  return (
    <Image loader={myLoader} src={img} width={100} height={100} alt="avatar" />
  );
}
