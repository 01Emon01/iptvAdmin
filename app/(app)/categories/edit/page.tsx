import Link from "next/link";

export default async function page() {
  return (
    <>
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-card">
        <div className="flex items-center justify-end gap-3 p-4">
          <button className="adm-btn-base">Update Category</button>
          <Link href={""} className="adm-btn-secondary">
            Cancel
          </Link>
        </div>
      </div>
    </>
  );
}
