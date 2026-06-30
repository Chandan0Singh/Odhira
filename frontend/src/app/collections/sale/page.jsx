import CollectionPage from "@/app/Components/CollectionPage";

export default function SalePage() {
  return (
    <CollectionPage apiUrl="http://localhost:5000/api/collections/sale" />
  );
}