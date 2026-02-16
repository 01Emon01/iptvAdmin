"use client";

import Link from "next/link";
import Tiptap from "../RichText";
import SelectArea from "../SelectArea";
import FileDrop from "../FileDrop";
import { useState } from "react";
import { NodeApi } from "@/api/axios";
import { useRouter } from "next/navigation";

interface ImageItem {
  file?: File;
  url: string;
  isRemote: boolean;
  path?: string;
}

export default function ProductForm() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState<string>("Choose a category");
  const [description, setDescription] = useState("");
  const [longDesc, setLongDesc] = useState("");

  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    if (images.length === 0) {
      alert("Please upload at least one product image.");
      return;
    }
    images.forEach((image) => {
      if (image.file) {
        formData.append(`images`, image.file);
      }
    });
    formData.set("category", categoryId);
    formData.set("shortDesc", description);
    formData.set("desc", longDesc);
    try {
      await NodeApi.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImages([]);
      setDescription("");
      setLongDesc("");
      router.replace("/products");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <form action={handleSubmit} className="grid gap-4">
        <div className="admin-card">
          <h4 className="font-semibold p-4 tracking-wide text-[15px] border-b border-gray-600">
            Add Product Photo
          </h4>
          <FileDrop
            images={images}
            setImages={setImages}
            setDltImages={setDeletedImages}
          />
        </div>
        <div className="admin-card">
          <h4 className="font-semibold p-4 tracking-wide text-[15px] border-b border-gray-600">
            Product Information
          </h4>
          <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="Items Name"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="category">Product Categories</label>
                  <SelectArea
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="flex-1">
                <div className="form-group">
                  <label>Short Description</label>
                  <Tiptap content="" onChange={setDescription} />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    name="stock"
                    id="stock"
                    type="number"
                    className="form-input"
                    placeholder="Quantity"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="sales">Sales</label>
                  <input
                    name="sales"
                    id="sales"
                    type="number"
                    className="form-input"
                    placeholder="Items Sold"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="flex-1">
                <div className="form-group">
                  <label>Description</label>
                  <Tiptap content="" onChange={setLongDesc} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <h4 className="font-semibold p-4 tracking-wide text-[15px] border-b border-gray-600">
            Pricing Details
          </h4>
          <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    name="price"
                    id="price"
                    type="number"
                    className="form-input"
                    placeholder="00"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="discount">Discount</label>
                  <input
                    name="discount"
                    id="discount"
                    type="number"
                    className="form-input"
                    placeholder="00"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center justify-end gap-3 p-4">
            <button type="submit" className="adm-btn-base">
              Create Product
            </button>
            <Link href={""} className="adm-btn-secondary">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
