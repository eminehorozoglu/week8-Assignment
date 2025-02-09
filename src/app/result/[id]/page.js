
import {db} from "@/app/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import istanbul from "@/../public/istanbul.jpg";
import london from "@/../public/london.jpg";
import madrid from "@/../public/madrid.jpg";
import newyork from "@/../public/newyork.jpg";
import paris from "@/../public/paris.jpg";
import rome from "@/../public/rome.jpg";
import Style from "@/app/result/result.module.css"

export const metadata = {
  title: "City Result Page",
  description: "Information about the city you have chosen",
};

const myArray = [{
    id:1,
    image:   <Image className="rounded-3xl"
            src={london}
            alt={"London City View"}
            width={750}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
          link:   <Link
  href="https://en.wikipedia.org/wiki/London"
  className="text-blue-800 font-bold text-2xl"
>
  You can find more imformation about city!
</Link>
},{
    id: 2,
    image:   <Image className="rounded-3xl"
            src={paris}
            alt={"Paris City View"}
            width={750}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
          link:   <Link
  href="https://en.wikipedia.org/wiki/Paris"
  className="text-blue-800 font-bold text-2xl"
>
  You can find more imformation about city!
</Link>
},{
    id: 3,
    image:   <Image className="rounded-3xl"
            src={istanbul}
            alt={"Istanbul City View"}
            width={750}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
  link:   <Link
  href="https://en.wikipedia.org/wiki/Istanbul"
  className="text-blue-800 font-bold text-2xl"
>
  You can find more imformation about city!
</Link>
},{
    id: 4,
    image:   <Image className="rounded-3xl"
            src={newyork}
            alt={"New York City View"}
            width={750}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
          link:   <Link
  href="https://en.wikipedia.org/wiki/New_York_City"
  className="text-blue-800 font-bold text-2xl"
>
  You can find more imformation about city!
</Link>
},{
    id: 5,
    image:   <Image className="rounded-3xl"
            src={rome}
            alt={"Rome City View"}
            width={750}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
          link:   <Link
  href="https://en.wikipedia.org/wiki/Rome"
  className="text-blue-800 font-bold text-2xl"
>
  You can find more imformation about city!
</Link>
      
},{
    id: 6,
    image:   <Image className="rounded-3xl"
            src={madrid}
            alt={"Madrid City View"}
            width={750}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
          link:   <Link
  href="https://en.wikipedia.org/wiki/Madrid"
  className="text-blue-800 font-bold text-2xl"
>
  You can find more imformation about city!
</Link>
},];


export default async function ResultIdPage({ params }) {

    const CommentParams = await params;
    console.log(CommentParams.id);
    const commentdata = await db.query(` SELECT comment.id, city.city_name, comment.user_name, comment.user_comment FROM city
JOIN comment ON comment.city_id = city.id WHERE city.id = $1 order by comment.id desc`, [
    CommentParams.id,
    ]);
    console.log(commentdata);
    const wrangleData = commentdata.rows;
    console.log(wrangleData);

    const city = await db.query(`select * from city where id = $1`,[ CommentParams.id,]);
    console.log(city)
    const wrangleDataCity = city.rows;
    console.log(wrangleDataCity);

   

    async function handleSubmit(formValues) {
            "use server";
      const  userName = formValues.get("user_name");
      const userComment = formValues.get("user_comment");
      const cityId =CommentParams.id;

      db.query(`insert into comment (user_name, user_comment,city_id) values ($1, $2, $3)`,[userName,userComment,cityId]);
      revalidatePath("/result");
      redirect("/all-post");
  
  }
  

    return(
        <>

           {
  wrangleDataCity.map((data)=><div key={data.id}className={Style.FormClass} >
    <h2 className="text-5xl ">{data.city_name}</h2>
    {myArray.map((item) => (
  <div key={item.id} >
    {item.id === data.id && <p>{item.image}</p>}
  </div>
))}
    <p className="text-xl">{data.city_intro}</p>
    {myArray.map((item) => (
  <div key={item.id} >
    {item.id === data.id && <p>{item.link}</p>}
  </div>
))}
  </div>)
}
        <form action={handleSubmit} className={Style.FormClass}  >
            <label htmlFor="user_name">Name:</label>
            <input type="text" name="user_name" id="user_name" className="text-blue-800 rounded-full bg-blue-300" />
            <label htmlFor="user_comment" >Message :</label>
            <textarea id="user_comment" name="user_comment" className="text-blue-800 rounded-2xl bg-blue-300" rows="4" cols="40"/>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit data</button>
        </form>
     
     
        {
  wrangleData.map((data)=><div htmlFor="id"  key={data.id} className={Style.Comment}>

    <h2 className="text-2xl">{data.user_name} says :</h2>
    <p>{data.user_comment}</p>
    <button type="submit" onClick={ async function deletedata() {
    "use server";
await db.query(`delete from comment where id = $1`,[data.id]);
revalidatePath("/result");
redirect("/all-post");

}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full">delete</button>
  </div>)
}

        </>
    )
}