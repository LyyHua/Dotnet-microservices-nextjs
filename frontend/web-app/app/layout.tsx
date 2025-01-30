import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./nav/NavBar";
import ToasterProvider from "./providers/ToasterProvider";
import SignalRProvider from "./providers/SignalRProvider";
import { getCurrentUser } from "./actions/authActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carsties",
  description: "Here you can find the best cars, auction for them bid for them and more",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser()
  const notifyUrl = process.env.NOTIFY_URL
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToasterProvider />
        <NavBar/>
        <main className="container mx-auto px-5 pt-10">
          <SignalRProvider user={user} notifyUrl={notifyUrl!}>
            {children}
          </SignalRProvider>
        </main>
      </body>
    </html>
  );
}
