"use server";

import { revalidatePath } from "next/cache";

export async function saveSettings(formData: FormData) {
  const payload = {
    name: formData.get("name"),
    keywords: formData.get("keywords"),
    description: formData.get("description"),
    supportEmail: formData.get("supportEmail"),
    supportNo: formData.get("supportNo"),
    footerInfo: formData.get("footerInfo"),
  };

  try {
    await fetch(`${process.env.API_BASE_URL}/data/admin/settings/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    revalidatePath("/admin/settings");
  } catch (err) {
    console.error("Server Action Error:", err);
  }
}
