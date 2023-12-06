import { Cart } from "../icons/cart";
import { Search } from "../icons/search"
import { useNavigate } from "react-router-dom";

export const Header = () => {

    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/cart');
    }
    
    const handleHomeClick = () => {
        navigate('/');
    }

    return (
        <header className='flex justify-between sticky top-0 bg-white pt-6 pb-4 z-10'>
            <h1 onClick={handleHomeClick} className="text-4xl cursor-pointer font-semibold font-['Unbounded']">Papos</h1>
            <div className='flex'>
                <Search className={'w-8 h-8 mx-2'} />
                <div onClick={handleCartClick}>
                    <Cart className={'w-8 h-8 mx-2'} />
                </div>
            </div>
        </header>
    )
}
