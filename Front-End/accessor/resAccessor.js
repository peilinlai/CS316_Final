const resAccessor = {
  /**
   * GET /api/restaurants/?name=xxxx
   * Get all information belonging to the restaurant.
   * @param  {Object}  query {restaurant}
   */
  getRestaurant(query) {
    // const response = await fetch(query, {
    //   method: 'GET',
    // });
    // const responseJson = await response.json();
    // return responseJson;
    console.log(query);
    return {
      "status": "success",
      "data" : {
       "name" : "Panda Express",
       "location" : "Bryan Center",
       "type" : "Chinese",
       "rating" : "4",
       "offering" : [
           {
              "offering_name":"Teriyaki Chicken",
              "offering_price": "8",
              "offering_rating": "8" //out of 10
           },
           {
              "offering_name":"Fried Rice",
              "offering_price": "5",
              "offering_rating": "7"
           }
        ]
      }
    };
  },
};

export default resAccessor;
