import $ from 'jquery'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const Categories = () => {
  $('.navMenuLinks li').click(() => {
    $('.navMenuLinks').removeClass('active')
  })
  const [productsData, setProducts] = useState([])
  const { category } = useParams()

  useEffect(() => {
    axios.get(`https://fakestoreapi.in/api/products/category?type=${category}`)
      .then(data => setProducts(data.data.products))
  }, [category])
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
      <div className="categoryproductsWrapper">
        <button className="heading"><p>Category: {category}</p></button>

        {productsData.map((product, index) => (
          <div className="card" key={index} id={product.id}>
            <Link to={`/category/${product.id}`} ><div className="card-image">
              <img src={product.image} id={product.id} alt="" />
            </div></Link>

            <div className="productdetail" >
              <p id={product.id} ><Link to="/product" >{product.title.slice(0, 30)}</Link> ....</p>
              <h3><i className="fa-solid fa-tag"></i> ${product.price}</h3>
              <p>{product.discount} <i className="fa-solid fa-percent"></i> off</p>
              <button className="addtocartbtn" onClick={() => addToCart(product.id)} id={product.id}><i className="fa-solid fa-cart-plus"></i> Add To Cart</button>
              <button className='addtowishlist' onClick={() => addToWishlist(product.id)} id={product.id}><i className="fa-solid fa-heart"></i> WishList</button>
            </div>
          </div>
        ))}

      </div>
    </>

  );
}

export default Categories;
