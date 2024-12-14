import { FC } from 'react';

interface SchemaOrgProps {
  schema: Record<string, any>;
}

export const SchemaOrg: FC<SchemaOrgProps> = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}; 