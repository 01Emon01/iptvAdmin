import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import ProductTableImage from "./interface/ProductTableImage";
import DeleteProductButton from "./interface/DeleteProductButton";

type Categories = {
  id: string;
  name: string;
  slug: string;
};

type Products = {
  id: string;
  categories: Categories;
  category: string;
  images: string[];
  name: string;
  price: string;
  stock: string;
};

export default async function ProductsTable() {
  const res = await fetch(`${process.env.API_BASE_URL}/data/admin/products`);
  const data: Products[] = await res.json();
  return (
    <div className="admin-card mx-2 mb-6">
      <div className="bg-[#262830] p-4">
        <h4 className="tracking-wide">Products List</h4>
      </div>
      <div className="card-table-body overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-gray-600 max-w-20 overflow-hidden">
                      <ProductTableImage data={item.images[0]} />
                    </div>
                    <div>
                      <a href={`http://localhost:3001/products/${item.id}`}>
                        {item.name}
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <bdi>{item.price} د.إ</bdi>
                </td>
                <td>{item.categories?.name ? item.categories?.name : "X"}</td>
                <td>{item.stock}</td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      href={`/products/edit/${item.id}`}
                      className="table-btn btn-edit"
                    >
                      <CiEdit size={22} />
                    </Link>
                    <DeleteProductButton id={item.id} />
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
