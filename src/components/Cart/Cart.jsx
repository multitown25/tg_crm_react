import React from "react";
import "./Cart.css";
import Button from "../Button/Button";
function Cart({ addedItems, onCheckout }) {
    const totalPrice = addedItems.reduce((a, c) => a + c.price * c.quantity, 0);

    return (
        <div className="cart__container">
            {addedItems.length === 0 ? "В заказе нет позиций" : ""}
            <br /> <span className="">Итого: {totalPrice.toFixed(2)}Р</span>
            <Button
                title={`${addedItems.length === 0 ? "Заказать" : "Оплатить"} `}
                type={"checkout"}
                disable={addedItems.length === 0 ? true : false}
                onClick={onCheckout}
            />
        </div>
    );
}

export default Cart;