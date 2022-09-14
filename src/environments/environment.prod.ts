export const environment = {
  production: true,
  apiUrl: 'https://mpitubamoney-api.herokuapp.com',
  tokenAllowedDomains: [ /mpitubamoney-api.herokuapp.com/ ],

  tokenDisallowedRoutes: [/\/oauth\/token/],
};
