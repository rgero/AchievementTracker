import { useEffect, useState } from "react";

import AchievementRow from "./AchievementRow";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import { Sizes } from "../../utils/constants";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import { useAchievements } from "./hooks/useAchievements";

const AchievementTable = () => {
  const { isLoading, achievements, count } = useAchievements();
  
  const [isDesktop, setDesktop] = useState(window.innerWidth > Sizes.minScreenSize);
  const updateMedia = () => {
    setDesktop(window.innerWidth > Sizes.minScreenSize);
  };
  
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  if (isLoading) return <Spinner />;
  if (achievements.length === 0) return <Empty resourceName="bookings"/>

  let columns = '4fr 1fr 0.4fr 0.25fr';
  if (!isDesktop) {
    columns = '4fr 0.25fr';
  }

  return (
    <Menus>
      <Table columns={columns}>
        <Table.Header>
          <TableHeader id="name">Name of Achievement</TableHeader>
          {isDesktop && <>
            <TableHeader  id="date" style={{minWidth: 50, display: "flex", justifyContent: 'center'}}>Date</TableHeader>
            <TableHeader  id="weight" style={{minWidth: 50, display: "flex", justifyContent: "center"}}>Weight</TableHeader>
          </>}
        </Table.Header>
        <Table.Body 
          data={achievements} 
          render={(achievement) => <AchievementRow achievement={achievement} key={achievement.id} />} 
        />
        <Table.Footer>
          <Pagination count={count}/>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default AchievementTable
