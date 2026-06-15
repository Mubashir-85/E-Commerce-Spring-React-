import React from "react";

const CheckoutPopup = ({
  show,
  handleClose,
  cartItems,
  totalPrice,
  handleCheckout,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
  <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
    
    <div className="border-b px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-900">
        Checkout
      </h2>

      <button
        onClick={handleClose}
        className="text-2xl text-gray-500 hover:text-black"
      >
        ×
      </button>
    </div>

    <div className="p-6 max-h-[60vh] overflow-y-auto">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 mb-4 pb-4 border-b"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-24 h-24 rounded-xl object-cover"
          />

          <div>
            <h3 className="font-bold text-gray-900">
              {item.name}
            </h3>

            <p className="text-gray-500">
              Quantity: {item.quantity}
            </p>

            <p className="font-semibold">
              ${item.price * item.quantity}
            </p>
          </div>
        </div>
      ))}

      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Total: ${totalPrice}
        </h2>
      </div>
    </div>

    <div className="border-t p-4 flex justify-end gap-3">
      <button
        onClick={handleClose}
        className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        Close
      </button>

      <button
        onClick={handleCheckout}
        className="px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
      >
        Confirm Purchase
      </button>
    </div>
  </div>
</div>
  );
};

export default CheckoutPopup;