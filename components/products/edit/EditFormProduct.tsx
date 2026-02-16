"use client";

import { NodeApi } from "@/api/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tiptap from "../create/RichText";
import SelectArea from "../create/SelectArea";
import FileDrop from "../create/FileDrop";
import { useRouter } from "next/navigation";

interface ImageItem {
  file?: File;
  url: string;
  isRemote: boolean;
  path?: string;
}

interface ProductItem {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  desc: string;
  price: string;
  discount: string;
  stock: number;
  sales: number;
}

export default function EditFormProduct({ id }: { id: string }) {
  const [product, setProduct] = useState<ProductItem>({
    id: "",
    name: "",
    category: "Choose a category",
    shortDesc: "",
    desc: "",
    price: "",
    discount: "",
    stock: 0,
    sales: 0,
  });
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
    images.forEach((img) => {
      if (img.isRemote && img.path) {
        formData.append("existingImgs", img.path);
      }
    });
    images.forEach((image) => {
      if (image.file) {
        formData.append(`images`, image.file);
      }
    });
    deletedImages.forEach((path) => {
      formData.append("deletedImgs", path);
    });
    formData.set("category", categoryId);
    formData.set("shortDesc", description);
    formData.set("desc", longDesc);
    try {
      await NodeApi.post(`/products/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.replace("/products");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const normalizePath = (path: string) =>
    path.replace(/\\/g, "/").replace(/^uploads\//, "");

  const fetchProduct = async () => {
    try {
      const res = await NodeApi.get(`/products/${id}`);
      setCategoryId(res.data.categories.id);
      const dbImages: ImageItem[] = res.data.images.map((img: string) => ({
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/files/${normalizePath(img)}`,
        isRemote: true,
        path: img,
      }));
      setImages(dbImages);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchProduct();
  }, []);
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
                    value={product?.name}
                    onChange={handleChange}
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
                  <Tiptap
                    content={product.shortDesc}
                    onChange={setDescription}
                  />
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
                    value={product.stock}
                    onChange={handleChange}
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
                    value={product.sales}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="flex-1">
                <div className="form-group">
                  <label>Description</label>
                  <Tiptap content={product.desc} onChange={setLongDesc} />
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
                    value={product.price}
                    onChange={handleChange}
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
                    value={product.discount}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center justify-end gap-3 p-4">
            <button type="submit" className="adm-btn-base">
              Update Product
            </button>
            <Link href={"/products"} className="adm-btn-secondary">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
