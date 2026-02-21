"use client";

import { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { VscClose } from "react-icons/vsc";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { NodeApi } from "@/api/axios";
import { useRouter } from "next/navigation";

export default function DeleteProductButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await NodeApi.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/admin/products/delete/${id}`,
      );
      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="table-btn btn-delete" onClick={handleToggle}>
        <CiTrash size={22} />
      </button>

      <Dialog open={open} onClose={handleToggle} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-neutral-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="grid p-3">
                <span
                  className="auth-close-icon flex items-center justify-end cursor-pointer w-full"
                  onClick={handleToggle}
                >
                  <VscClose size={26} />
                </span>
                <div className="p-7 grid">
                  <h5 className="text-2xl mb-2 text-gray-300 font-semibold">
                    Are you sure?
                  </h5>
                  <p>Are you sure you want to delete this product?</p>
                  <p className="mb-4">This action cannot be undone.</p>
                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="adm-btn-base"
                      disabled={loading}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      className="adm-btn-secondary"
                      onClick={handleToggle}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
