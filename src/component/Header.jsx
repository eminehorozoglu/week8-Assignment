import Link from "next/link";
import styling from "@/component/header.module.css";

export default function Header() {
  return (
    <>

      <nav className={styling.menu}>
        <Link href={"/"}>Home   </Link>
        <Link href={"/post"}>Posts   </Link>
        <Link href={"/all-post"}>All Posts </Link>

       

      </nav>
    </>
  );
}