import UserAvatar from "./user-avatar";

export default async function Navbar() {
  return (
    <div className="py-3 px-18 border flex items-center justify-center fixed top-0 w-full">
      <div className="flex items-center justify-between w-full">
        <UserAvatar />
      </div>
    </div>
  );
}
