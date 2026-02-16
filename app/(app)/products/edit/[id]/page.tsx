import EditFormProduct from "@/components/products/edit/EditFormProduct";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div className="px-2 pb-8">
      <EditFormProduct id={id} />
    </div>
  );
}
