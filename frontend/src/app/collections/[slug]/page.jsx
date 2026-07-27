import { use } from "react";
import CollectionPage from "@/app/Components/CollectionPage";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function collectionSlugPage({ params }) {
  const { slug } = use(params);
  console.log("Params received:", slug); // Debugging line

  return <CollectionPage apiUrl={`${API_BASE}/api/collections/page/${slug}`} />;
}
