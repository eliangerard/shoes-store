import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch'
import { useEffect, useState } from 'react';
import { Cart } from '../icons/cart';

export const Home = () => {

    const navigate = useNavigate();

    const { data: shoes = [], hasError, isLoading } = useFetch('https://shoes-back-7bid.onrender.com/shoes');
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        if (isLoading) return;
        const unfilteredBrands = [...new Set(shoes.map(shoe => shoe.brand))];
        setBrands(unfilteredBrands);

    }, [shoes])

    const handleClick = (id) => {
        navigate('/shoes/' + id);
    }

    return (
        <>
            <div className='p-2'>
                <header></header>
                <div className='flex justify-between items-center mt-12 mb-8 px-8'>
                    <h1 className='text-4xl font-semibold'>Papos</h1>
                    <Cart className={'w-8 h-8'}/>
                </div>
                {!isLoading && (
                    <div className='flex w-full my-4 overflow-x-auto'>
                        {
                            brands.map((brand) => (
                                <div className='w-24 mr-2 h-14 bg-neutral-100 rounded-xl flex items-center justify-center overflow-hidden'
                                    key={brand}
                                    onClick={() => navigate('/shoes/brand/' + brand)}
                                >
                                    <h1 className='font-bold text-center'>{brand}</h1>
                                </div>
                            ))
                        }
                    </div>)}
                {!isLoading && shoes.map((shoe) => (
                    <div className='bg-neutral-100 rounded-3xl flex flex-col items-center justify-center overflow-hidden w-full h-56 object-center relative mb-2'
                        key={shoe._id}
                        onClick={() => handleClick(shoe._id)}
                    >
                        <img className='w-8/12 absolute bottom-2' src={'https://shoes-back-7bid.onrender.com/' + shoe.images[0]} alt={shoe.brand + ' ' + shoe.model} />
                        <div className='absolute bottom-8'>
                            <h1 className='font-black text-center'>{shoe.brand + ' ' + shoe.model}</h1>
                            <p className='font-semibold text-center'>{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(shoe.price)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
