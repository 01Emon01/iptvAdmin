import Link from "next/link";

type Data = {
  id: string;
  name: string;
  email: string;
  message: string;
};

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.API_BASE_URL}/data/admin/contacts/view/${id}`,
  );
  const data: Data = await res.json();
  return (
    <>
      <div className="admin-card mx-2 mb-4">
        <h4 className="font-semibold p-4 tracking-wide text-[15px] border-b border-gray-600">
          View message
        </h4>
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex-1">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="John"
                  defaultValue={data.name}
                  readOnly
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  className="form-input"
                  placeholder="example@gmail.com"
                  defaultValue={data.email}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex-1">
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  className="form-input"
                  placeholder="User message"
                  defaultValue={data.message}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-card mx-2">
        <div className="flex items-center justify-end gap-3 p-4">
          <Link href={"/contacts"}>
            <button className="adm-btn-secondary">Go back</button>
          </Link>
        </div>
      </div>
    </>
  );
}
