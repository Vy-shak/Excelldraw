import type { Metadata } from "next";
import "./globals.css";
import "@repo/ui/styles.css";
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  weight: ['100', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`} style={{ backgroundColor: "#F0F1F1" }} >
        {children}
      </body>
    </html>
  );
}
