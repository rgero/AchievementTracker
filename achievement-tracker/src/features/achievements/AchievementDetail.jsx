import Button from "../../styles/Button";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Row from "../../styles/Row";
import Spinner from "../../ui/Spinner";
import { format } from "date-fns";
import { parseDate } from "../../helpers/parseDate";
import styled from "styled-components";
import { useAchievement } from "./hooks/useAchievement";
import { useMoveBack } from "../../hooks/useMoveBack";

const StyledAchievement = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
`;

const DetailRow = styled(Row)`
  padding-bottom: 50px;
`


const AchievementDetail = () => {
  const {achievement, isLoading} = useAchievement();
  const moveBack = useMoveBack();
  
  if (isLoading) return <Spinner/>;
  if (!achievement) return <Empty resource="achievement"/>

  const {weight, name, description, date} = achievement;
  const correctedDate = parseDate(date);

  return (
    <>  
      <StyledAchievement>
        <Header>
          <div>       
            <Heading as="h1">{name}</Heading>
          </div>
          <div>
            {weight.replace("-", " ")}
          </div>
        </Header>
        <Section>
          <DetailRow>
            <Heading as="h3">Details</Heading>
            {description}
          </DetailRow>
          <DetailRow>
            <Heading as="h3">Date Completed</Heading>
            {format(correctedDate, 'yyyy-MM-dd')}  
          </DetailRow>
        </Section>
      </StyledAchievement>
      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
              Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default AchievementDetail
