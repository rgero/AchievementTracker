import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table"
import { format } from "date-fns";

/* eslint-disable react/prop-types */
const AchievementRow = ({achievement}) => {
  const {id, name, date} = achievement;
  return (
    <Table.Row>
      <span>{name}</span>
      <span>{format(date, 'yyyy-MM-dd')}</span>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
          <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="guests"
                disabled={true}
                onConfirm={() => true}
              />
            </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default AchievementRow
