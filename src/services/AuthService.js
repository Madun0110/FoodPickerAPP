import { supabase } from "../lib/supabase";

export const registerUser = async (name, email, password) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: cleanPassword,
        options: {
            data: {
                name: cleanName,
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    const user = data.user;

    if (!user) {
        throw new Error("User auth gagal dibuat");
    }

    const { error: insertError } = await supabase
        .from("users")
        .insert([
            {
                id: user.id,
                name: cleanName,
                email: cleanEmail,
            },
        ]);

    if (insertError) {
        throw new Error(insertError.message);
    }

    return data;
};
export const loginUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }

    return true;
};

export const getCurrentSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw new Error(error.message);
    }

    return data.session;
};

export const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    return data.user;
};