import { updateCategory } from "@/helpers/updateCategory";
import Link from "next/link";

type Data = {
  id: string;
  name: string;
  slug: string;
};

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.API_BASE_URL}/data/admin/category/${id}`,
  );
  const data: Data = await res.json();
  return (
    <>
      <form action={updateCategory}>
        <input type="hidden" name="id" defaultValue={data.id} hidden />
        <div className="admin-card mb-4">
          <h4 className="font-semibold p-4 tracking-wide text-[15px] border-b border-gray-600">
            Category Details
          </h4>
          <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="name">Category Name</label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="Items Name"
                    defaultValue={data.name}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="slug">Category Slug</label>
                  <input
                    name="slug"
                    id="slug"
                    type="text"
                    className="form-input"
                    placeholder="Items Name"
                    defaultValue={data.slug}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center justify-end gap-3 p-4">
            <button className="adm-btn-base" type="submit">
              Update Category
            </button>
            <Link href={"/categories"} className="adm-btn-secondary">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
