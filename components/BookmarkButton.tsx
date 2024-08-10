"use client";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { TProperty } from "@/models/Property";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { useSession } from "next-auth/react";

type TProps = {
  property: TProperty;
};

const BookmarkButton = ({ property }: TProps) => {
  const { data: session } = useSession();
  //@ts-expect-error
  const userId = session?.user?.id;

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be signin to bookmark a listing");
      return;
    }

    bookmarkProperty(property._id.toString()).then((res) => {
      if (res.error) return toast.error(res.error);
      toast.success(res.message);
    });
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" />
      Bookmark Property
    </button>
  );
};

export default BookmarkButton;
