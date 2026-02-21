import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import DeleteCategoryBtn from "./interface/DeleteCategoryBtn";

type Categories = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export default async function CategoriesTable() {
  const res = await fetch(`${process.env.API_BASE_URL}/data/admin/categories`);
  const data: Categories[] = await res.json();
  return (
    <div className="admin-card mx-2 mb-6">
      <div className="bg-[#262830] p-4">
        <h4 className="tracking-wide">Categories List</h4>
      </div>
      <div className="card-table-body overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Slug</th>
              <th>Action</th>
            </tr>
          </thead>
          {Array.isArray(data) && data.length > 0 && (
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.slug}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        href={"/categories/edit"}
                        className="table-btn btn-edit"
                      >
                        <CiEdit size={22} />
                      </Link>
                      <DeleteCategoryBtn id={item.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {data.length === 0 && (
          <div className="text-center text-sm tracking-wider w-full py-3">
            No data found
          </div>
        )}
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
    </div>
  );
}
