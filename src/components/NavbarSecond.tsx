import Image from "next/image"
import Link from "next/link";

const NavbarSecond = () => {
    return (
        <div>
            <nav className="z-10 flex fixed w-full max-h-24 justify-between bg-white/90 border-b-1 border-slate-200">
                <div className="my-9 ml-15">
                    <Link href="/">
                        <Image src="/images/logoipsum.png" alt="header-bg" width='134' height='24' className="opacity-85" />
                    </Link>
                </div>
                <div className="flex items-center my-9 mr-15">
                    <div className="w-8 h-8 mr-1.5 bg-blue-200 rounded-full">

                    </div>
                    <p className="font-medium text-[16px] underline">
                        James Dean
                    </p>
                </div>
            </nav>
        </div>
    )
}

export default NavbarSecond;