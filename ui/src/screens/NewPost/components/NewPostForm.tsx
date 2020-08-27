import * as React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../components/Button";
import { Fieldset, Label, TextInput } from "../../../components/FormFields";
import { toast } from "../../../components/useToast";
import JobsGoWhereApiClient from "../../../shared/services/JobsGoWhereApiClient";
import { PostType } from "../machines/NewPostForm";
import DescriptionField from "./DescriptionField";
import PostTypeField from "./PostTypeField";

const Container = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  background-color: white;
  border-radius: 0.875rem;
  padding: 1.5rem;
`;

const Buttons = styled.div`
  display: flex;
  ${Button} + ${Button} {
    margin-left: 1rem;
  }
`;

const INITIAL_TYPE = "talent";

const NewPostForm: React.FC = function () {
  const history = useHistory();
  const { handleSubmit, setValue, getValues, watch, register, errors } = useForm();
  const watchPostType = watch("type", INITIAL_TYPE);

  interface FormFields {
    type: PostType;
    title: string;
    link?: string;
    description: string;
    city: string;
  }

  const onSubmit = (values: FormFields) => {
    console.log("submitting");
    console.log(values);

    const postJob = async () => {
      try {
        const response = await JobsGoWhereApiClient.post(
          `${process.env.REACT_APP_API}/${values.type}`,
          JSON.stringify(values),
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        toast("Your post has been successfully created! 👍");
        await new Promise((response) => setTimeout(response, 3000));
        history.push(`/${values.type}s`);
        console.log("post", response);
      } catch (err) {
        console.error("error", err);
      }
    };
    postJob();
  };

  React.useEffect(() => {
    register({ name: "type" }, { required: true });
  }, [register]);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PostTypeField
          value={watchPostType}
          onChange={(type) => {
            setValue("type", type);
          }}
        />
        <Fieldset>
          <Label htmlFor="title">Title</Label>
          <TextInput id="title" name="title" ref={register({ required: true })} />
        </Fieldset>
        {watchPostType === "job" && (
          <Fieldset>
            <Label htmlFor="link">Job Role Link</Label>
            <TextInput id="link" name="link" /* ref={register({ required: true })} */ />
          </Fieldset>
        )}

        <DescriptionField register={register} rules={{ required: true, minLength: 3 }} />
        <input type="hidden" name="city" value="Singapore" ref={register} />
        {errors.exampleRequired && <span>This field is required</span>}
        <Buttons>
          <Button fullWidth type="button" onClick={() => history.goBack()}>
            Cancel
          </Button>
          <Button fullWidth primary type="submit">
            Create
          </Button>
        </Buttons>
      </form>
    </Container>
  );
};

export default NewPostForm;
