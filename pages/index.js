import Nav from './nav';

export default function Home({ success, data }) {
  return (
    <div >
      <Nav></Nav>
      <main className="grid grid-cols-3 gap-3 p-20 ">
        {data.length && success ? (
          data.map((cake, i) => (
            <div key={i}>
              <a href={"/product/" + cake._id}>
                <img src={cake.imageUrl} alt=" random imgee" className="w-full object-cover object-center rounded-lg shadow-md" />
              </a>
              <div className="relative px-4 -mt-16">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <span className="flex items-center absolute right-10">
                    <span className="text-gray-600 ml-3">{cake.yumFactor} Rating</span>
                  </span>
                  <h4 className="mt-10 text-base font-semibold uppercase leading-tight truncate">{cake.name}</h4>
                  <div className="text-gray-600 text-xs font-semibold tracking-wider truncate mt-2">
                    {cake.comment}
                  </div>
                  {/* <div className="py-5 px-5">
                    <button className="absolute right-10 inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                      <span>Add to Bag</span>
                      <ShoppingBagIcon className="h-4 w-4 ml-2" aria-hidden="true" />
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No cakes to show :/</p>
        )}

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
// Home.getInitialProps = async (ctx) => {


// }


export async function getServerSideProps({ req }) {
  let url = `http://${req.headers.host}/api/cake`
  const res = await fetch(url)
  const { success, data } = await res.json()
  return {
    props: {
      success,
      data
    },
  }
}