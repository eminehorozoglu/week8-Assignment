
import {db} from "@/app/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default async function ResultIdPage({ params }) {
    const CommentParams = await params;
    console.log(CommentParams.id);
    const commentdata = await db.query(` SELECT comment.id, city.city_name, comment.user_name, comment.user_comment FROM city
JOIN comment ON comment.city_id = city.id WHERE city.id = $1`, [
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
      
      const CommentParams = await params;
      const  userName = formValues.get("user_name");
      const userComment = formValues.get("user_comment");
      const cityId =CommentParams.id;

      db.query(`insert into comment (user_name, user_comment,city_id) values ($1, $2, $3)`,[userName,userComment,cityId]);
      revalidatePath("/result");
      redirect("/result/4");
  
  }

    return(
        <>
           {
  wrangleDataCity.map((data)=><div key={data.id}>
    <h2>{data.city_name}</h2>
    <p>{data.city_intro}</p>
  </div>)
}
        <form action={handleSubmit} >
            <label htmlFor="user_name">Name:</label>
            <input type="text" name="user_name" id="user_name" className="text-emerald-600" />
            <label htmlFor="user_comment">Message :</label>
            <textarea id="user_comment" name="user_comment" className="text-emerald-600" rows="4" cols="50"/>
            <label htmlFor="user_name">ID:</label>
            <input type="number" name="city_id" id="city_id" className="text-emerald-600" />
            <button type="submit" className="border-amber-600 border-4 m-4 hover:bg-sky-700">Submit your data</button>
        </form>
        <h1>Comment Page</h1>
        {
  wrangleData.map((data)=><div key={data.id}>
    <h2>{data.user_name}</h2>
    <p>{data.user_comment}</p>
  </div>)
}
        </>
    )
}