"use client";
import { NodeApi } from "@/api/axios";
import SelectArea2 from "@/components/products/featured/SelectArea2";
import { useEffect, useState } from "react";

type Products = {
  id: string;
  images: string[];
  name: string;
};

type Selects = {
  id: string;
  name: string;
};

export default function page() {
  const [products, setProducts] = useState<Products[]>([]);
  const [selects, setSelects] = useState<Selects[]>([
    {
      id: "",
      name: "Choose a category",
    },
    {
      id: "",
      name: "Choose a category",
    },
    {
      id: "",
      name: "Choose a category",
    },
    {
      id: "",
      name: "Choose a category",
    },
  ]);

  const updateSelect = (index: number, id: string, name: string) => {
    setSelects((prev) => {
      const updated = [...prev];
      updated[index] = {
        id,
        name,
      };

      return updated;
    });
  };

  const fetchProducts = async () => {
    try {
      const res = await NodeApi.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSpecials = async () => {
    try {
      const res = await NodeApi.get("/products/specials/view");
      const special = res.data;

      const newSelects = [
        special.firstProduct
          ? { id: special.firstProduct.id, name: special.firstProduct.name }
          : { id: "", name: "" },

        special.secondProduct
          ? { id: special.secondProduct.id, name: special.secondProduct.name }
          : { id: "", name: "" },

        special.thirdProduct
          ? { id: special.thirdProduct.id, name: special.thirdProduct.name }
          : { id: "", name: "" },

        special.fourthProduct
          ? { id: special.fourthProduct.id, name: special.fourthProduct.name }
          : { id: "", name: "" },
      ];

      setSelects(newSelects);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    const ids = selects.map((item) => item.id);

    if (ids.some((id) => !id)) {
      alert("Please select all special products");
      return;
    }

    const payload = {
      fstPrd: ids[0],
      secPrd: ids[1],
      thirdPrd: ids[2],
      frthPrd: ids[3],
    };

    try {
      await NodeApi.post("/products/specials", payload);
      alert("Special products saved ✅");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSpecials();
  }, []);
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-y-6">
        {selects.map((item, index) => (
          <div className="w-full lg:w-1/2 px-2" key={index}>
            <SelectArea2
              data={products}
              select={item}
              onSelect={(id, name) => updateSelect(index, id, name)}
            />
          </div>
        ))}
      </div>
      <div className="admin-card mx-2">
        <div className="flex items-center justify-end gap-3 p-4">
          <button className="adm-btn-base" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
