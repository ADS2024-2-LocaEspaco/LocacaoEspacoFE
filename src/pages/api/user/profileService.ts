export interface UserData {
    username: string;
    fullname: string;
    email: string;
    cpf: string;
    phone: string;
    state: string;
    city: string;
    address: string;
    cep: string;
}

export const getUserProfile = async (userId: number): Promise<UserData | null> => {
    try {
        const URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${URL}/profile/${userId}`);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log("Erro ao buscar perfil:", error.message);
        return null;
    }
};
