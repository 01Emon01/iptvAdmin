"use client";
import Image, { ImageLoader } from "next/image";

type styleProps = {
  data: string;
};

const parseImages = (value: unknown): string[] => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
};

export default function ProductTableImage({ data }: styleProps) {
  const images = parseImages(data);
  const normalizePath = (path: string) =>
    path.replace(/\\/g, "/").replace(/^uploads\//, "");
  const img = normalizePath(images[0]);

  const myLoader: ImageLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/files/${src}?w=${width}&q=${
      quality || 50
    }`;
  };
  return (
    <Image loader={myLoader} src={img} width={100} height={100} alt="avatar" />
  );
}
