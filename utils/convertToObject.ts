//sent JS object from server component to client component, instead of json
export const convertToSerializableObject = (leanDocument: any) => {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key].toJSON && leanDocument[key].toString) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }

  return leanDocument;
};
