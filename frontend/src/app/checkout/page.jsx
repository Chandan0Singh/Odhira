import { Suspense } from "react";
import CheckoutContent from "../Components/CheckoutContent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}