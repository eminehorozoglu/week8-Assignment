export default function HomePage(){

  return(

     <main className="flex min-h-screen flex-col items-center justify-evenly p-10">
      <h2 className="font-bold text-4xl text-blue-950">Welcome to My City Blog!</h2>
      <p className=" text-3xl text-blue-900">Thank you for visiting, Here you can see some city information.</p>
      <section>
        <p className=" text-3xl text-blue-900">If you are looking for: </p>
        <ul className="list-disc">
          <li className=" text-xl text-blue-800">Some explanations about cities</li>
          <li className=" text-xl text-blue-800">A forum where you can express your opinions about the city</li>
          <li className=" text-xl text-blue-800">A page where we will delete your comments if you wish</li>
          <br />
        </ul>
      </section>
    </main>
  );
  
}