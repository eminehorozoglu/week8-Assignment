import {db} from "@/app/utils/dbConnection"
import Link from "next/link";
import Image from "next/image";
import istanbul from "@/../public/istanbul.jpg";
import london from "@/../public/london.jpg";
import madrid from "@/../public/madrid.jpg";
import newyork from "@/../public/newyork.jpg";
import paris from "@/../public/paris.jpg";
import roma from "@/../public/roma.jpg";

export const myArray = [{
    id:1,
    image:   <Image
            src={london}
            alt={"Flamingoes flying over a mountain"}
            width={500}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 2,
    image:   <Image
            src={paris}
            alt={"Flamingoes flying over a mountain"}
            width={500}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 3,
    image:   <Image
            src={istanbul}
            alt={"Flamingoes flying over a mountain"}
            width={500}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 4,
    image:   <Image
            src={newyork}
            alt={"Flamingoes flying over a mountain"}
            width={500}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 5,
    image:   <Image
            src={roma}
            alt={"Flamingoes flying over a mountain"}
            width={500}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 6,
    image:   <Image
            src={madrid}
            alt={"Flamingoes flying over a mountain"}
            width={500}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},];

export default async function PostPage(){

        const users = await db.query(`select * from city`)
        console.log(users)
        const wrangleData = users.rows;
        console.log(wrangleData);



    return(
        <>
        <h1>Read Post Page</h1>
  {
  wrangleData.map((data)=><div key={data.id}>
    <Link href={`/result/${data.id}`}>{data.city_name}</Link>
    <p>{data.city_intro}</p> 
  </div>)
}
{myArray.map((item) => (
  <div key={item.id}>
    <p>{item.id}</p>
    {item.id === 1 && <p>{item.image}</p>}
  </div>
))}

        </>
    )
}