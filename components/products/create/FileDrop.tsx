"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineRestartAlt } from "react-icons/md";
import DbImage from "./interface/DbImage";

interface ImageItem {
  file?: File;
  url: string;
  isRemote: boolean;
  path?: string;
}

type FileDropProps = {
  images: ImageItem[];
  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  setDltImages: React.Dispatch<React.SetStateAction<string[]>>;
};

const MAX_FILES = 5;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export default function FileDrop({
  images,
  setImages,
  setDltImages,
}: FileDropProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const replaceInputRef = useRef<HTMLInputElement | null>(null);
  const replaceIndexRef = useRef<number | null>(null);

  const handleFiles = (files: FileList | null): void => {
    if (!files || files.length === 0) return;

    const selectedFiles = Array.from(files);

    if (images.length + selectedFiles.length > MAX_FILES) {
      alert(`You can upload a maximum of ${MAX_FILES} images`);
      return;
    }

    const invalidFile = selectedFiles.find(
      (file) => !ALLOWED_TYPES.includes(file.type),
    );

    if (invalidFile) {
      alert("Only PNG, JPG, JPEG, and WEBP files are allowed");
      return;
    }

    const newItems: ImageItem[] = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isRemote: false,
    }));

    setImages((prev) => [...prev, ...newItems]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleReplaceClick = (index: number): void => {
    replaceIndexRef.current = index;
    replaceInputRef.current?.click();
  };

  const handleReplaceFile = (files: FileList | null): void => {
    if (!files || files.length === 0 || replaceIndexRef.current === null)
      return;

    const file = files[0];

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Invalid image type");
      return;
    }

    setImages((prev) => {
      const index = replaceIndexRef.current;

      if (index === null || !prev[index]) return prev;

      const updated = [...prev];
      const oldImage = updated[index];

      if (oldImage.isRemote && oldImage.path) {
        setDltImages((prev) => {
          const next = new Set(prev);
          next.add(oldImage.path!);
          return Array.from(next);
        });
      }

      if (!oldImage.isRemote && oldImage.url.startsWith("blob:")) {
        URL.revokeObjectURL(oldImage.url);
      }

      updated[index] = {
        file,
        url: URL.createObjectURL(file),
        isRemote: false,
      };

      return updated;
    });
  };

  const handleDelete = (index: number): void => {
    setImages((prev) => {
      const item = prev[index];
      if (!item) return prev;

      if (item.isRemote && item.path) {
        setDltImages((prev) =>
          prev.includes(item.path!) ? prev : [...prev, item.path!],
        );
      }

      if (!item.isRemote && item.url.startsWith("blob:")) {
        URL.revokeObjectURL(item.url);
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleClick = (): void => {
    inputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [images]);

  return (
    <div className="p-4">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={(e) => handleReplaceFile(e.target.files)}
      />
      <div
        className="border-2 border-dashed border-gray-500 rounded p-3 cursor-pointer"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {images.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            {images.map((item, index) => (
              <div
                key={item.url}
                className="bg-white m-3 xz-img-create"
                onClick={(e) => e.stopPropagation()}
              >
                {item.url.startsWith("blob:") ? (
                  <Image
                    src={item.url}
                    alt={`Preview ${index + 1}`}
                    className="rounded-2xl h-30 w-30 object-cover"
                    width={120}
                    height={120}
                  />
                ) : (
                  <DbImage url={item.url} />
                )}
                <div className="img-btnsArea flex items-center gap-2">
                  <div
                    className="replace-prdImg-btn"
                    onClick={() => handleReplaceClick(index)}
                  >
                    <MdOutlineRestartAlt size={26} />
                  </div>
                  <div
                    className="dlt-prdImg-btn"
                    onClick={() => handleDelete(index)}
                  >
                    <IoCloseOutline size={26} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {images.length === 0 && (
          <div className="flex flex-col gap-2 items-center justify-center my-12">
            <FaCloudUploadAlt size={36} className="text-orange-400" />
            <h3 className="text-2xl">
              Drop your image here, or{" "}
              <span className="text-orange-400">click to browse</span>
            </h3>
            <span className="text-sm">
              1600 x 1600 (1:1) recommended. Only PNG, JPG and JPEG files are
              allowed
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
