import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showAuthor, updateAuthor } from "../../../_services/authors";

export default function AuthorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    biodata: "",
    cover_photo: null,
    _method: "PUT",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorData = await showAuthor(id);

        setFormData({
          name: authorData.name,
          biodata: authorData.biodata,
          cover_photo: authorData.cover_photo,
          _method: "PUT",
        });
      } catch (error) {
        console.error("Error fetching author data:", error);
        alert("Author not found or error loading data");
        navigate("/admin/authors");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cover_photo") {
      setFormData({
        ...formData,
        cover_photo: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      for (const key in formData) {
        if (key === "cover_photo") {
          if (formData.cover_photo instanceof File) {
            payload.append("cover_photo", formData.cover_photo);
          }
        } else {
          payload.append(key, formData[key]);
        }
      }

      await updateAuthor(id, payload);
      navigate("/admin/authors");
    } catch (error) {
      console.error("Error updating author:", error);
      alert("Failed to update author");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit Author
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder="Author Name"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="biodata"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Biodata
              </label>
              <textarea
                id="biodata"
                name="biodata"
                rows="6"
                value={formData.biodata}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder="Write a short biodata about the author..."
              ></textarea>
            </div>

            <div className="w-full sm:col-span-2">
              <label
                htmlFor="cover_photo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cover Photo
              </label>
              <input
                type="file"
                name="cover_photo"
                id="cover_photo"
                accept="image/*"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
              {formData.cover_photo &&
                !(formData.cover_photo instanceof File) && (
                  <img
                    src={formData.cover_photo}
                    alt="Current cover"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Save Author
            </button>
            <button
              type="reset"
              className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
