import Button from "../../styles/Button";
import Form from "../../ui/forms/Form";
import FormButtonGroup from "../../ui/forms/FormButtonGroup";
import FormRow from "../../ui/forms/FormRow";
import Input from "../../styles/Input";
import { useForm } from "react-hook-form";
import { useSignup } from "./hooks/useSignup";

const SignupForm = () => {
  const {signup, isLoading } = useSignup();
  const {register, formState, getValues, handleSubmit, reset} = useForm()
  const {errors} = formState;

  const onSubmit = ({fullName, email, password}) => {
    signup({ fullName, email, password}, {onSettled: reset} )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" errors={errors?.fullName?.message}>
        <Input 
          type="text" 
          id="fullName"
          disabled={isLoading}
          {...register("fullName", {
            required: "This field is required"
          })}
        />
      </FormRow>

      <FormRow label="Email address" errors={errors?.email?.message}>
        <Input 
          type="email" 
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email"
            }
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" errors={errors?.password?.message}>
        <Input 
          type="password" 
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: { value: 8, message: "Password must be at least 8 characters"}
          })} 
        />
      </FormRow>

      <FormRow label="Repeat password" errors={errors?.passwordConfirm?.message}>
        <Input 
          type="password" 
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => value === getValues().password || "Passwords much match"
          })} 
        />
      </FormRow>

      <FormButtonGroup>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormButtonGroup>
    </Form>
  )
}

export default SignupForm