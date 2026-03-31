"use server";

import { redirect } from "next/navigation";

export async function updateCategory(formData: FormData) {
  const id = formData.get("id");
  const name = formData.get("name");
  const slug = formData.get("slug");

  await fetch(`${process.env.API_BASE_URL}/data/admin/category/edit/${id}`, {
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
