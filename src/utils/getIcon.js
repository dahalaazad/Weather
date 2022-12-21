export default getIcon = (route, focused) => {
  let iconName = 'home';

  switch (route.name) {
    case 'Home':
      return (iconName = focused ? 'home' : 'home-outline');
    case 'Search':
      return (iconName = focused ? 'search' : 'search-outline');
    default:
      return iconName;
  }
};
