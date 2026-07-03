
import { use } from "react";
import CollectionPage from "@/app/Components/CollectionPage";

export default function collectionSlugPage({ params }) {
     const { slug } = use(params);
    console.log("Params received:", slug); // Debugging line

  return (
    <CollectionPage apiUrl={`http://localhost:5000/api/collections/page/${slug}`} />
  );
}