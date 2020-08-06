import React, { ReactNode } from "react";
import ColumnItem from "./ColumnItem";

import { columnListStyle } from "./ColumnList.styles";

interface IColumnList {
  children?: ReactNode;
  data: Array<any>;
}

const ColumnList: React.FC<IColumnList> = ({ data }) => {
  return (
    <div css={columnListStyle}>
      <p>Lots of text here to get some more details down.</p>
      {data && data.length > 0 && data.map(item => <ColumnItem item={item} />)}
    </div>
  );
};

export default ColumnList;
