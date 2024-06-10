/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import $ from 'jquery'
import { useEffect, useState } from "react";
const Cart = () => {
  $('.navMenuLinks li').click(() => {
    $('.navMenuLinks').removeClass('active')
  })
  const [products, setProducts] = useState([])
  const [cartArr, setCartArr] = useState([])
  let totalPrice = 0;
  let totalDiscount = 0;

  useEffect(() => {
    setCartArr(JSON.parse(localStorage.getItem('cartItems')))
    axios.get('https://fakestoreapi.in/api/products?limit=150')
      .then(data => setProducts(data.data.products))
  }, [])
  const removeFromCart = (productId) => {
    const newCartArr = cartArr.filter((id) => {
      return id !== productId
    })
    setCartArr(newCartArr)
    localStorage.setItem('cartItems', JSON.stringify(newCartArr))
  }
  if (cartArr.length !== 0) {
    cartArr.forEach(id => {
      products.forEach(product => {
        if (product.id == id) {
          totalPrice += product.price
          totalDiscount += ((product.discount / 100) * product.price)
        }
      })
    })
  }
  console.log(totalPrice)
  return (
    <>
      <div className="cart">
        <div className="itemCard">
          {
            (cartArr.length !== 0) ?
              (
                cartArr.map((id) => (
                  products.map((product, index) => (

                    (product.id == id) ?

                      (
                        <>
                          <table>
                            <tr key={index}>
                              <td rowSpan='2' className="imgrow"><img src={product.image} alt="" /></td>
                              <td><p>Price: ${product.price}</p></td>
                              <td><p>Discount: {product.discount}%</p></td>
                              <td className="delbtn" onClick={() => removeFromCart(product.id)} id={product.id} colSpan='3'><button><i className="fa-solid fa-trash-can"></i> del</button></td>
                            </tr>
                            <tr>
                              <td colSpan='4'><p>{product.title.slice(0, 20)}</p></td>
                              <td className="quantitybtns">
                                <button className='minusbtn'><i className="fa-solid fa-minus"></i></button>
                                <button className="qunatity">10</button><button className="plusbtn"><i className="fa-solid fa-plus"></i></button></td>
                            </tr>
                          </table>
                        </>)
                      // eslint-disable-next-line react/jsx-key
                      : <p></p>
                  ))
                ))
              ) : (
                <div className="emptycart">
                  <table>
                    <tr>
                      <td>Cart Is Empty <i className="fa-solid fa-cart-shopping"></i></td>
                    </tr>
                  </table>
                </div>
              )
          }
        </div>
        {
          (cartArr.length !== 0) ?
            (
              <div className="pricing">
                <table>
                  <tr className="pricinghead"><td colSpan={2}><p >Pricing</p></td></tr>
                  <tr className="totalprice"><td>Total Price</td><td>${totalPrice}</td></tr>
                  <tr className="discount"><td>Discount</td><td>-${Math.trunc(totalDiscount)}</td></tr>
                  <tr className="gtotal"><td>GrandTotals</td><td>${Math.trunc(totalPrice - totalDiscount)}</td></tr>
                  <tr className="checkout"><td colSpan={2}><button id="checkoutbtn"><i className="fa-solid fa-check-to-slot"></i> CheckOut</button></td></tr>
                </table>
              </div>
            ) : (<></>)
        }
      </div >
    </>
  );
}

export default Cart;
