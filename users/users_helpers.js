const formatUserData = data => ({
    first_name: data.first_name,
    last_name: data.last_name,
    businesses: [
        {
            id: data.id,
            name: data.name,
            city: data.city,
            state: data.state,
            yelp: {
                yelp_id: data.yelp_id,
                url: data.url,
                image_url: data.image_url
            }
        }
    ]
})

module.exports = {
    formatUserData
}