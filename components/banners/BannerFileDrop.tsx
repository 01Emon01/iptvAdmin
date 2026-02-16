import Image from "next/image";
import { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineRestartAlt } from "react-icons/md";
import BannerDBImage from "./interface/BannerDBImage";

type ImageItem = {
  file?: File;
  url: string;
  isRemote?: boolean;
  path?: string;

  isDeleted?: boolean;
  isReplaced?: boolean;
};

type FileDropProps = {
  image: ImageItem | null;
  onReplace: (file: File) => void;
};

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export default function BannerFileDrop({
  image,
  onReplace,
}: FileDropProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (): void => {
    inputRef.current?.click();
  };

  const handleFiles = (files: FileList | null): void => {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Only PNG, JPG, JPEG, WEBP allowed");
      return;
    }

    onReplace(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleReplaceClick = (): void => {
    inputRef.current?.click();
  };

  return (
    <div
      className="info-thumb cursor-pointer"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        ref={inputRef}
        multiple
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {image && (
        <>
          <div
            className=" m-3 xz-img-create"
            onClick={(e) => e.stopPropagation()}
          >
            {image.url.startsWith("blob:") ? (
              <Image
                src={image.url}
                alt="Preview Banner"
                className="rounded-2xl w-75 object-cover"
                width={300}
                height={300}
              />
            ) : (
              <BannerDBImage image={image.url} />
            )}

            <div className="img-btnsArea flex items-center gap-2">
              <div
                className="replace-prdImg-btn"
                onClick={() => handleReplaceClick()}
              >
                <MdOutlineRestartAlt size={26} />
              </div>
            </div>
          </div>
        </>
      )}
      {!image && (
        <div className="flex flex-col gap-2 items-center justify-center my-12">
          <FaCloudUploadAlt size={36} className="text-orange-400" />
          <h3 className="text-2xl">
            Drop your image here, or{" "}
            <span className="text-orange-400">click to browse</span>
          </h3>
          <span className="text-sm">
            1200 x 520 recommended. Only PNG, JPG, JPEG and WEBP files are
            allowed
          </span>
        </div>
      )}
    </div>
  );
}
