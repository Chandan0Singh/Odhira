"use client";

export default function ConfirmPopup({
  message,
  onClose,
}) {

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-3">
          Confirmation
        </h2>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          {/* CANCEL */}

          <button
            onClick={() => onClose(false)}
            className="border px-5 py-2 rounded-xl"
          >
            Cancel
          </button>

          {/* CONFIRM */}

          <button
            onClick={() => onClose(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl"
          >
            Confirm
          </button>

        </div>

      </div>

    </div>
  );
}