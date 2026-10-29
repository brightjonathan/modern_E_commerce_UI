import { ShopProvider } from "@/context/ShopContext";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata = {
  title: {
    default: "Modern E-commerce",
    template: "%s | BrighShop",
  },
  description: "Discover curated electronics, fashion, home and more with fast delivery and easy returns.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable}`}
    >
      <body  className="min-h-screen">
        <ShopProvider>
          <Header/>
          
        <main className="min-h-[60vh]">{children} </main>


        <Footer/>
        </ShopProvider>
        </body>
    </html>
  );
}


