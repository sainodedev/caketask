import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (<div className="max-w-7xl mx-auto px-4 sm:px-6"><Component {...pageProps} /></div>)
}

export default MyApp
