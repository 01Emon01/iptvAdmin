"use client";
import { NodeApi } from "@/api/axios";
import BannerFileDrop from "@/components/banners/BannerFileDrop";
import Link from "next/link";
import { useEffect, useState } from "react";

type ImageItem = {
  file?: File;
  url: string;
  isRemote?: boolean;
  path?: string;

  isDeleted?: boolean;
  isReplaced?: boolean;
};

type BannerItem = {
  image: ImageItem | null;
};

export default function page() {
  const [banners, setBanners] = useState<BannerItem[]>([{ image: null }]);

  const handleAddBanner = () => {
    setBanners((prev) => [...prev, { image: null }]);
  };

  const handleDeleteImage = (index: number) => {
    setBanners((prev) => {
      const updated = [...prev];
      const banner = updated[index];
      const img = banner?.image;

      if (!banner) return prev;

      if (!img) {
        return updated.filter((_, i) => i !== index);
      }

      if (!img.isRemote && img.url.startsWith("blob:")) {
        URL.revokeObjectURL(img.url);
        return updated.filter((_, i) => i !== index);
      }

      if (img.isRemote) {
        updated[index] = {
          ...banner,
          image: {
            ...img,
            isDeleted: true,
          },
        };
      }

      return updated;
    });
  };

  const handleReplaceImage = (index: number, file: File) => {
    const newBlobUrl = URL.createObjectURL(file);

    setBanners((prev) => {
      const updated = [...prev];
      const oldImg = updated[index]?.image;

      if (oldImg?.url.startsWith("blob:")) {
        setTimeout(() => URL.revokeObjectURL(oldImg.url), 0);
      }

      updated[index].image = {
        file,
        url: newBlobUrl,
        isRemote: false,
        isReplaced: !!oldImg?.isRemote || !!oldImg?.isReplaced,
        path: oldImg?.path,
      };

      return updated;
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    const deletedPaths: string[] = [];

    banners.forEach((banner) => {
      const img = banner.image;

      if (!img) return;

      if (img.isDeleted && img.path) {
        deletedPaths.push(img.path);
      }

      if (img.isReplaced && img.path) {
        deletedPaths.push(img.path);
      }

      if (img.file) {
        formData.append("newImages", img.file);
      }
    });

    formData.append("deletedImages", JSON.stringify(deletedPaths));

    try {
      await NodeApi.post("/banners/save", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Changes saved ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes ❌");
    }
  };

  const fetchBanners = async () => {
    try {
      const res = await NodeApi.get("/banners");
      const bannerData = res.data;

      const normalizedBanners: BannerItem[] = bannerData.images.map(
        (imgPath: string) => ({
          image: {
            url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/files/${imgPath.replace(/\\/g, "/").replace("uploads", "")}`,
            isRemote: true,
            path: imgPath,
          },
        }),
      );

      setBanners(normalizedBanners);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    return () => {
      banners.forEach((banner) => {
        if (banner.image?.url.startsWith("blob:")) {
          URL.revokeObjectURL(banner.image.url);
        }
      });
    };
  }, []);

  return (
    <div className="grid gap-4 px-2 pb-8">
      <div className="admin-card">
        <h4 className="flex items-center justify-between p-4 tracking-wide text-[15px]">
          <span>Banner Lists</span>
          <button className="adm-btn-secondary" onClick={handleAddBanner}>
            Add
          </button>
        </h4>
      </div>
      {banners
        .filter((banner) => !banner.image?.isDeleted)
        .map((banner, index) => (
          <div className="admin-card" key={index}>
            <h4 className="flex items-center justify-between p-4 tracking-wide text-[15px] border-b border-gray-600">
              <span>Banner {index + 1}</span>
              <button
                className="adm-btn-secondary"
                onClick={() => handleDeleteImage(index)}
              >
                Remove
              </button>
            </h4>
            <div className="banner-info grid gap-3 p-3">
              <BannerFileDrop
                image={banner.image}
                onReplace={(file) => handleReplaceImage(index, file)}
              />
            </div>
          </div>
        ))}

      <div className="admin-card">
        <div className="flex items-center justify-end gap-3 p-4">
          <button className="adm-btn-base" onClick={handleSubmit}>
            Save Changes
          </button>
          <Link href={""} className="adm-btn-secondary">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
