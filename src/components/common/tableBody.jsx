import React from "react";
import _ from "lodash";

const TableBody = ({ data }) => {
  const handleDataObject = datum => {
    let keyValue = [];
    _.find(datum, datum => {
      keyValue.push(datum);
    });
    return keyValue;
  };

  return (
    <tbody>
      {data.map((datum, index) => (
        <tr key={index}>
          {handleDataObject(datum).map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
