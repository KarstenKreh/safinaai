import React from "react";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema, null, 2)}
        </script>
      </Helmet>
    );
  } catch (error) {
    console.error("Failed to serialize schema:", error);
    return null;
  }
};
