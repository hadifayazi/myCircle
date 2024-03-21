import { useFormik } from "formik";
import { BsImage } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
import PropTypes from "prop-types";
import { getLocalUserInfo } from "../../app/services/tokenDecode";
import { useNavigate } from "react-router-dom";
import { useAddPostMutation } from "../../app/api/postsApi";

const AddPost = () => {
  const navigate = useNavigate();
  const [addPost] = useAddPostMutation();
  const { avatar } = getLocalUserInfo(localStorage.getItem("accessToken"));

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: (values, { resetForm }) => {
      const { content, image } = values;
      const formData = new FormData();

      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }
      addPost(formData);
      resetForm({
        values: {
          content: "",
          image: "",
        },
      });
      navigate("/feeds");
    },
  });

  return (
    <div
      className="
      border-b-[1px]
      border-neutral-800
      p-5
      "
    >
      <form onSubmit={formik.handleSubmit}>
        <div
          className="flex gap-3 w-full border-b-[1px]
          border-neutral-800 p-3"
        >
          <img src={avatar} className="h-14 w-14 rounded-full " />

          <input
            type="text"
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            className="bg-transparent grow outline-none "
            placeholder="I'm thinking..."
          />
        </div>

        <div className="flex justify-between p-3">
          <div>
            <label htmlFor="file-input">
              {!formik.values.image && (
                <BsImage
                  className="flex
                    text-neutral-500
                    cursor-pointer
                    transition
                    mt-3
                    hover:text-sky-500"
                  size={20}
                />
              )}
            </label>

            <input
              className="hidden"
              type="file"
              name="image"
              onChange={(event) =>
                formik.setFieldValue("image", event.currentTarget.files[0])
              }
              id="file-input"
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          {formik.values.image && <ImagePreview file={formik.values.image} />}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-cust-btn mt-3  hover:bg-cust-btn-hover p-2 px-5 rounded-full text-white font-bold"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;

const ImagePreview = ({ file }) => {
  const [preview, setPreview] = useState({});

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };

    const handleClose = () => {
      setPreview("");
    };

    return (
      <div className="flex justify-between rounded-lg">
        <div className="left-0 top-0">
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={handleClose}
          >
            <AiFillCloseCircle size={30} />
          </button>
        </div>

        <img src={preview} width={350} height={350} />
      </div>
    );
  }
};
ImagePreview.propTypes = {
  file: PropTypes.object.isRequired,
};
