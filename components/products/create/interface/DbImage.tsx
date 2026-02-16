import Image, { ImageLoader } from "next/image";

export default function DbImage({ url }: { url: string }) {
  const myLoader: ImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 50}`;
  };
  return (
    <Image
      loader={myLoader}
      src={url}
      alt={`Saved Image`}
      className="rounded-2xl h-30 w-30 object-cover"
      width={120}
      height={120}
    />
  );
}
