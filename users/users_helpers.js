const formatUserData = data => {
    console.log(data);
    return ({
        user_id: data[0].user_id,
        first_name: data[0].first_name,
        last_name: data[0].last_name,
        /* Once we set up the model to account for multiple businesses,
            change the following to a map: */
        businesses: data.map(business => {
            if (business.business_id_business) {
                return ({
                    id: business.business_id_business,
                    name: business.name_business,
                    city: business.city_business,
                    state: business.state_business,
                    yelp: {
                        yelp_id: business.yelp_id_business,
                        url: business.url_business,
                        image_url: business.image_url_business
                    }
                })
            }
        }),
        favorites: data.map(favorite => {
            if (favorite.business_id_favorite) {
                return ({
                    id: favorite.business_id_favorite,
                    name: favorite.name_favorite,
                    city: favorite.city_favorite,
                    state: favorite.state_favorite,
                    yelp: {
                        yelp_id: favorite.yelp_id_favorite,
                        url: favorite.url_favorite,
                        image_url: favorite.image_url_favorite
                    }
                })
            }
        })
    })
};


module.exports = {
    formatUserData
}