import { HiEye, HiTrash } from "react-icons/hi2";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table"
import { format } from "date-fns";
import { useDeleteAchievement } from "./hooks/useDeleteAchievement";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const AchievementRow = ({achievement}) => {
  const {isDeleting, deleteAchievement} = useDeleteAchievement();
  const {id, ownerID, name, weight, date} = achievement;

  const navigate = useNavigate();

  const deleteID = id + "_" + ownerID;
  return (
    <Table.Row>
      <span>{name}</span>
      <span>{format(date, 'yyyy-MM-dd')}</span>
      <span>{weight}</span>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={deleteID} />
            <Menus.List id={deleteID}>
              <Menus.Button icon={<HiEye />} onClick={() => navigate(`/achievements/${id}`)}>
                See Details
              </Menus.Button>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
          <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="achievements"
                disabled={isDeleting}
                onConfirm={() => deleteAchievement(id)}
              />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default AchievementRow
