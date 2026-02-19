import { saveSettings } from "@/actions/settings.action";

type DataProps = {
  id: string;
  name: string;
  keywords: string;
  description: string;
  footerInfo: string;
  supportEmail: string;
  supportNo: string;
};

export default async function page() {
  const res = await fetch(`${process.env.API_BASE_URL}/data/admin/siteInfo`);
  const data: DataProps = await res.json();
  return (
    <div className="px-2 pb-8">
      <form action={saveSettings} className="grid gap-4">
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
                    defaultValue={data.name}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="keywords">Site Keyword</label>
                  <input
                    name="keywords"
                    id="keywords"
                    type="text"
                    className="form-input"
                    placeholder="Items Name"
                    defaultValue={data.keywords}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    className="form-input"
                    placeholder="Description about the product"
                    rows={6}
                    defaultValue={data.description}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="supportEmail">Support Email</label>
                  <input
                    name="supportEmail"
                    id="supportEmail"
                    type="email"
                    className="form-input"
                    placeholder="example@gmail.com"
                    defaultValue={data.supportEmail}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="supportNo">Support Number</label>
                  <input
                    name="supportNo"
                    id="supportNo"
                    type="number"
                    className="form-input"
                    placeholder="Number"
                    defaultValue={data.supportNo}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="flex-1">
                <div className="form-group">
                  <label htmlFor="footerInfo">Footer Description</label>
                  <textarea
                    name="footerInfo"
                    id="footerInfo"
                    className="form-input"
                    placeholder="Description about the product"
                    rows={6}
                    defaultValue={data.footerInfo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="flex items-center justify-end gap-3 p-4">
            <button type="submit" className="adm-btn-base">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
