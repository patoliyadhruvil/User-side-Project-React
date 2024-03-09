import { PRODUCTREJ, PRODUCTREQ, PRODUCTSUC } from "../../const";

const initialState = {

    products: [],
    product: null,
    isLoading: false,
    err: false,
    cartproducts: []
}

export const ProductReducer = (state = initialState, action) => {

    switch (action.type) {
        case PRODUCTREQ:
            return {
                ...state,
                isLoading: true
            };

        case 'ADD_CART':
            const updatedCart = [...state.cartproducts, action.payload.data];
            localStorage.setItem('cartProducts', JSON.stringify(updatedCart));

            return {
                ...state,
                cartproducts: updatedCart
            };



        case 'REMOVE_CART':
            const updatedCartAfterRemove = state.cartproducts.filter(delet => delet.id !== action.payload);
            localStorage.setItem('cartProducts', JSON.stringify(updatedCartAfterRemove));

            return {
                ...state,
                cartproducts: updatedCartAfterRemove
            };


            case "INIT_CART_FROM_STORAGE":
                return {
                    ...state,
                    cartproducts: action.payload
                };

            case PRODUCTSUC:
                return {
                    ...state,
                    isLoading: false,
                    products: action.payload,
                    err: null
                }

            case PRODUCTREJ:
                return {
                    ...state,
                    err: true,
                    isloading: false
                }

            default:
                return state;
        }

}
export default ProductReducer;