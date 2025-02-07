import {db} from "@/app/utils/dbConnection"
import Link from "next/link";

export default async function PostPage(){

        const users = await db.query(`select * from city order by city_name asc`)
        console.log(users)
        const wrangleData = users.rows;
        console.log(wrangleData);
    return(
        <>
        <h1>Read Post Page</h1>
        {
  wrangleData.map((data)=><div key={data.id}>
    <Link href={`/result/${data.id}`}>{data.city_name}</Link>
  </div>)
}
        </>
    )
}