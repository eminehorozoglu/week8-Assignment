import Header from "@/component/Header"
import Link from "next/link"
import Image from "next/image";


export default function HomePage(){

  return(

     <main className="flex min-h-fit flex-col items-center justify-evenly">
      <h2 className="font-bold">Welcome to My City Blog!</h2>
      <p>Thank you for visiting, Here you can see some city information.</p>
      <section>
        <p>If you are looking for: </p>
        <ul className="list-disc">
          <li>Some explanations about cities</li>
          <li>A forum where you can express your opinions about the city</li>
          <li>A page where we will delete your comments if you wish</li>
          <br />
          <p className="text-center">This is your blog!</p>
        </ul>
      </section>
    </main>
  );
  
}