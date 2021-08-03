import { useRouter } from 'next/router'
import Nav from '../nav'
import { ShoppingBagIcon } from '@heroicons/react/outline';
import { nanoid } from 'nanoid';

export default function ProductDetails({ success, data }) {
    const router = useRouter()
    async function handleClick(e, product) {
        if (typeof window !== "undefined") {
            const { protocol, hostname, port } = window.location;
            const host = `${protocol}//${hostname}:${port}`;
            if (localStorage.getItem("cartID") === null) {
                let cartId = nanoid();
                localStorage.setItem('cartID', cartId);
                product.quantity = 1;
                let bodyData = { cartId: cartId, cartData: [product] }
                const res = await fetch(`${host}/api/cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bodyData)
                })
                await res.json()
                
            } else {
                let cartId = localStorage.getItem("cartID");
                const res = await fetch(`${host}/api/cart/${cartId}`)
                let { data } = await res.json()
                const index = data.cartData.findIndex((element) => element._id == product._id);
                if (index >= 0) {
                    data.cartData[index].quantity += 1;
                    const update = await fetch(`${host}/api/cart/${cartId}`, {
                        method: 'PUT',
                        body: JSON.stringify({ cartData: data.cartData })
                    })
                    await update.json()
                    const cartUrl = `${protocol}//${hostname}:${port}/cart/${localStorage.getItem("cartID")}`;
                    router.push(cartUrl);
                } else {
                    product.quantity = 1;
                    data.cartData.push(product);
                    const update = await fetch(`${host}/api/cart/${cartId}`, {
                        method: 'PUT',
                        body: JSON.stringify({ cartData: data.cartData })
                    })
                    await update.json()
                    const cartUrl = `${protocol}//${hostname}:${port}/cart/${localStorage.getItem("cartID")}`;
                    router.push(cartUrl);
                }
            }
            const cartUrl = `${protocol}//${hostname}:${port}/cart/${localStorage.getItem("cartID")}`;
            router.push(cartUrl);
        }
    }
    return (
        <>
            <Nav></Nav>
            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={data.imageUrl} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.name}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <span className="text-gray-600">{data.yumFactor} Rating</span>
                                </span>
                            </div>
                            <p className="leading-relaxed">{data.comment}</p>
                            <div className="flex mt-5">
                                <button className="absolute inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" onClick={(e) => handleClick(e, data)}>
                                    <span>Add to Bag</span>
                                    <ShoppingBagIcon className="h-4 w-4 ml-2" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps({ req, query }) {
    let url = `http://${req.headers.host}/api/cake/${query.id}`
    console.log(url)
    const res = await fetch(url)
    const { success, data } = await res.json()
    return {
        props: {
            success,
            data
        },
    }
}