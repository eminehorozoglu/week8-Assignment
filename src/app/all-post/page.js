import {db} from "@/app/utils/dbConnection"
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Image from "next/image";
import istanbul from "@/../public/istanbul.jpg";
import london from "@/../public/london.jpg";
import madrid from "@/../public/madrid.jpg";
import newyork from "@/../public/newyork.jpg";
import paris from "@/../public/paris.jpg";
import rome from "@/../public/rome.jpg";
import Styling from "@/app/all-post/allPost.module.css"

export const metadata = {
  title: "Comments About Cities",
  description: "You can delete comments about cities if you want.",
};

const myArray = [{
    id:1,
    title:"London",
    image:   <Image className="rounded-3xl"
            src={london}
            alt={"London City View"}
            width={120}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 2,
    title:"Paris",
    image:   <Image className="rounded-3xl"
            src={paris}
            alt={"Paris City View"}
            width={120}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 3,
    title:"Istanbul",
    image:   <Image className="rounded-3xl"
            src={istanbul}
            alt={"Istanbul City View"}
            width={120}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 4,
    title:"New York",
    image:   <Image className="rounded-3xl"
            src={newyork}
            alt={"New York City View"}
            width={120}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 5,
    title:"Rome",
    image:   <Image className="rounded-3xl"
            src={rome}
            alt={"Rome City View"}
            width={120}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 6,
    title:"Madrid",
    image:   <Image className="rounded-3xl"
            src={madrid}
            alt={"Madrid City View"}
            width={120}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},];

export default async function PostPage(){

  const commentdata = await db.query(` SELECT comment.id, city.city_name, comment.user_name, comment.user_comment FROM city
    JOIN comment ON comment.city_id = city.id order by city.city_name asc,comment.id desc`);
        console.log(commentdata);
        const wrangleData = commentdata.rows;
        console.log(wrangleData);



    return(
        <>
        <h1 className={Styling.h1}>My All Posts :</h1>

 {       wrangleData.map((data)=><div key={data.id} className={Styling.Result}>
 {myArray.map((item) => (
  <div key={item.id} >
    {item.title === data.city_name && <p>{item.image}</p>}
  </div>
))}
<h2 className="text-2xl">City Name : {data.city_name} - </h2>

<p className="text-2xl"> " {data.user_name} " says : </p>
<p className="text-2xl">{data.user_comment}</p>
<button type="submit" onClick={ async function deletedata() {
"use server";
await db.query(`delete from comment where id = $1`,[data.id]);
revalidatePath("/all-post");
redirect("/all-post");

}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full">delete</button>

</div>)
} 


        </>
    )
}