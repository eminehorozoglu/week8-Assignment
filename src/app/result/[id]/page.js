
import {db} from "@/app/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Image from "next/image";
import istanbul from "@/../public/istanbul.jpg";
import london from "@/../public/london.jpg";
import madrid from "@/../public/madrid.jpg";
import newyork from "@/../public/newyork.jpg";
import paris from "@/../public/paris.jpg";
import roma from "@/../public/roma.jpg";
import Style from "@/app/result/result.module.css"
const myArray = [{
    id:1,
    image:   <Image
            src={london}
            alt={"Flamingoes flying over a mountain"}
            width={750}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 2,
    image:   <Image
            src={paris}
            alt={"Flamingoes flying over a mountain"}
            width={750}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 3,
    image:   <Image
            src={istanbul}
            alt={"Flamingoes flying over a mountain"}
            width={750}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 4,
    image:   <Image
            src={newyork}
            alt={"Flamingoes flying over a mountain"}
            width={750}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 5,
    image:   <Image
            src={roma}
            alt={"Flamingoes flying over a mountain"}
            width={750}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
},{
    id: 6,
    image:   <Image
            src={madrid}
            alt={"Flamingoes flying over a mountain"}
            width={750}
            height="fill"
            priority="false"
            placeholder="blur"
          />,
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
      redirect("/post");
  
  }
  

    return(
        <>

           {
  wrangleDataCity.map((data)=><div key={data.id}className={Style.FormClass} >
    <h2 className="text-5xl ">{data.city_name}</h2>
    {myArray.map((item) => (
  <div key={item.id}>
    {item.id === data.id && <p>{item.image}</p>}
  </div>
))}
    <p>{data.city_intro}</p>
  </div>)
}
        <form action={handleSubmit} className={Style.FormClass}  >
            <label htmlFor="user_name">Name:</label>
            <input type="text" name="user_name" id="user_name" className="text-blue-700" />
            <label htmlFor="user_comment">Message :</label>
            <textarea id="user_comment" name="user_comment" className="text-blue-700" rows="4" cols="40"/>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit data</button>
        </form>
     
     
        {
  wrangleData.map((data)=><div htmlFor="id"  key={data.id} className={Style.Comment}>

    <h2 >{data.user_name}</h2>
    <p>{data.user_comment}</p>
    <p>{data.id}</p>
    <button type="submit" onClick={ async function deletedata() {
    "use server";
await db.query(`delete from comment where id = $1`,[data.id]);
revalidatePath("/result");
redirect("/result/1");

}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">delete</button>
  </div>)
}

        </>
    )
}