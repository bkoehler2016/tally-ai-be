const formatUserData = data => {
    console.log("Data in formatUserData:\n", data);

    const formatted = {
        user_id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        preferences: data.preferences,
        businesses: data.businesses.length
            ? data.businesses.map(business => ({
                id: business.id,
                name: business.name,
                city: business.city,
                state: business.state,
            }))
            : [],
        favorites: data.competition.length
            ? data.competition.map(competition => ({
                id: competition.id,
                name: competition.name,
                city: competition.city,
                state: competition.state,
            }))
            : []
    };
    console.log("Formatted data in formatUserData:\n", formatted);
    return formatted;
};

// TODO: Use formatBusinesses on response for adding/deleting businesses/favorites
const formatBusinesses = businesses => businesses.map(business => ({
    id: business.id,
    name: business.name,
    city: business.city,
    state: business.state,
}))


module.exports = {
    formatUserData,
    formatBusinesses
}