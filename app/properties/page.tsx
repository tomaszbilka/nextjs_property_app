import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property, { TProperties } from "@/models/Property";

const PropertiesPage = async () => {
  await connectDB();
  // lean() returns JS object, not mongoos object
  const properties = (await Property.find({}).lean()) as TProperties;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No proerties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard property={property} key={property._id.toString()} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
