import Link from "next/link";
import styling from "@/component/header.module.css";

export default function Header() {
  return (
    <>
      <h1>City Blog</h1>
      <nav className={styling.menu}>
        <Link href={"/"}>Home   </Link>
        <Link href={"/post"}>Posts   </Link>
        <Link href={"/all-post"}>All Post </Link>

       

      </nav>
    </>
  );
}