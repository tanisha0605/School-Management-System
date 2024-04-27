import {FaUserGraduate} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useState } from 'react'
export default function Header() {
    const {currentUser}=useSelector(state=>state.user)
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className='bg-white border-slate-700 h-auto'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='self-center text-4xl font-bold whitespace-nowrap lora-font flex items-center'>
                <FaUserGraduate className='mr-2'/>
                <span className='text-dblue'>Edu</span>
                <span className='text-mblue'>Track</span>   
                </h1>
            </Link>
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
            </div>
        </header>
    )
}
