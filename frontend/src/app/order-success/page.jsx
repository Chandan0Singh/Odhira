import { Suspense } from "react";
import OrderSuccessContent from "../Components/OrderSuccessContent";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}