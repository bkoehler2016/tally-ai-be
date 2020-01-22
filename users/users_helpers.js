const formatUserData = data => ({
    user_id: data[0].user_id,
    first_name: data[0].first_name,
    last_name: data[0].last_name,
    /* Once we set up the model to account for multiple businesses,
        change the following to a map: */
    businesses: data.map(business => ({
        id: business.business_id,
        name: business.name,
        city: business.city,
        state: business.state,
        yelp: {
            yelp_id: business.yelp_id,
            url: business.url,
            image_url: business.image_url
        }
    }))
});


module.exports = {
    formatUserData
}