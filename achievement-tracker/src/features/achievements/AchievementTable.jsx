import AchievementRow from "./AchievementRow";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useAchievements } from "./hooks/useAchievements";

//import { useSearchParams } from "react-router-dom";

const AchievementTable = () => {
  const { isLoading, achievements } = useAchievements();
  //const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if(!achievements) return <div>Error</div>

  return (
    <Menus>
      <Table columns='4fr 1fr 0.25fr 0.25fr'>
        <Table.Header>
          <div>Name of Achievement</div>
          <div>Date</div>
          <div>Weight</div>
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
