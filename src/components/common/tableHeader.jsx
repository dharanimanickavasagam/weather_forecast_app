import React from "react";

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index} scope="col">
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
