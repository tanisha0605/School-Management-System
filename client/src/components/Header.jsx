import { FaUserGraduate,FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';

export default function Header() {
    const { currentUser } = useSelector(state => state.user);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Function to check if screen size is mobile
    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    // Add event listener for window resize
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <header className='bg-white border-slate-700 h-auto'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                {/* Logo */}
                <Link to='/'>
                    <h1 className='self-center text-4xl font-bold whitespace-nowrap lora-font flex items-center'>
                        <FaUserGraduate className='mr-2' />
                        <span className='text-dblue'>Edu</span>
                        <span className='text-mblue'>Track</span>
                    </h1>
                </Link>

                {/* Navigation */}
                {!isMobile ? (
                    <ul className='flex gap-7 items-center justify-between sedan-regular text-lg'>
                        <Link to='/'>
                            <li className='hidden sm:inline text-dblue hover:underline'>Home</li>
                        </Link>
                        <li className='hidden sm:inline text-dblue hover:underline cursor-pointer' onClick={() => setDropdownOpen(!dropdownOpen)}>
                            Dashboard
                            {dropdownOpen && (
                                <ul className='bg-white border-lblue absolute top-20 left-100 w-48 rounded-md shadow-lg' style={{ zIndex: 9999 }}>
                                    <Link to='/student'>
                                        <li className='px-4 py-2 hover:bg-lblue hover:underline cursor-pointer'>Students</li>
                                    </Link>
                                    <Link to='/teacher'>
                                        <li className='px-4 py-2 hover:bg-lblue hover:underline cursor-pointer'>Teachers</li>
                                    </Link>
                                    <Link to='/class'>
                                        <li className='px-4 py-2 hover:bg-lblue hover:underline cursor-pointer'>Classes</li>
                                    </Link>
                                    <Link to='/profit-analysis'>
                                        <li className='px-4 py-2 hover:bg-lblue hover:underline cursor-pointer'>Profit Analysis</li>
                                    </Link>
                                </ul>
                            )}
                        </li>
                        <Link to='/profile'>
                            {currentUser ? (
                                <img
                                    className='rounded-full h-9 w-9 object-cover'
                                    src={currentUser.avatar}
                                    alt='profile'
                                />
                            ) : (
                                <li className=' text-slate-700 hover:underline'> Sign in</li>
                            )}
                        </Link>
                    </ul>
                ) : (
                    // Sidebar for mobile
                    <div className="flex items-center">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <FaBars className="text-xl text-gray-600" />
                        </button>
                        {dropdownOpen && (
                            <ul className='bg-white border-lblue absolute top-20 left-100 w-48 rounded-md shadow-lg' style={{ zIndex: 9999 }}>
                                <Link to='/student'>
                                    <li className='px-4 py-2 hover:bg-lblue hover:underline cursor-pointer'>Students</li>
                                </Link>
                                <Link to='/teacher'>
                                    <li className='px-4 py-2 hover:bg-lblue hover:underline cursor-pointer'>Teachers</li>
                                </Link>
                                <Link to='/class'>
                                    <li className='px-4 py-2 hover:bg-lblue hover:underline cursor-pointer'>Classes</li>
                                </Link>
                                <Link to='/profit-analysis'>
                                    <li className='px-4 py-2 hover:bg-lblue hover:underline cursor-pointer'>Profit Analysis</li>
                                </Link>
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}

