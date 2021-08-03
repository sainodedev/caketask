import Nav from '../nav';
import { useRouter } from 'next/router'

export default function Cart({ success, data }) {
  const router = useRouter()

  let { cartData } = data;
  async function handleClick(e, item) {
    e.preventDefault();
    let final = cartData.filter(e => e._id !== item._id)
    if (typeof window !== "undefined") {
      const { protocol, hostname, port } = window.location;
      const host = `${protocol}//${hostname}:${port}`;
      let cartId = localStorage.getItem("cartID");
      const update = await fetch(`${host}/api/cart/${cartId}`, {
        method: 'PUT',
        body: JSON.stringify({ cartData: final })
      })
      await update.json()

      router.reload(window.location.pathname)
    }

  }

  return (
    <div >
      <Nav></Nav>
      <main className="p-20 ">

        <div className=" bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Bag</h1>
            <h2 className="font-semibold text-2xl">{data.cartData.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
          </div>
          {cartData.length && success ? (
            cartData.map((item, i) => (
              <div key={i}>
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img className="h-24" src={item.imageUrl} alt="" />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{item.name}</span>
                      <a href="#" onClick={(e) => handleClick(e, item)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    {item.quantity}
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">${180.00 * item.quantity}</span>
                </div>
              </div>))
          ) : (
            <p>Your bag is empty :/</p>
          )}

          <a href="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            Continue Shopping
          </a>
        </div>
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="/"
        >
          Ⓒ copyright Cake Shop
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps({ req, query }) {
  let url = `http://${req.headers.host}/api/cart/${query.id}`
  const res = await fetch(url)
  const { success, data } = await res.json()
  return {
    props: {
      success,
      data
    },
  }
}

