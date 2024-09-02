import './globals.css';

export const metadata = {
  title: 'MyEasyPharma',
  description: 'AI Curated corporate wellness program',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.png" />
      <link href="https://fonts.cdnfonts.com/css/lufga" rel="stylesheet"></link>
      </head>
      <body>{children}</body>
    </html>
  )
}
