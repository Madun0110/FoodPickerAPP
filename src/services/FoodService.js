const API_URL = "https://6a129b8678d0434e0d5d4e4f.mockapi.io/tb_food";

export const getFoods = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Gagal mengambil data makanan");
    }

    return await response.json();
};

export const addFood = async (food) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(food),
    });

    if (!response.ok) {
        throw new Error("Gagal menambahkan data makanan");
    }

    return await response.json();
};

export const updateFood = async (id, food) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(food),
    });

    if (!response.ok) {
        throw new Error("Gagal mengubah data makanan");
    }

    return await response.json();
};

export const deleteFood = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Gagal menghapus data makanan");
    }

    return await response.json();
};