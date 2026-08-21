"use client";

import { useState } from "react";
import { CreditCard, Download, Plus, Trash2, CheckCircle2 } from "lucide-react";

const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "08/28",
    default: true,
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "8219",
    expiry: "12/27",
    default: false,
  },
];

const transactions = [
  {
    id: "#ODH-10482",
    date: "21 Aug 2026",
    description: "Order #ODH-10482",
    amount: "₹4,999",
    status: "Paid",
    method: "Visa •••• 4242",
  },
  {
    id: "#ODH-10461",
    date: "16 Aug 2026",
    description: "Order #ODH-10461",
    amount: "₹7,450",
    status: "Paid",
    method: "Mastercard •••• 8219",
  },
  {
    id: "#ODH-10398",
    date: "08 Aug 2026",
    description: "Order #ODH-10398",
    amount: "₹3,299",
    status: "Paid",
    method: "Visa •••• 4242",
  },
  {
    id: "#ODH-10341",
    date: "29 Jul 2026",
    description: "Order #ODH-10341",
    amount: "₹8,999",
    status: "Paid",
    method: "Visa •••• 4242",
  },
];

export default function PaymentsPage() {
  const [methods, setMethods] = useState(paymentMethods);

  const removeCard = (id) => {
    setMethods((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] px-4 py-8 md:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-gray-500">
            Account
          </p>

          <h1 className="font-serif text-3xl text-[#1f1f1b] md:text-4xl">
            Payments
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your payment methods and view your payment history.
          </p>
        </div>

        {/* Payment Methods */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-[#1f1f1b]">
                Payment methods
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your saved cards and payment methods.
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 border border-[#1f1f1b] bg-[#1f1f1b] px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition hover:bg-black"
            >
              <Plus size={15} />
              Add new
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {methods.map((card) => (
              <div
                key={card.id}
                className="border border-[#e5e2dc] bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-14 items-center justify-center border border-[#e5e2dc] bg-[#faf9f6]">
                      <CreditCard
                        size={21}
                        strokeWidth={1.5}
                        className="text-[#333]"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#1f1f1b]">
                        {card.type}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        •••• {card.last4}
                      </p>
                    </div>
                  </div>

                  {card.default && (
                    <span className="border border-[#d8dfd2] bg-[#f3f7f0] px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#4e6048]">
                      Default
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-[#eeeae4] pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                      Expires
                    </p>

                    <p className="mt-1 text-sm text-[#333]">
                      {card.expiry}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeCard(card.id)}
                    className="flex items-center gap-1.5 text-xs text-gray-500 transition hover:text-red-600"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {methods.length === 0 && (
              <div className="border border-dashed border-[#d8d4cc] bg-white p-10 text-center md:col-span-2">
                <CreditCard
                  size={28}
                  strokeWidth={1}
                  className="mx-auto text-gray-400"
                />

                <p className="mt-3 text-sm text-gray-600">
                  No saved payment methods
                </p>

                <button className="mt-4 text-xs uppercase tracking-wider underline underline-offset-4">
                  Add payment method
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Payment History */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-medium text-[#1f1f1b]">
              Payment history
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              A record of your recent payments and invoices.
            </p>
          </div>

          <div className="overflow-hidden border border-[#e5e2dc] bg-white">
            {/* Desktop Header */}
            <div className="hidden grid-cols-[1.2fr_1.5fr_1fr_1fr_110px] border-b border-[#e5e2dc] bg-[#faf9f6] px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-gray-500 md:grid">
              <span>Payment</span>
              <span>Description</span>
              <span>Method</span>
              <span>Amount</span>
              <span>Action</span>
            </div>

            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid gap-4 border-b border-[#eeeae4] px-5 py-5 last:border-b-0 md:grid-cols-[1.2fr_1.5fr_1fr_1fr_110px] md:items-center md:gap-0"
              >
                {/* Payment */}
                <div>
                  <p className="text-sm font-medium text-[#1f1f1b]">
                    {transaction.id}
                  </p>

                  <p className="mt-1 text-xs text-gray-400 md:hidden">
                    {transaction.date}
                  </p>

                  <p className="mt-1 hidden text-xs text-gray-400 md:block">
                    {transaction.date}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm text-[#333]">
                    {transaction.description}
                  </p>
                </div>

                {/* Method */}
                <div>
                  <p className="text-xs text-gray-500">
                    {transaction.method}
                  </p>
                </div>

                {/* Amount */}
                <div>
                  <p className="text-sm font-medium text-[#1f1f1b]">
                    {transaction.amount}
                  </p>

                  <span className="mt-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#63765b]">
                    <CheckCircle2 size={12} />
                    {transaction.status}
                  </span>
                </div>

                {/* Action */}
                <div>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-xs text-gray-500 transition hover:text-[#1f1f1b]"
                  >
                    <Download size={14} />
                    Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security Note */}
        <div className="mt-6 border border-[#e5e2dc] bg-white px-5 py-4">
          <div className="flex gap-3">
            <div className="mt-0.5">
              <CheckCircle2
                size={17}
                strokeWidth={1.5}
                className="text-[#65765c]"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-[#333]">
                Your payment information is secure
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                We never store your complete card details. Payments are
                securely processed by our payment provider.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}