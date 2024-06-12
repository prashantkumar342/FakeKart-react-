// import { lazy } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import $ from 'jquery'
const Home = () => {
  $('.navMenuLinks li').click(() => {
    $('.navMenuLinks').removeClass('active')
  })
  const [categoryBtns, setCategoryBtns] = useState([])
  const [hotproducts, SetHotProducts] = useState([]);
  useEffect(() => {
    axios.get('https://fakestoreapi.in/api/products/category')
      .then(data => setCategoryBtns(data.data.categories))
  }, [])
  useEffect(() => {
    axios.get('https://fakestoreapi.in/api/products?limit=4')
      .then(response => SetHotProducts(response.data.products))
  }, [])

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
      <ul className="categoryBtnWrapper">
        {categoryBtns.map((item, index) =>
          <li key={index} className='categoryBtn' id={item}>
            <Link to={`/${item}`}>{item}</Link></li>
        )}
      </ul>
      <div className="saleOverview">
        <div className="salephoto">
          <img src="/sale.png" alt="" />
        </div>
        <div className="hotsale">
          <div className="hotproducts">
            {
              hotproducts.map((product) => (
                <div className="card" key={product.id}>
                  <Link to={`/category/${product.id}`} ><div className="image">
                    <img src={product.image} alt="" />
                  </div></Link>
                  <Link to={`/category/${product.id}`} ><p className="title">{product.title.slice(0, 10)}...</p></Link>
                  <div className="btns">
                    <button className="addtocart" onClick={() => addToCart(product.id)}><i className="fa-solid fa-cart-plus"></i></button>
                    <button className="addtowishlist" onClick={() => addToWishlist(product.id)}><i className="fa-solid fa-heart-circle-plus"></i></button>

                  </div>

                </div>
              ))
            }

          </div>
          <div className="hotbrands">
            <button>Apple <i className="fa-solid fa-arrow-up-right-from-square"></i></button>
            <button>MicroSoft <i className="fa-solid fa-arrow-up-right-from-square"></i></button>
            <button>Samsung <i className="fa-solid fa-arrow-up-right-from-square"></i></button>
            <button>Boat <i className="fa-solid fa-arrow-up-right-from-square"></i></button>
          </div>
          <div className="saledetails">
            <p className="salename">Biggest Fake Sale Of The Year</p>
            <p className="saledes">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi deserunt, minus corporis mollitia, assumenda iure modi doloremque, iste commodi aliquam ipsam? Eius nisi quisquam, voluptatum eum sequi assumenda dolorem itaque!</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
