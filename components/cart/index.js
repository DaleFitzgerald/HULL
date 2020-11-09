import React from 'react'

import { centsToPrice } from '../../lib/helpers'

import Drawer from '../drawer'
import CartItem from './item'

import {
  useStore,
  useCartTotals,
  useCartItems,
  useCheckout,
  useToggleCart,
} from '../../contexts/shopify-context'

const Cart = () => {
  const { isCartOpen, isUpdating } = useStore()
  const { subTotal } = useCartTotals()
  const lineItems = useCartItems()
  const checkoutURL = useCheckout()
  const toggleCart = useToggleCart()

  const goToCheckout = (e) => {
    e.preventDefault()
    toggleCart(false)
    window.open(checkoutURL, '_self')
  }

  return (
    <Drawer title="Your Cart" open={isCartOpen} toggle={toggleCart}>
      {lineItems.length > 0 ? (
        <>
          <CartItems items={lineItems} />
          <div className="cart--footer">
            <div className="cart--subtotal">
              <span>Subtotal</span>
              <span>${centsToPrice(subTotal)}</span>
            </div>

            <a
              href={checkoutURL}
              onClick={(e) => goToCheckout(e)}
              className="btn is-block"
            >
              {isUpdating ? 'Updating...' : 'Checkout'}
            </a>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </Drawer>
  )
}

const CartItems = ({ items }) => {
  return (
    <div className="cart--content">
      <div className="cart--items">
        {items.map((item) => {
          return <CartItem key={item.lineID} item={item} />
        })}
      </div>
    </div>
  )
}

const EmptyCart = () => (
  <div className="cart--empty">
    <p>Cart is empty, nerd</p>
  </div>
)

export default Cart
