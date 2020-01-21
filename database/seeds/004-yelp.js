exports.seed = function(knex) {
  return knex("yelp").insert([
    {
      id: 1,
      business_id: 1,
      url: "https://www.yelp.com/biz/first-draft-book-bar-phoenix",
      yelp_id: "R67i1c41zZZ3QMYDPmNClw",
      image_url:
        "https://s3-media2.fl.yelpcdn.com/bphoto/cEBvMX0FzBAvxCpDSCSq7A/o.jpg"
    },
    {
      id: 2,
      business_id: 2,
      url: "https://www.yelp.com/biz/la-gattara-cat-lounge-and-boutique-tempe",
      yelp_id: "jga_2HO_j4I7tSYf5cCEnQ",
      image_url:
        "https://s3-media2.fl.yelpcdn.com/bphoto/cEBvMX0FzBAvxCpDSCSq7A/o.jpg"
    }
  ]);
};
