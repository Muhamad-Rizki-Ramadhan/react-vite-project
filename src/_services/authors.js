import { API } from "../_api";

export const getAuthors = async () => {
  const { data } = await API.get("/authors");
  return data.data;
};

export const createAuthor = async (data) => {
  try {
    const response = await API.post("/authors", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating author:", error);
    if (error.response) {
      console.log("Validation errors:", error.response.data);
    }
    throw error;
  }
};

export const showAuthor = async (id) => {
  try {
    const { data } = await API.get(`/authors/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateAuthor = async (id, data) => {
  try {
    const response = await API.post(`/authors/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    await API.delete(`/authors/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
