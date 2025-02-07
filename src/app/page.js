import Header from "@/component/Header"
import Link from "next/link"
import Image from "next/image";

import london from "@/../public/london.jpg";

export default function HomePage(){

  return(
    <>
    <h1>Home Page</h1>
    <Image
        src={london}
        alt={"Flamingoes flying over a mountain"}
        width={500}
        height="fill"
        priority="false"
        placeholder="blur"
      />
    
    </>
  )
}