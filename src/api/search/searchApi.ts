export const searchApi = {
    search: async (local: string, checkIn: string, checkOut: string, totalGuests: string) => {
        const response = await fetch(
            `http://localhost:3001/home/search?destino=${local}&checkin=${checkIn}&checkout=${checkOut}&hospedes=${totalGuests}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await response.json()

        return data
    }
}