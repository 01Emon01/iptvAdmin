import Link from "next/link";

export default async function page() {
  return (
    <div className="grid gap-4 px-2 pb-8">
      <div className="admin-card">
        <h4 className="font-semibold p-4 tracking-wide text-[15px] border-b border-gray-600">
          General Settings
        </h4>
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex-1">
              <div className="form-group">
                <label htmlFor="name">Site Title</label>
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
                <label htmlFor="name">Site Keyword</label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="Items Name"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="flex-1">
              <div className="form-group">
                <label htmlFor="name">Description</label>
                <textarea
                  name="name"
                  id="name"
                  className="form-input"
                  placeholder="Description about the product"
                  rows={6}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex-1">
              <div className="form-group">
                <label htmlFor="sp-email">Support Email</label>
                <input
                  name="sp-email"
                  id="sp-email"
                  type="email"
                  className="form-input"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="form-group">
                <label htmlFor="sp-num">Support Number</label>
                <input
                  name="sp-num"
                  id="sp-num"
                  type="number"
                  className="form-input"
                  placeholder="Number"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="flex-1">
              <div className="form-group">
                <label htmlFor="name">Footer Description</label>
                <textarea
                  name="name"
                  id="name"
                  className="form-input"
                  placeholder="Description about the product"
                  rows={6}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-card">
        <div className="flex items-center justify-end gap-3 p-4">
          <button className="adm-btn-base">Save Changes</button>
          <Link href={""} className="adm-btn-secondary">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
