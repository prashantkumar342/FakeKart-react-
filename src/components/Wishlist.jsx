
import { useState, useEffect } from "react"
// eslint-disable-next-line no-unused-vars
import $ from 'jquery'
import axios from "axios"
const Wishlist = () => {
  $('.navMenuLinks').on("click", 'li', () => {
    $('.navMenuLinks').removeClass('active')
  })
  const [products, setProducts] = useState([])
  const [wishListArr, setWishListArr] = useState([])
  useEffect(() => {
    setWishListArr(JSON.parse(localStorage.getItem('wishlistItems')))
    axios.get('https://fakestoreapi.in/api/products?limit=150')
      .then(data => setProducts(data.data.products))
  }, [])
  const addToCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || []
    let found = cart.some(id => id == productId)
    if (!found) {
      cart.push(productId)
    }
    localStorage.setItem('cartItems', JSON.stringify(cart))
  }
  const removeFromWishlist = (productId) => {
    const newWishList = wishListArr.filter((id) => {
      return id !== productId
    })
    setWishListArr(newWishList)
    localStorage.setItem('wishlistItems', JSON.stringify(newWishList))
  }
  return (
    <>
      <div className="wishlist">
        <div className="wishlistItems">
          {
            (wishListArr.length !== 0) ?
              (
                <><span className="wishlistheading">WishList Items</span>
                  {wishListArr.map((id) => (
                    products.map((product) => (
                      (product.id == id) ?
                        <>
                          <div className="wishlistcard">
                            <div className="heartNdelete">
                              <i className="fa-solid fa-heart"></i>
                              <button className="remove" onClick={() => removeFromWishlist(product.id)} ><i className="fa-solid fa-trash"></i></button>
                            </div>
                            <div className="image">
                              <img src={product.image} alt="" />
                            </div>
                            <p className="title">{product.title.slice(0, 20)}</p>
                            <button className="addtocartbtn" onClick={() => addToCart(product.id)} id={product.id} ><i className="fa-solid fa-cart-plus"></i> Add To Cart</button>
                          </div>
                        </> : <></>
                    ))
                  ))}
                </>
              ) :
              (<><div className="emptywishlist"><p>Wishlist is empty <i className="fa-solid fa-heart-circle-exclamation"></i></p></div></>)

          }
          {/*  */}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
