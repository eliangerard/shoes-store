import { useState } from "react";
import { Cart } from "../icons/cart";
import { SearchIcon } from "../icons/search"
import { useNavigate } from "react-router-dom";

export const Header = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const handleCartClick = () => {
        navigate('/cart');
    }

    const handleSearch = () => {
        if (search === '') return;
        navigate('/search/' + search);
    }

    const handleHomeClick = () => {
        setSearch('');
        navigate('/');
    }

    return (
        <header className='flex justify-between sticky top-0 bg-white pt-6 pb-4 z-10'>
            <h1 onClick={handleHomeClick} className="text-4xl cursor-pointer font-semibold font-['Unbounded']">Papos</h1>
            <div className='flex'>
                <div className="rounded-full flex items-center bg-neutral-100 outline-neutral-300 focus-within:outline-2 ml-4">
                    <input
                        className="bg-neutral-100 focus:outline-0 ml-4 w-full"
                        type="search"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        placeholder="Buscar"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    <div onClick={handleSearch} className="hover:cursor-pointer">
                        <SearchIcon className={'w-6 h-6 opacity-40 mr-4'} />
                    </div>
                </div>
                <div onClick={handleCartClick} className="flex items-center">
                    <Cart className={'h-8 mx-2'} />
                </div>
            </div>
        </header>
    )
}
