import CollectionPage from "@/app/Components/CollectionPage";

export default function AccessoriesPage() {
  return (
    <CollectionPage apiUrl="http://localhost:5000/api/collections/accessories" />
  );
}