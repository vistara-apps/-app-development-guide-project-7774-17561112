import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AgentLockr",
  description: "Lock, Trade, and Monetize Your AI Agent's Best Outputs",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "/api/og",
      button: {
        title: "Launch AgentLockr",
        action: {
          type: "launch_frame",
          name: "AgentLockr",
          url: process.env.NEXT_PUBLIC_URL,
          splashImageUrl: "/splash.png",
          splashBackgroundColor: "#0a0f1a",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
