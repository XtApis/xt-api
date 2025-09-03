/**
 * Navbar Item Component Types
 * 扩展默认的导航栏组件类型映射，避免覆盖内置类型
 */


import CustomDogfoodNavbarItem from '../../components/NavbarItems/CustomDogfoodNavbarItem';

import OriginalComponentTypes from '@theme-original/NavbarItem/ComponentTypes';

export default {
  ...OriginalComponentTypes,

  'custom-dogfood-navbar-item': CustomDogfoodNavbarItem,

};