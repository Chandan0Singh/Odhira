"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingContact() {
  const whatsappNumber = "918860968260";
  const phoneNumber = "+918860968260";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Call */}
      <a
        href={`tel:${phoneNumber}`}
        aria-label="Call us"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5E6B58] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <FaPhoneAlt size={22} />
      </a>
    </div>
  );
}