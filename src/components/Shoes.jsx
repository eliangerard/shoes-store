import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";

export const Shoes = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const [type, setType] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);

    const { data: shoes, hasError, isLoading } = useFetch('https://shoes-gamemz.koyeb.app/shoes/' + id);

    const handleBack = () => {
        navigate('/');
    }

    const handleAddCart = () => {

        const addedShoe = {
            id: shoes._id,
            brand: shoes.brand,
            model: shoes.model,
            price: shoes.price,
            size: shoes.sizes[selectedSize],
            image: shoes.images[type],
            selectedSize,
            type
        }

        const actualCart = JSON.parse(localStorage.getItem('cart'));
        if(actualCart){
            actualCart.push(addedShoe);
            localStorage.setItem('cart', JSON.stringify(actualCart));
        }
        else localStorage.setItem('cart', JSON.stringify([addedShoe]));
    }
    console.log(shoes);

    return (
        <div className="md:flex h-full md:min-h-screen max-w-7xl relative md:p-8 mx-auto">
            {isLoading ? <p>Cargando...</p> : (
                <>
                    <div className="md:w-1/2 rounded-b-3xl md:rounded-3xl h-72 md:h-full p-8 overflow-hidden bg-neutral-100 relative flex items-center justify-center">
                        <img className="overflow-hidden mb-16 w-full absolute md:static" src={shoes.images[type]} alt={shoes.brand + ' ' + shoes.model} />
                    </div>
                    <div className="flex flex-col items-center px-2 md:px-8 mb-32 md:h-full md:w-1/2">
                        <h2 className="font-bold text-2xl mt-6 text-center w-full md:text-left">{shoes.brand}</h2>
                        <h1 className="font-semibold text-4xl mt-4 text-center w-full md:text-left">{shoes.model}</h1>
                        <p className="text-3xl mt-4 mb-8 w-full text-center md:text-left">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(shoes.price)}</p>
                        <h3 className="w-full font-bold">Estilo</h3>
                        <div className="flex w-full my-4 h-fit py-2 overflow-x-auto">
                            <div className="flex w-fit h-fit pl-2 overflow-y-visible">
                                {shoes.images.map((image, index) => (
                                    <img className={'w-28 h-28 md:h-36 md:w-36 mr-2 rounded-xl hover:cursor-pointer bg-neutral-100 p-2 object-cover outline outline-0 outline-neutral-800 ' + (type == index ? ' shadow-inner' : '') + ' transition-all'} key={index} src={image} alt={shoes.brand + ' ' + shoes.model} onClick={() => setType(index)} />
                                ))}
                            </div>
                        </div>
                        <h3 className="w-full font-bold my-4">Talla</h3>
                        <div className="flex overflow-x-auto w-full">
                            <div className="flex w-fit md:flex-wrap">
                                {shoes.sizes.map((size, index) => (
                                    <button className={'bg-neutral-100 font-semibold rounded-xl p-2 mr-2 my-2 w-16 h-16 hover:bg-neutral-800 hover:text-neutral-50' + (selectedSize == index ? ' bg-neutral-800 text-neutral-50' : '') + ' transition-all'} key={size} onClick={() => setSelectedSize(index)}>{size}</button>
                                ))}
                            </div>
                        </div>
                        <h3 className="w-full font-bold my-4">Descripción</h3>
                        <p className="w-full">{shoes.description}</p>
                    </div>
                    <div className="flex fixed bottom-8 left:0 md:left-1/2 w-full md:max-w-xl px-8">
                        {/* <button className="bg-white border-2 border-neutral-100 rounded-xl w-16 h-16">{'<3'}</button> */}
                        <button onClick={handleAddCart} className="bg-neutral-800 rounded-full h-16 flex-1 text-white font-semibold">Añadir al carrito</button>
                    </div>
                </>
            )}

        </div>
    )
}
