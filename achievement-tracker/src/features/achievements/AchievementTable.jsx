import { useEffect, useState } from "react";

import AchievementRow from "./AchievementRow";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useAchievements } from "./hooks/useAchievements";

const AchievementTable = () => {
  const { isLoading, achievements } = useAchievements();
  
  const [isDesktop, setDesktop] = useState(window.innerWidth > 500);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 500);
  };
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  if (isLoading) return <Spinner />;
  if (!achievements) return <div>Error</div>

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
            <div>Date</div>
            <div>Weight</div>
          </>}
        </Table.Header>
        <Table.Body 
          data={achievements} 
          render={(achievement) => <AchievementRow achievement={achievement} key={achievement.id} />} 
        />
      </Table>
    </Menus>
  );
}

export default AchievementTable
