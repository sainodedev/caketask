/* This example requires Tailwind CSS v2.0+ */
import { ShoppingBagIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Nav() {
    const router = useRouter()
    async function handleClick(e) {
        e.preventDefault();
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cartID") !== null) {     
                const { protocol, hostname, port } = window.location;
                const host = `${protocol}//${hostname}:${port}/cart/${localStorage.getItem("cartID")}`;
                router.push(host);
            }
        }
    }
    return (
        <div>
            <Head>
                <title>Cake Shop</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="">
                <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="/">
                            <div className="grid grid-cols-2">
                                <span className="sr-only font-sans ">Cake Shop</span>
                                <h4 className="leading-7">Cake Shop</h4>
                            </div>
                        </a>
                    </div>

                    <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                        <a href="#" onClick={(e) => handleClick(e)}>
                            <span className="relative inline-block">
                                <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
