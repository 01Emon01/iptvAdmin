"use server";

import { redirect } from "next/navigation";

export async function createCategory(formData: FormData) {
  const name = formData.get("name");
  const slug = formData.get("slug");

  await fetch("http://localhost:8000/data/admin/categories/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      slug,
    }),
    cache: "no-store",
  });

  redirect("/categories");
}
