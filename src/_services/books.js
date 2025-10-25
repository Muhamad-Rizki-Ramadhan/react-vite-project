import API from "../_api";

export const getBooks = async () => {
  const { data } = await API.get("/books");
  return data.data;
};

export const createBook = async (data) => {
  try {
    const response = await API.post("/books", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    if (error.response) {
      console.log("Validation errors:", error.response.data);
    }
    throw error;
  }
};

export const showBook = async (id) => {
  try {
    const { data } = await API.get(`/books/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBook = async (id, data) => {
  try {
    const response = await API.post(`/books/${id}`, data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    await API.delete(`/books/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
