import type React from "react"
import type { Metadata } from "next"
import { Sora, IBM_Plex_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CookieBanner } from "@/components/cookie-banner"
import "./globals.css"

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })
const ibmPlexSans = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-ibm-plex",
})

export const metadata: Metadata = {
	title: "Purr-Hydrate | Science of Hydration. Designed for Life.",
	description:
		"Smart hydration systems for pets and people. Innovative water flow technology that blends biology and engineering.",
	referrer: 'unsafe-url',
	icons: {
		icon: [
			{
				url: "/icon-light-32x32.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/icon-dark-32x32.png",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/icon.svg",
				type: "image/svg+xml",
			},
		],
		apple: "/apple-icon.png",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${sora.variable} ${ibmPlexSans.variable} font-sans antialiased`}>
				{children}
				<CookieBanner />
				<Analytics />
			</body>
		</html>
	)
}
