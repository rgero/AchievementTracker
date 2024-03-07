/* eslint-disable react/prop-types */

import { DefaultSort } from "../utils/constants";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const TableHeader = ({children, style, id}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByRaw = searchParams.get('sortBy') || DefaultSort;
  const [field, direction] = sortByRaw.split('-');
  const isSorting = field == id;

  const processSort = (e) => {
    let tempDirection = 'des';
    if (direction == 'des')
    {
      tempDirection = "asc";
    }
    const target = id + "-" + tempDirection;
    searchParams.set('sortBy', target);
    setSearchParams(searchParams);
  }
     
  return (
    <div style={{...style, display: 'flex', alignItems: 'center'}} onClick={processSort}>
      {children}
      {isSorting && (
        <IoMdArrowDropdown style={
          {
            transform: direction == "asc" && 'rotate(180deg)',
            fontSize: 20
          }
        }/>
      )}
    </div>
  )
}

export default TableHeader
