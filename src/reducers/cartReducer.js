const CartReducer = (state, action) => {

    // Ensure that state.cart is always an array
    const cart = state.cart || [];

    if (action.type === "ADD_TO_CART") {
        let { id, color, quantity, singleproduct } = action.payload;

        let existingProduct = cart.find((curElem) => curElem.id === id + color);

        if (existingProduct) {
            let updatedCart = cart.map(curElem => {
                if (curElem.id === id + color) {
                    let newQuantity = curElem.quantity + quantity;
                    if (newQuantity > curElem.stock) {
                        newQuantity = curElem.stock;
                    }
                    return {
                        ...curElem,
                        quantity: newQuantity
                    };
                }
                return curElem;
            });

            return {
                ...state,
                cart: updatedCart
            };

        } else {
            let tempCartProduct = {
                id: id + color,
                name: singleproduct.name,
                quantity: quantity,
                color: color,
                price: singleproduct.price,
                stock: singleproduct.stock,
                image: singleproduct.image[0].url,
            };

            return {
                ...state,
                cart: [...cart, tempCartProduct]
            };
        }
    }

    if (action.type === "REMOVE_ITEM") {
        let updatedCart = cart.filter((curElem) => curElem.id !== action.payload);
        return {
            ...state,
            cart: updatedCart
        };
    }

    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            cart: []
        };
    }

    if (action.type === "INCREASE_QUANTITY") {
        let updatedCart = cart.map(curElem => {
            if (curElem.id === action.payload) {
                let newQuantity = curElem.quantity + 1;
                if (newQuantity > curElem.stock) {
                    newQuantity = curElem.stock;
                }
                return {
                    ...curElem,
                    quantity: newQuantity
                };
            }
            return curElem;
        });

        return {
            ...state,
            cart: updatedCart
        };
    }

    if (action.type === "DECREASE_QUANTITY") {
        let updatedCart = cart.map(curElem => {
            if (curElem.id === action.payload) {
                let newQuantity = curElem.quantity - 1;
                if (newQuantity < 1) {
                    newQuantity = 1;
                }
                return {
                    ...curElem,
                    quantity: newQuantity
                };
            }
            return curElem;
        });

        return {
            ...state,
            cart: updatedCart
        };
    }

    if (action.type === "CART_TOTAL_PRICE&ITEMS") {
        let { totalCartItems, totalCartPrice } = cart.reduce((accum, curElem) => {
            let { quantity, price } = curElem;

            accum.totalCartItems += quantity;
            accum.totalCartPrice += quantity * price;
            return accum;

        }, {
            totalCartItems: 0,
            totalCartPrice: 0
        });

        return {
            ...state,
            totalCartItems: totalCartItems,
            totalCartPrice: totalCartPrice,
        };
    }

    return state;
};

export default CartReducer;
