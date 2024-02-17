import { useEffect, useState } from "react";

import AchievementRow from "./AchievementRow";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import { Sizes } from "../../utils/constants";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useAchievements } from "./hooks/useAchievements";
import { useSearchParams } from "react-router-dom";

const AchievementTable = () => {
  const { isLoading, achievements, count } = useAchievements();
  const [searchParams] = useSearchParams();
  
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

    // Sort the achievements
    const sortBy = searchParams.get('sortBy') || 'name-asc';
    const [field, direction] = sortBy.split('-');
    const modifier = direction === 'asc' ? 1 : -1;
    const sortedAchievements = field === "name"
      ? achievements?.sort((a, b) => a.name.localeCompare(b.name) * modifier)
      : achievements?.sort((a, b) => (a[field] - b[field]) * modifier);

  let columns = '4fr 1fr 0.25fr 0.25fr';
  if (!isDesktop) {
    columns = '4fr 0.25fr';
  }

  return (
    <Menus>
      <Table columns={columns}>
        <Table.Header>
          <div>Name of Achievement</div>
          {isDesktop && <>
            <div style={{minWidth: 50, display: "flex", justifyContent: 'center'}}>Date</div>
            <div style={{minWidth: 50, display: "flex", justifyContent: "flex-end"}}>Weight</div>
          </>}
        </Table.Header>
        <Table.Body 
          data={sortedAchievements} 
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
