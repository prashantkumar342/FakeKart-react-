import $ from 'jquery'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const Categories = () => {
  const [categoryBtns, setCategoryBtns] = useState([])
  $('.navMenuLinks li').click(() => {
    $('.navMenuLinks').removeClass('active')
  })
  const [products, setProducts] = useState([])
  const { category } = useParams()

  useEffect(() => {
    axios.get(`https://fakestoreapi.in/api/products/category?type=${category}`)
      .then(data => setProducts(data.data.products))
  }, [category])
  useEffect(() => {
    axios.get('https://fakestoreapi.in/api/products/category')
      .then(data => setCategoryBtns(data.data.categories))
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
    $('.categoryPageContainer .categoryBtns').removeClass('active')
    let wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || []
    let found = wishlist.some(id => id == productId)
    if (!found) {
      wishlist.push(productId)
    }
    localStorage.setItem('wishlistItems', JSON.stringify(wishlist))
  }
  $('.categoryPageContainer .categoryBtns').on('click', 'li', () => {
    $('.categoryPageContainer .categoryBtns').removeClass('active')
  })
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 5) {
      $('.categoryPageContainer .categoryBtns').removeClass('active')
    }
  });
  // window.addEventListener('scroll', () => {
  //   if (pageYOffset == 4) {
  //     console.log(pageYOffset)
  //     $('.categoryPageContainer .categoryBtns').removeClass('active')
  //   }
  // })

  const categoryMenuActive = () => {
    $('.navMenuLinks').removeClass('active')
    $('.categoryPageContainer .categoryBtns').toggleClass('active')
  }
  return (
    <>
      <button className='categorymenubtn' onClick={() => categoryMenuActive()}>Categories <i className="fa-solid fa-hashtag"></i></button>
      <div className="categoryPageContainer">
        <ul className="categoryBtns">
          {categoryBtns.map((item, index) =>
            // eslint-disable-next-line react/jsx-key
            <Link to={`/${item}`}> <li key={index} className='categoryBtn' id={item}>
              <i className="fa-solid fa-hashtag"></i> {item}</li></Link>
          )}
        </ul>
        <div className="categoryproductscontainer">

          {
            products.map((product, index) => (
              <div className="card" key={index}>
                <Link to={`/category/${product.id}`} >
                  <div className="productdetails">
                    <div className="image">
                      <img src={product.image} alt="" />
                    </div>
                    <div className="detail">
                      <p className="title">{product.title.slice(0, 20)}...</p>
                      <p className="des">{product.description.slice(0, 100)}...</p>
                      <div className="priceNdiscount">
                        <p className="price">${product.price}</p>
                        <p className="discount">{product.discount}% off</p>
                      </div>
                    </div>
                  </div>
                </Link >
                <div className="buttons">
                  <button className="addtocart" onClick={() => addToCart(product.id)} ><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
                  <button className="wishlish" onClick={() => addToWishlist(product.id)} ><i className="fa-solid fa-heart-circle-plus"></i> Add to Wishlist</button>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </>

  );
}

export default Categories;
