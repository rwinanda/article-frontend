import Image from "next/image"

const HeaderPicture = () => {
    return (
        <div className="absolute inset-0 z-0" >
            <Image src="/images/header-bg.jpg" alt="header-bg" fill className="opacity-85 object-cover" priority />
        </div>
    )
}

export default HeaderPicture;