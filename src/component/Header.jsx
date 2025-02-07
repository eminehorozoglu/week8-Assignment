import Link from "next/link";

export default function Header() {
  return (
    <>
      <h1>City Blog</h1>
      <nav>
        <Link href={"/"}>Home   </Link>
        <Link href={"/post"}>Posts   </Link>
        <Link href={"/new-post"}>New Post </Link>

       

      </nav>
    </>
  );
}