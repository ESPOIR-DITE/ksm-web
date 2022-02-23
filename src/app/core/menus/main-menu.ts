import {NbMenuItem} from "@nebular/theme";

const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/admin/dashboard',
  },
  {
    title: 'OPERATIONS',
    icon: 'settings-outline',
    group: true,
  },
  {
    title: 'Manage Users',
    icon: 'people-outline',
    link: '/pages/admin/users'
  },
  {
    title: 'Manage Organisations',
    icon: 'map',
    home: true,
    children: [
      {
        title: 'Organisation Types',
        icon: 'layers-outline',
        link: '/pages/admin/org-types',
      },
      {
        title: 'Organisations',
        icon: 'map-outline',
        link: '/pages/admin/organisations',
      },
    ],
  },
]
export const Main_manu = MENU_ITEMS;
