import { ReduxProvider } from "@/store/provider";
import { Bai_Jamjuree } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Elysian Feeds | Home",
  description:
    "Elysian Feeds is a charitable initiative website that empowers users to contribute resources or consume them, fostering collaboration and empowerment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={baiJamjuree.className}>
        <ReduxProvider>
          <Toaster position="bottom-left" toastOptions={{ duration: 5000 }} />
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
