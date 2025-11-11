// app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
           

            <footer>
            <Footer/>
      </footer>
      </body>
     
      
      
    </html>
  );
}
