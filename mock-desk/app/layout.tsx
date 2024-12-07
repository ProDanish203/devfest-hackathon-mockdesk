import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "@/store/ReactQueryProvider";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "MockDesk - Your Personal Interview Coach",
  description:
    "MockDesk is your personal interview coach. Practice coding interviews, get feedback, and land your dream job. Sign up for free! start practicing today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        afterSignOutUrl={"/sign-in"}
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-primary hover:bg-primary/90 text-sm !shadow-none",
          },
        }}
      >
        <body
          className={`${poppins.className} ${roboto.variable} antialiased overflow-x-clip`}
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
