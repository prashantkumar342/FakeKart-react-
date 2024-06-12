
import { Link } from "react-router-dom";
import $ from 'jquery'
const Navbar = () => {
  const navMenuActive = () => {
    $('.navMenuLinks').toggleClass('active')
    $('.categoryBtnWrapper').removeClass('active')
    $('.categoryPageContainer .categoryBtns').removeClass('active')
  }
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 5) {
      $('.navMenuLinks').removeClass('active')
    }
  });
  $('.navMenuLinks').on("click", 'li', () => {
    $('.navMenuLinks').removeClass('active')
  })
  return (
    <nav>
      <div className="logo"><p><h1>Fake</h1><h1>Kart</h1></p></div>
      <ul className="navMenuLinks">
        <li><Link to="/" >Home</Link></li>
        <li><Link to="Wishlist" >Wishlist</Link></li>
        <li><Link to="Order">Order</Link></li>
        <li><Link to="Cart" >Cart</Link></li>
      </ul>
      <div className="navSearch">
        <input type="text" placeholder="search" id="navSearch" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="menubtn" onClick={navMenuActive} ><i className="fa-solid fa-bars"></i></div>
    </nav>
  );
}

export default Navbar;
