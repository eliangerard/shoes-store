import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";

export const Shoes = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const [type, setType] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);

    const { data: shoes, hasError, isLoading } = useFetch('http://localhost:3000/shoes/' + id);

    const handleBack = () => {
        navigate('/');
    }
    console.log(shoes);

    return (
        <div>
            {isLoading ? <p>Cargando...</p> : (
                <>
                    <button onClick={handleBack} className="absolute top-4 left-2 w-16 h-16 z-10 text-3xl font-bold">{'<'}</button>
                    <div className="rounded-b-3xl h-60 p-8 overflow-hidden bg-neutral-100 relative flex items-center justify-center">
                        <img className="w-full object-cover overflow-hidden mb-16 xl w-full absolute" src={'http://localhost:3000/' + shoes.images[type]} alt={shoes.brand + ' ' + shoes.model} />
                    </div>
                    <div className="flex flex-col items-center px-8 mb-32">
                        <h2 className="font-bold text-2xl mt-6 text-center">{shoes.brand}</h2>
                        <h1 className="font-semibold text-4xl mt-4 text-center">{shoes.model}</h1>
                        <p className="text-3xl mt-4 mb-8">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(shoes.price)}</p>
                        <h3 className="w-full font-bold">Estilo</h3>
                        <div className="flex w-full my-4">
                            {shoes.images.map((image, index) => (
                                <img className={'w-20 h-20 mr-2 rounded-xl bg-neutral-100 p-2 object-cover outline outline-0 outline-neutral-800' + (type == index ? ' outline-2' : '') + ' transition-all'} key={index} src={'http://localhost:3000/' + image} alt={shoes.brand + ' ' + shoes.model} onClick={() => setType(index)} />
                            ))}
                        </div>
                        <h3 className="w-full font-bold my-4">Talla</h3>
                        <div className="flex overflow-x-auto w-full">
                            <div className="flex w-fit">
                                {shoes.sizes.map((size, index) => (
                                    <button className={'bg-neutral-100 font-semibold rounded-xl p-2 mr-2 my-2 w-16 h-16 hover:bg-neutral-800 hover:text-neutral-50' + (selectedSize == index ? ' bg-neutral-800 text-neutral-50' : '') + ' transition-all'} key={size} onClick={() => setSelectedSize(index)}>{size}</button>
                                ))}
                            </div>
                        </div>
                        <h3 className="w-full font-bold my-4">Descripción</h3>
                        <p>{shoes.description}</p>
                    </div>
                    <div className="flex fixed bottom-8 left-0 w-full px-8">
                        <button className="bg-white border-2 border-neutral-100 rounded-xl w-16 h-16">{'<3'}</button>
                        <button className="bg-neutral-800 rounded-full h-16 flex-1 ml-4 text-white font-semibold">Añadir al carrito</button>
                    </div>
                </>
            )}

        </div>
    )
}
