import Link from "next/link";
import { Button } from "../ui/button";
import UserAvatar from "./user-avatar";
import { FaGithub } from "react-icons/fa";

export default async function Navbar() {
  return (
    <div className="py-3 flex items-center justify-center sticky top-0 font-outfit border-b">
      <div className="flex items-center justify-between w-full max-w-6xl">
        <UserAvatar />

        <Button variant="link" size="sm" asChild>
          <Link href="https://github.com/fersonull/noteddd." target="_blank">
            <FaGithub />
            <p>Contribute</p>
          </Link>
        </Button>
      </div>
    </div>
  );
}
