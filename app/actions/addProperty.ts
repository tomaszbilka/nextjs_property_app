"use server";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";

async function addProperty(formData: FormData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  // access all values from amenities and images
  const amenities = formData.getAll("amenities");
  const imagesObject = formData.getAll("images") as { name?: string }[];
  const images = imagesObject.filter((image) => image.name !== "");

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    images: [""],
  };

  const imagesUrls = [];

  for (const imageFile of images) {
    //@ts-expect-error JS create an aray of bits
    const imageBuffer = await imageFile.arrayBuffer();
    // JS create array of bajts
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    // Node create buffer object to represent a fixed-length sequence of bytes
    const imageData = Buffer.from(imageArray);

    //converte to base64
    const imageBase64 = imageData.toString("base64");

    //make request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: "properties" }
    );

    imagesUrls.push(result.secure_url);
  }

  propertyData.images = imagesUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
