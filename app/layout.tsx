import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "@/store/providers";

const roboto = Roboto({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "ALH Oil Company | Admin Dashboard",
	description: "Oil company admin dashboard",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto.variable}  antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
