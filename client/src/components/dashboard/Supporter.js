import React from 'react';
import { Link } from 'react-router-dom';

export default ({ id, name, amount }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{amount}</td>
      <td>
        <Link to={`/supporter/${id}`}>View Supporter</Link>
      </td>
    </tr>
  );
};
