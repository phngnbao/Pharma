import toast from "react-hot-toast";

const addToCart = (medicine) => {
    const getCartItems = localStorage.getItem("cartItems");

    if (getCartItems) {
        const cartItems = JSON.parse(getCartItems);
        const existingItem = cartItems.find((item) => item._id === medicine._id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...medicine, quantity: 1 });
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        toast.success(`${medicine.name} đã được thêm vào giỏ hàng!`);
    } else {
        const newCartItems = [{ ...medicine, quantity: 1 }];
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        toast.success(`${medicine.name} đã được thêm vào giỏ hàng!`);
    }
};

export const getCartItems = () => {
    const getCartItems = localStorage.getItem("cartItems");
    return getCartItems ? JSON.parse(getCartItems) : [];
};

export default addToCart;
