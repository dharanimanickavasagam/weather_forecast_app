import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ data, columns, ...rest }) => {
  return (
    <table {...rest} className="table table-hover text-center">
      <TableHeader columns={columns} />
      <TableBody data={data} />
    </table>
  );
};

export default Table;
