import "./globals.css";

export const metadata = {
  title: "OAU Post-UTME CBT",
  description: "OAU Post-UTME practice platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
