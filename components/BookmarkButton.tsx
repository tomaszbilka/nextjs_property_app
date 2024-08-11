"use client";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { TProperty } from "@/models/Property";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBoomarkStatus";

type TProps = {
  property: TProperty;
};

const BookmarkButton = ({ property }: TProps) => {
  const { data: session } = useSession();
  //@ts-expect-error
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id.toString())
      .then((res) => {
        if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [property._id, userId, checkBookmarkStatus]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be signin to bookmark a listing");
      return;
    }

    bookmarkProperty(property._id.toString())
      .then((res) => {
        setIsBookmarked(res.isBookmarked);
        toast.success(res.message);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return isBookmarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" />
      Remove Bookmark
    </button>
  ) : (
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
