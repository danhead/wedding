/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./rsvp').default,
    require('./ceremony').default,
    require('./reception').default,
    require('./accomodation').default,
    require('./transport').default,
    require('./giftlist').default,
    require('./login').default,
    require('./admin').default,
    require('./adminPeople').default,
    require('./adminPerson').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - Daniel and Hana's Wedding`;
    route.description = route.description || '';

    return route;
  },

};
