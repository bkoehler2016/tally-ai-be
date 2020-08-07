const formatUserData = data => {
    console.log("Data in formatUserData:\n", data);

    const formatted = {
        user_id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        preferences: data.preferences,
        type: data.type,
        businesses: data.businesses.length
            ? data.businesses.map(business => ({
                business_id: business.business_id,
                name: business.name,
                city: business.city,
                address: business.address,
                zipcode: business.zipcode,
                review_count: business.review_count,
                cuisine: business.cuisine,
                business_stars: business.business_stars
            }))
            : [],
        competitors: data.competition.length
            ? data.competition.map(competition => ({
                business_id: competition.business_id,
                name: competition.name,
                city: competition.city,
                address: competition.address,
                zipcode: competition.zipcode,
                review_count: competition.review_count,
                cuisine: competition.cuisine,
                business_stars: competition.business_stars
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