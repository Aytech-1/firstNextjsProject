import Image from "next/image"
import Link from "next/link"

const Header = () => {
    return (
        <header className="w-full h-17.5 flex justify-center items-center bg-(--white-color) fixed top-0">
            <div className="w-[95%] h-full max-w-3000 flex justify-between items-center">

                <div className="w-100 flex  justify-between items-center">

                    <div className="w-37.5 overflow-hidden">
                        <Image
                            src="/all-images/image-pix/logo.png"
                            alt="logo"
                            width={150}
                            height={150}
                            loading="eager"
                            priority
                        />
                    </div>

                    <nav className="flex justify-center items-end gap-7.5  cursor-pointer">
                        <span className="text-(--secondary-color)">Dashboard</span>
                        <span className="text-(--text-color) hover:text-(--secondary-color) duration-500 ease-in-out">
                            <Link href="/central/admin/dashboard/myprofile">My Profile</Link>
                        </span>
                    </nav>

                </div>

                <div className="flex items-center gap-2.5 text-[20px] cursor-pointer border-l-2 border-dotted border-gray-300 pl-2.5">

                    <div className="flex flex-col">
                        <span className="text-[13px] text-gray-800">
                            Adeyemi Ayobami
                        </span>

                        <span className="text-[10px] text-(--secondary-color)">
                            SUPER ADMIN
                        </span>
                    </div>

                    <Link href="/central/admin/dashboard/myprofile">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                            <Image
                                src="/all-images/image-pix/avatar.jpg"
                                alt="Profile Image"
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        </div>
                    </Link>

                </div>

            </div>

        </header>
    )
}

export default Header