"use server";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";

async function deleteProperty(propertyId: string) {
  const sessionUser = await getSessionUser();
  await connectDB();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Propert not found!");

  if (userId !== property.owner.toString()) {
    throw new Error("You are not the owner!");
  }

  //Extract public ID from image URLs, last part of url with an extension .jpg
  const publicIds = property.images.map((imageUrl: string) => {
    const parts = imageUrl.split("/");
    return parts?.at(-1)?.split(".")?.at(0);
  });

  //delete images from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("properties/" + publicId);
    }
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
