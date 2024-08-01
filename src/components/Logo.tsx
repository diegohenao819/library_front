import Image from "next/image"
import logo from "../../public/logo.png"
import Link from "next/link"


export const Logo = () => {
  return (
    
   <Link href="/">
     <Image src={logo} alt="library logo" width={50} height={50} />
   </Link>
  )
}
