import Image from "next/image";
import Link from "next/link";
import { CiEdit, CiTrash } from "react-icons/ci";

export default function RecentOrders() {
  return (
    <div className="admin-card">
      <div className="bg-[#262830] p-4">
        <h4 className="tracking-wide">New Products</h4>
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
            <tr>
              <td className="min-w-50">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-gray-600 min-h-12 min-w-12 h-12 w-12 overflow-hidden">
                    <Image
                      src={"/avatar.webp"}
                      width={100}
                      height={100}
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <Link href={""} className="tbl-prd-name">
                      Black T-Shirt
                    </Link>
                  </div>
                </div>
              </td>
              <td>$30.00</td>
              <td>IPTV Box</td>
              <td>30</td>
              <td>
                <div className="flex gap-2">
                  <Link href={""} className="table-btn btn-edit">
                    <CiEdit size={22} />
                  </Link>
                  <button className="table-btn btn-delete">
                    <CiTrash size={22} />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-gray-600 min-h-12 min-w-12 h-12 w-12 overflow-hidden">
                    <Image
                      src={"/avatar.webp"}
                      width={100}
                      height={100}
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <Link href={""} className="tbl-prd-name">
                      Black T-Shirt
                    </Link>
                  </div>
                </div>
              </td>
              <td>$30.00</td>
              <td>IPTV Box</td>
              <td>30</td>
              <td>
                <div className="flex gap-2">
                  <Link href={""} className="table-btn btn-edit">
                    <CiEdit size={22} />
                  </Link>
                  <button className="table-btn btn-delete">
                    <CiTrash size={22} />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-gray-600 min-h-12 min-w-12 h-12 w-12 overflow-hidden">
                    <Image
                      src={"/avatar.webp"}
                      width={100}
                      height={100}
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <Link href={""} className="tbl-prd-name">
                      Black T-Shirt
                    </Link>
                  </div>
                </div>
              </td>
              <td>$30.00</td>
              <td>IPTV Box</td>
              <td>30</td>
              <td>
                <div className="flex gap-2">
                  <Link href={""} className="table-btn btn-edit">
                    <CiEdit size={22} />
                  </Link>
                  <button className="table-btn btn-delete">
                    <CiTrash size={22} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="table-pagination p-4">
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
      </div>
    </div>
  );
}
