import Image from "next/image";

export default function ButtonLoading() {
    return (
        <Image src="/images/loading.svg" alt="" width={24} height={24} className="animate-spin" /> 
    )
}