'use client';
import React, { useState } from 'react';
import { Button } from '../button';

type ObjectTreeViewProps = {
  data: any;
  level?: number;
};

const ObjectTreeNode: React.FC<ObjectTreeViewProps> = ({ data, level = 0 }) => {
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});
  const isObject = data !== null && typeof data === 'object';

  const handleToggle = (key: string) => {
    setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isObject) {
    return <div>{JSON.stringify(data)}</div>;
  }

  return (
    <>
      <pre className="text-sm whitespace-pre-wrap">
        <div style={{ marginLeft: `${level * 20}px` }}>
          {Object.entries(data).map(([key, value]) => {
            const isValueObject = value !== null && typeof value === 'object';
            return (
              <div key={key}>
                <Button
                  id={`tree-toggle-${level}-id`}
                  onClick={() => isValueObject && handleToggle(key)}
                  style={{ cursor: isValueObject ? 'pointer' : 'default' }}
                >
                  {isValueObject && (expandedKeys[key] ? '▼ ' : '► ')}
                </Button>

                <strong>{key}:</strong>
                {isValueObject ? (
                  expandedKeys[key] ? (
                    <ObjectTreeNode data={value} level={level + 1} />
                  ) : (
                    ' {...}'
                  )
                ) : (
                  ` ${JSON.stringify(value)}`
                )}
              </div>
            );
          })}
        </div>
      </pre>
    </>
  );
};

export const ObjectTreeView: React.FC<ObjectTreeViewProps> = ({ data }) => {
  return <ObjectTreeNode data={data} />;
};

export default ObjectTreeView;

// Path: src/components/markdown/object-tree-view.tsx
