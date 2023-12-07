import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch'
import { useEffect, useState } from 'react';

export const Home = () => {

    const navigate = useNavigate();

    const { data: shoes = [], hasError, isLoading } = useFetch('https://shoes-gamemz.koyeb.app/products');
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        if (isLoading) return;
        const unfilteredBrands = [...new Set(shoes.map(shoe => shoe.brand))];
        setBrands(unfilteredBrands);
    }, [shoes, isLoading])

    const handleClick = (id) => {
        navigate('/shoes/' + id);
    }

    if(hasError)
        console.log(hasError);
    return (
        <>


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
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

                {!isLoading && shoes.map((shoe) => (
                    <div className='bg-neutral-100 shadow-none hover:shadow-inner  hover:cursor-pointer select-none rounded-3xl flex flex-col items-center justify-center overflow-hidden w-full h-56 object-center relative trransition-all'
                        key={shoe._id}
                        onClick={() => handleClick(shoe._id)}
                    >
                        <img className='w-7/12 absolute bottom-1/2 translate-y-1/3' src={shoe.images[0]} alt={shoe.brand + ' ' + shoe.model} />
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
