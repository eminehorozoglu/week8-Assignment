import {db} from "@/app/utils/dbConnection"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export default function NewPost(){

    async function handleSubmit(formValues) {
        "use server";

        const  userName = formValues.get("user_name");
        const userComment = formValues.get("user_comment");
        const cityId = formValues.get("city_id");
         
     
        db.query(`insert into comment (user_name, user_comment,city_id) values ($1, $2, $3)`,[userName,userComment,cityId]);
        revalidatePath("/new-post");
        redirect("/result");
    
    }

    return(
        <>
        <h1>You can create new users</h1>

        <form action={handleSubmit} >
            <label htmlFor="user_name">Name:</label>
            <input type="text" name="user_name" id="user_name" className="text-emerald-600" />
            <label htmlFor="user_comment">Message :</label>
            <textarea id="user_comment" name="user_comment" className="text-emerald-600" rows="4" cols="50"/>
            <label htmlFor="city_id">City Id:</label>
            <input type="number" name="city_id" id="city_id" className="text-emerald-600" />
            <button type="submit" className="border-amber-600 border-4 m-4 hover:bg-sky-700">Submit your data</button>
        </form>
        </>
    )
    }