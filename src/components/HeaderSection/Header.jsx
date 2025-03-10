"use client"
import Link from 'next/link'
import Arrow from '../Arrow'
import NavbarButtons from './NavbarButtons'

const Header = () => {

    return (
        <div>
            <p className='text-center text-xs lg:text-sm '>
                Subscribe to our Newsletter For New & Latest Blogs and Resources
                <Link href={"/blog"}>
                    <Arrow />
                </Link>
            </p>
                <NavbarButtons />
        </div>
    )
}

export default Header