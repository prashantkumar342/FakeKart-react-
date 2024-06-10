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
  const [sliderImages, setSliderImages] = useState([])
  // const [saleSpecialProducts, setSaleSpecialProducts] = useState([])
  useEffect(() => {
    axios.get('https://fakestoreapi.in/api/products/category')
      .then(data => setCategoryBtns(data.data.categories))
  }, [])

  useEffect(() => {
    axios.get('https://fakestoreapi.in/api/products?limit=20')
      .then(data => setSliderImages(data.data.products))
  }, [])
  // useEffect(() => {
  //   axios.get('https://fakestoreapi.in/api/products?limit=4')
  //     .then(data => setSaleSpecialProducts(data.data.products))
  // }, [])
  // const addToCart = (productId) => {
  //   let cart = JSON.parse(localStorage.getItem('cartItems')) || []
  //   let found = cart.some(id => id == productId)
  //   if (!found) {
  //     cart.push(productId)
  //   }
  //   localStorage.setItem('cartItems', JSON.stringify(cart))
  // }
  return (
    <>
      <ul className="categoryBtnWrapper">
        {categoryBtns.map((item, index) =>
          <li key={index} className='categoryBtn' id={item}>
            <Link to={`/${item}`}>
              <i className="fa-solid fa-hashtag">
              </i> {item}</Link></li>
        )}
      </ul>
      <div className="overview">
        <div className="slideImages">
          <p onClick={() => { $('.categoryBtnWrapper').toggleClass('active'); $('.navMenuLinks').removeClass('active') }}><i className="fa-solid fa-bars-progress" ></i></p>
          {sliderImages.map((product, index) => (
            <img key={index}
              className='sliderImg'
              src={product.image}
            />
          ))}
        </div>
        <div className="salecard">
          <div className="saleaside">
            <p className="saleName">Bigest fake sale of the year <i className="fa-solid fa-bell"></i></p>
            <p className="des" >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi error voluptatibus omnis et atque. Eos, aliquam, nam dicta praesentium ducimus omnis modi tenetur magnam, rem voluptatum ipsum! Eveniet quidem voluptatum amet nesciunt mollitia natus deserunt eligendi maxime, numquam explicabo rem.</p>
            <button className="btn"><i className="fa-solid fa-shop"></i> Go To ShowRoom <i className="fa-solid fa-arrow-up-right-from-square"></i></button>
            <p className="brands">
              HOT BRANDS</p>
            <div className="brandsBtns">
              <button className="brandbtn" id="apple">Apple <i className="fa-solid fa-arrow-up-right-from-square"></i></button>
              <button className="brandbtn" id="samsung">Samsung <i className="fa-solid fa-arrow-up-right-from-square"></i></button>
              <button className="brandbtn" id="boat">Boat <i className="fa-solid fa-arrow-up-right-from-square"></i></button>
              <button className="brandbtn" id="microsoft">Microsoft <i className="fa-solid fa-arrow-up-right-from-square"></i></button>
            </div>
          </div>
        </div>
      </div >


    </>
  );
}

export default Home;
