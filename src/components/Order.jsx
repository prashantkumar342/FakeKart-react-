import $ from 'jquery'
const Order = () => {
  $('.navMenuLinks li').click(() => {
    $('.navMenuLinks').removeClass('active')
  })
  return (
    <div>
      <h1>Order</h1>
    </div>
  );
}

export default Order;
