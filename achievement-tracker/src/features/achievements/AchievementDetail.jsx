import ButtonText from "../../styles/ButtonText";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Row from "../../styles/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../styles/Tag";
import styled from "styled-components";
import { useAchievement } from "./hooks/useAchievement";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;


const AchievementDetail = () => {
  const {achievement, isLoading} = useAchievement();
  const moveBack = useMoveBack();
  
  if (isLoading) return <Spinner/>;
  if (!achievement) return <Empty resource="achievement"/>

  const priorityToTag = {
    "LOW": "blue",
    "MEDIUM": "yellow",
    "HIGH": "green",
  };


  const {id, weight, name, description, date} = achievement;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Achievement #{id}</Heading>
          <Tag type={priorityToTag[weight]}>{weight.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <Row>
        <div>Name</div>
        <div>{name}</div>
      </Row>
      <Row>{description}</Row>
      <Row>{date}</Row>
    </>
  )
}

export default AchievementDetail
