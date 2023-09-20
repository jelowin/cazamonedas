import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";

import "./globals.css";
import { Inter } from "next/font/google";
import BaseLayout from "@/BaseLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cazamonedas - Monedas de colección",
  description:
    "Encuentra todas las monedas de colección de dos euros conmemorativas de la Unión Europea. Colección de monedas. Conmemorativas. Coleccionistas de monedas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
