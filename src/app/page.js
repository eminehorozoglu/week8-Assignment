import Header from "@/component/Header"
import Link from "next/link"
import Image from "next/image";

import istanbul from "@/../public/istanbul.jpg";
import london from "@/../public/london.jpg";
import madrid from "@/../public/madrid.jpg";
import newyork from "@/../public/newyork.jpg";
import paris from "@/../public/paris.jpg";
import roma from "@/../public/roma.jpg";

export default function HomePage(){

  return(
    <>
    <h1>Home Page</h1>
    <Image
        src={london}
        alt={"London View"}
        width={500}
        height="fill"
        priority="false"
        placeholder="blur"
      />
        <Image
        src={paris}
        alt={"Paris View"}
        width={500}
        height="fill"
        priority="false"
        placeholder="blur"
      />
            <Image
        src={istanbul}
        alt={"Istanbul View"}
        width={500}
        height="fill"
        priority="false"
        placeholder="blur"
      />
              <Image
        src={newyork}
        alt={"New York View"}
        width={500}
        height="fill"
        priority="false"
        placeholder="blur"
      />
              <Image
        src={roma}
        alt={"Roma View"}
        width={500}
        height="fill"
        priority="false"
        placeholder="blur"
      />
              <Image
        src={madrid}
        alt={"Madrid View"}
        width={500}
        height="fill"
        priority="false"
        placeholder="blur"
      />
    </>
  )
}