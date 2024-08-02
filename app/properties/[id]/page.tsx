type TProps = {
  params: {
    id: string;
  };
};

const PropertyPage = ({ params }: TProps) => {
  return <div>property page {params.id}</div>;
};

export default PropertyPage;
