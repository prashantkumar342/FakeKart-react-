import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Productspecs = () => {
  const [product, setProduct] = useState([])
  const { productId } = useParams()

  useEffect(() => {
    axios.get(`https://fakestoreapi.in/api/products/${productId}`)
      .then(response => setProduct(response.data.product))
  }, [productId])

  const addToCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || []
    let found = cart.some(id => id == productId)
    if (!found) {
      cart.push(productId)
    }
    localStorage.setItem('cartItems', JSON.stringify(cart))
  }
  const addToWishlist = (productId) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || []
    let found = wishlist.some(id => id == productId)
    if (!found) {
      wishlist.push(productId)
    }
    localStorage.setItem('wishlistItems', JSON.stringify(wishlist))
  }

  return (
    <>
      <div className="productspecs">

        <div className="image">
          <img src={product.image} alt="" />
        </div>
        <div className="productDetails">
          <p className="title">{product.title}</p>
          <p className="price"><i className="fa-solid fa-tag"></i> ${product.price}</p>
          <p className="des">{product.description}</p>
          <div className="tags">
            <p className="brand">Brand: {product.brand}</p>
            <p className="model">Model: {product.model}</p>
            <p className="color">Color: {product.color}</p>
            <p className="category">Category: {product.category}</p>
            <p className="discount">Discont: {product.discount}%</p>
          </div>
          <div className="buttons">
            <button className="addtocart" onClick={() => addToCart(product.id)} ><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
            <button className="wishlish" onClick={() => addToWishlist(product.id)} ><i className="fa-solid fa-heart-circle-plus"></i> Add to Wishlist</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Productspecs;
