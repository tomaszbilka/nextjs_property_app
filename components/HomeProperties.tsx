import PropertyCard from "./PropertyCard";
import Link from "next/link";
import connectDB from "@/config/database";
import Property, { TProperties } from "@/models/Property";

const HomeProperties = async () => {
  await connectDB();
  const recentPropertiex = (await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean()) as TProperties;

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          {recentPropertiex.length === 0 ? (
            <p>No proerties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPropertiex.map((property) => (
                <PropertyCard
                  property={property}
                  key={property._id.toString()}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="m-auto max-w-lg my-6 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded hover:bg-gray-700"
        >
          View all properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
