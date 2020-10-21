import GlobalStyle from "@/styles/GlobalStyle";

//render just one time
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle/>
      <Component {...pageProps} />  
    </>
  )
}
