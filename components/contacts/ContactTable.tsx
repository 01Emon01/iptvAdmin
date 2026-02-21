import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import DeleteContactBtn from "./interface/DeleteContactBtn";

type Contacts = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default async function ContactTable() {
  const res = await fetch(
    `${process.env.API_BASE_URL}/data/admin/contacts/pull`,
  );
  const data: Contacts[] = await res.json();
  return (
    <div className="admin-card mx-2 mb-6">
      <div className="bg-[#262830] p-4">
        <h4 className="tracking-wide">Contact List</h4>
      </div>
      <div className="card-table-body overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      href={`/contacts/view/${item.id}`}
                      className="table-btn btn-edit"
                    >
                      <FaRegEye size={22} />
                    </Link>
                    <DeleteContactBtn id={item.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="text-center text-sm tracking-wider w-full py-3">
            No data found
          </div>
        )}
      </div>
      {/* <div className="table-pagination p-4">
        <ul className="flex items-ceneter justify-end">
          <li className="page-items">
            <Link href={""}>Prev</Link>
          </li>
          <li className="page-items">
            <Link href={""}>1</Link>
          </li>
          <li className="page-items">
            <Link href={""}>2</Link>
          </li>
          <li className="page-items">
            <Link href={""}>3</Link>
          </li>
          <li className="page-items">
            <Link href={""}>Next</Link>
          </li>
        </ul>
      </div> */}
    </div>
  );
}
