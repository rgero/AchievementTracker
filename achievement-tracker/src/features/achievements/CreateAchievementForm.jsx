/* eslint-disable react/prop-types */

import { Controller, useForm } from "react-hook-form";

import Button from "../../styles/Button";
import Form from "../../ui/forms/Form";
import FormRow from "../../ui/forms/FormRow";
import Input from "../../styles/Input";
import Select from "../../ui/Select";
import TextArea from "../../ui/forms/TextArea";
import { useAddAchievement } from "./hooks/useAddAchievement";
import { useEditAchievement } from "./hooks/useEditAchievement";
import { useUser } from "../authentication/hooks/useUser";

const CreateAchievementForm = ({achievement={}, onCloseModal}) => {

  const { id: editId, ...editValues} = achievement;
  const isEditSession = Boolean(editId);

  const { control, register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : { weight: "Low" },
  });
  const errors = formState.errors;

  const {isWorking, addAchievement} = useAddAchievement();
  const {isEditing, editAchievement} = useEditAchievement();
  const {user} = useUser();

  const weightOptions = [{value: "Low", label: "Low"}, {value: "Medium", label: "Medium"}, {value: "High", label: "High"},]

  const onSubmit = (data) => {
    data = {...data, owner_id: user.id}
    if (isEditSession)
    {
      editAchievement({newAchievementData: {...data}, id: editId},
        {onSuccess: () => {
          reset();
          onCloseModal?.();
        }});
    } else {
      addAchievement(data, 
        {onSuccess: () => {
            reset();
            onCloseModal?.();
        }}
      );
    }
  }

  const onError = (err) => {
    console.log(err)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <h1>Create a new achievement</h1>
      <FormRow label="Name" errors={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Description" errors={errors?.description?.message}>
        <TextArea
          type="textarea"
          id="description"
          disabled={isWorking}
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Date" errors={errors?.date?.message}>
          <Input
            type="date"
            id="date"
            {...register("date", {
              required: "This field is required",
              validate: (currentValue) => {
                return new Date(currentValue) instanceof Date || "Date needed"
              }
            })}
          />
      </FormRow>

      <FormRow label="Weight" errors={errors?.weight?.message}>
        <Controller
          name="weight"
          control={control}
          render={({ field }) => <Select 
            {...field} 
            options={weightOptions} 
          />}
        />
      </FormRow>
      
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => {
            reset();
            onCloseModal?.();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          Create
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateAchievementForm
