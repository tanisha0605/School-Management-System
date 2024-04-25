import {FaUserGraduate} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function Header() {
    const {currentUser}=useSelector(state=>state.user)
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
            <Link to='/about'>
                <li className='hidden sm:inline text-dblue hover:underline'>About</li>
            </Link>
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
