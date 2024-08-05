"use client";
import { useState } from "react";
import { TProperties } from "@/models/Property";
import Image from "next/image";
import Link from "next/link";
import deleteProperty from "@/app/actions/deleteProperty";

type TProps = {
  initialProperties: TProperties;
};

const ProfileProperties = ({ initialProperties }: TProps) => {
  const [properties, setProperties] = useState<TProperties>(initialProperties);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this proerty?"
    );

    if (!confirmed) {
      return;
    }

    await deleteProperty(propertyId);

    const updatesProperties = properties.filter(
      (property) => property._id.toString() !== propertyId
    );

    setProperties(updatesProperties);
  };

  if (properties.length === 0) {
    return <div className="text-gray-400">No properties yet...</div>;
  }

  return properties.map((property) => (
    <div className="mb-10" key={property._id.toString()}>
      <Link href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          alt="Property 1"
          width={1000}
          height={200}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          {property.location.city} {property.location.street}{" "}
          {property.location.state}
        </p>
      </div>
      <div className="mt-2">
        <a
          href="/add-property.html"
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </a>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDeleteProperty(property._id.toString())}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
