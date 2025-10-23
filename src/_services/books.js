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
