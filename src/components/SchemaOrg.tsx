import React from "react";

type SchemaObject = {
  "@context": string;
  "@type"?: string;
  "@graph"?: object[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

interface SchemaOrgProps {
  schema: SchemaObject | SchemaObject[];
}

export const SchemaOrg: React.FC<SchemaOrgProps> = ({ schema }) => {
  try {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema, null, 2),
        }}
      />
    );
  } catch (error) {
    console.error("Failed to serialize schema:", error);
    return null;
  }
};
