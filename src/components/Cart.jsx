import { useState } from "react";

export const Cart = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));

    return (
        <div>
            <h1 className="text-3xl font-semibold ml-4">Carrito</h1>
            {cart.map((shoe) => (
                <>
                    <div className="flex w-full h-56 bg-white border-0 border-neutral-100 rounded-xl py-4">
                        <div className="mr-4 overflow-hidden rounded-xl flex items-center p-6 bg-neutral-100 border-2 border-neutral-200 w-1/3 md:w-48">
                            <img className="w-full object-cover" src={shoe.image} alt={shoe.brand + ' ' + shoe.model} />
                        </div>
                        <div className="flex flex-1 justify-between py-2 md:py-8">
                            <div className="flex flex-col flex-1 justify-between">
                                <div>
                                    <p className="font-bold text-xl font-['Unbounded']">{shoe.brand}</p>
                                    <p className="font-bold text-4xl">{shoe.model}</p>
                                </div>
                                <div>
                                    <hr className="my-2 rounded-full bg-neutral-200" />
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <p className="text-xl">Talla: {shoe.size}</p>
                                        <h2 className="font-semibold text-3xl">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(shoe.price)}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ))}
            <hr className="my-2 rounded-full bg-neutral-200" />
            <div className="flex justify-end">
                <p className="text-xl mr-2">Total</p>
                <h2 className="font-black text-4xl">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(cart.reduce((total, shoe) => total + shoe.price, 0))}</h2>
            </div>
        </div>
    )
}
