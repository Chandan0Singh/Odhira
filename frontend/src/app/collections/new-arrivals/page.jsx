import CollectionPage from "@/app/Components/CollectionPage";

export default function NewArrivalsPage() {
  return (
    <CollectionPage apiUrl="http://localhost:5000/api/collections/new-arrivals" />
  );
}