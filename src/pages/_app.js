import '@/styles/globals.css'
import Layout from '@/common/components/layout/Layout'
import 'bootstrap/dist/css/bootstrap.css'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '@/service/store'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {


  return <Provider store={store}>
    <SessionProvider session={pageProps.session}>
      <Toaster position="top-right" />
      {pageProps.user ? <Layout><Component {...pageProps} /></Layout> :
        <Component {...pageProps} />
      }

    </SessionProvider>
  </Provider>
}
