import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import { AuthProvider } from "@/context/AuthContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Odhira",
  description: "Luxury Fashion Brand",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable}`}
    >
      <body className="antialiased bg-[#F8F5EE] text-[#2D2D2D]">
        <AuthProvider>
          <Header />

          <main>{children}</main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}