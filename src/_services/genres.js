import API from "../_api";

export const getGenres = async () => {
    const { data } = await API.get("/genres");
    return data.data;
};

export const createGenre = async (data) => {
    try {
        const response = await API.post("/genres", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating genre:", error);
        if (error.response) {
            console.log("Validation errors:", error.response.data);
        }
        throw error;
    }
};
