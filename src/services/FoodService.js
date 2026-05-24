import { supabase } from "../lib/supabase";

const TABLE_NAME = "tb_food";

export const getFoods = async () => {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        throw new Error("Gagal mengambil data makanan");
    }

    return data;
};

export const addFood = async (food) => {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert([
            {
                name: food.name,
                category: food.category,
                price: food.price,
                description: food.description,
                image: food.image,
            },
        ])
        .select()
        .single();

    if (error) {
        throw new Error("Gagal menambahkan data makanan");
    }

    return data;
};

export const updateFood = async (id, food) => {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .update({
            name: food.name,
            category: food.category,
            price: food.price,
            description: food.description,
            image: food.image,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error("Gagal mengubah data makanan");
    }

    return data;
};

export const deleteFood = async (id) => {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error("Gagal menghapus data makanan");
    }

    return data;
};