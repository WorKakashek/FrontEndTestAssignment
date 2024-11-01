import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/postRequest.scss";
import Button from "./button";
import { useForm, SubmitHandler } from "react-hook-form";
import success from "../assets/success.png";
import { Box, CircularProgress } from "@mui/material";

const PostRequest: React.FC = () => {
  type Inputs = {
    name: string;
    email: string;
    phone: string;
    position: string;
    photo: FileList;
  };
  type Positions = {
    id: number;
    name: string;
  };

  const [positions, setPositions] = useState<Positions[]>([]);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  // Fetch token on component mount
  useEffect(() => {
    axios
      .get("https://frontend-test-assignment-api.abz.agency/api/v1/token")
      .then((response) => {
        setToken(response.data.token);
      })
      .catch((error) => {
        console.error("Token fetch error:", error);
      });
  }, []);

  // Fetch positions on component mount
  useEffect(() => {
    axios
      .get("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
      .then((response) => {
        setPositions(response.data.positions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    axios
      .post(
        "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          position_id: data.position,
          photo: data.photo[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
            Token: token,
          },
        }
      )
      .then((response) => {
        if (response.data.success === true) {
          setConfirmed(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  return (
    <div className="formContainer">
      {loading ? (
        <Box className="loading" sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : confirmed ? (
        <div>
          <h2 className="formContainer__title">User successfully registered</h2>
          <img width={328} height={290} src={success} alt="Success" />
        </div>
      ) : (
        <div>
          <h2 className="formContainer__title">Working with POST request</h2>
          <form
            className="formContainer__form"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="formContainer__form__input">
              <input
                className="input__text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 60,
                    message: "Name cannot exceed 60 characters",
                  },
                })}
                type="text"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="input__error">{errors.name.message}</p>
              )}
            </div>

            <div className="formContainer__form__input">
              <input
                className="input__text"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                type="email"
                placeholder="Email"
              />
              {errors.email && (
                <p className="input__error">{errors.email.message}</p>
              )}
            </div>

            <div className="formContainer__form__input">
              <input
                className="input__text"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^\+380\d{9}$/,
                    message:
                      "Phone number must start with +380 and be 12 digits long",
                  },
                })}
                type="text"
                placeholder="Phone"
              />
              <p className="input__phone">+380 (XXX) XXX - XX - XX</p>
              {errors.phone && (
                <p className="input__error">{errors.phone.message}</p>
              )}
            </div>

            <div className="form__radio-group">
              <p className="form__radio-group__title">Select your position</p>
              {positions.map((position) => (
                <label className="form__radio-group__label" key={position.id}>
                  <input
                    className="form__radio-group__input"
                    type="radio"
                    value={position.id}
                    {...register("position", {
                      required: "Position is required",
                    })}
                  />
                  {position.name}
                </label>
              ))}
            </div>
            {errors.position && (
              <p className="input__error">{errors.position.message}</p>
            )}

            <div className="file-upload">
              <label htmlFor="file-input" className="upload-button">
                Upload
              </label>
              <input
                className="file-input"
                type="file"
                accept="image/jpeg, image/jpg"
                {...register("photo", {
                  required: "Photo is required",
                  validate: {
                    acceptedFormats: (files) =>
                      (files &&
                        ["image/jpeg", "image/jpg"].includes(files[0]?.type)) ||
                      "Only JPEG/JPG files are allowed",
                    fileSize: (files) =>
                      (files && files[0]?.size <= 5 * 1024 * 1024) ||
                      "File size must be less than 5 MB",
                  },
                })}
                id="file-input"
              />
              <span className="file-text">Upload your photo</span>
              {errors.photo && (
                <p className="input__error">{errors.photo.message}</p>
              )}
            </div>
            <Button disabled={!isValid} type="submit" text={"Sign Up"} />
          </form>
        </div>
      )}
    </div>
  );
};

export default PostRequest;
