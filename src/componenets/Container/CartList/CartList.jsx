import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { INIT_CART_FROM_STORAGE, productremove } from "../../../Service/Action/product.action";
import { useEffect, useState } from "react";

const CartList = () => {
    const cartproduct = useSelector((state) => state.ProductReducer.cartproducts);
    const dispatch = useDispatch();
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const cartProductsFromStorage = JSON.parse(localStorage.getItem('cartProducts'));

        if (cartProductsFromStorage) {
            dispatch({ type: INIT_CART_FROM_STORAGE, payload: cartProductsFromStorage });
            const initialQuantities = cartProductsFromStorage.reduce((acc, product) => {
                acc[product.id] = product.quantity || 0;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [dispatch]);

    const handleRemove = (id) => {
        dispatch(productremove(id));
    };

    const handlePay = () => {
        alert("Successfully Payment");
    };

    const updateQuantity = (id, amount) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: Math.max(0, (prevQuantities[id] || 1) + amount),
        }));
    };

    const totalprice = cartproduct.reduce((total, product) => {
        return total + (quantities[product.id] || 1) * product.price;
    }, 0);

    return (
        <Container className="cart-table-container">
            <h1 className='text-center my-3'>View Cart</h1>
            <Table className="cart-table striped bordered hover">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartproduct.map((data) => (
                        <tr key={data.id}>
                            <td><img src={data.image} alt="" width="50px" height="50px" /></td>
                            <td>{data.Product_name}</td>
                            <td>{data.category}</td>
                            <td>
                                <button onClick={() => updateQuantity(data.id, 1)}>+</button>
                                {quantities[data.id] || 1}
                                <button onClick={() => updateQuantity(data.id, -1)}>-</button>
                            </td>
                            <td>{data.price}</td>
                            <td><button className='btn btn-danger' onClick={() => handleRemove(data.id)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="maincard d-flex justify-content-end">
                <div className="card total-card">
                    <div className="total">
                        <h4>Total</h4>
                    </div>
                    <div className="total-price d-flex p-2">
                        <h5 className='d-flex'>Total : </h5> <h5 className='text-success ps-2'>{totalprice + " " + "Rs"}</h5>
                    </div>
                    <div className="button">
                        <Link to={'/WatchShop'}><button className='btn btn-primary'>Back to Shopping</button></Link>
                        <button className='btn btn-info' onClick={handlePay}>Pay</button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CartList;
