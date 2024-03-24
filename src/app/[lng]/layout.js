import '../../../public/assets/scss/app.scss'
import I18NextProvider from "@/Helper/I18NextContext/I18NextProvider"
import TanstackWrapper from "@/Layout/TanstackWrapper"

export async function generateMetadata() {
  // fetch data
  const settingData = await fetch(`${process.env.NEXT_PUBLIC_API_PROD_URL}settings`).then((res) => res.json()).catch((err) => console.log("err", err))
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_API_PROD_URL),
    title: 'Maepui - Admin',
    description: settingData?.values?.general?.site_tagline,
    icons: {
      icon: settingData?.values?.general?.favicon_image?.url,
      link: {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Public+Sans&display=swap"
      },
    }
  }
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng}>
      <body suppressHydrationWarning={true}>
        <I18NextProvider><TanstackWrapper>{children}</TanstackWrapper></I18NextProvider></body>
    </html>
  )
}
