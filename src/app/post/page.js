import {db} from "@/app/utils/dbConnection"
import Link from "next/link";
import Style from "@/app/post/post.module.css"

export const metadata = {
  title: "City options",
  description: "You can see the information of the city you want, just select it.",
};

export default async function PostPage(){

        const users = await db.query(`select * from city order by city_name asc`)
        console.log(users)
        const wrangleData = users.rows;
        console.log(wrangleData);
    return(
        <>
        <h1 className={Style.h1}>My City Posts :</h1>
        {
  wrangleData.map((data)=><div key={data.id}>
    <Link className={Style.Link} href={`/result/${data.id}`}>{data.city_name}</Link>
  </div>)
}
        </>
    )
}