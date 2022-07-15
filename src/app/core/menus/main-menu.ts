import {NbMenuItem} from "@nebular/theme";

const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/home',
  },
  {
    title: 'ACTIVITIES',
    icon: 'settings-outline',
    group: true,
  },
  {
    title: 'Products',
    icon: 'archive-outline',
    home: true,
    children: [
      {
        title: 'Ingredient',
        icon: 'color-palette-outline',
        link: '/ingredient'
      },
      {
        title: 'Item',
        icon: 'cube-outline',
        link: '/item'
      },
      {
        title: 'Quantity-type',
        icon: 'cube-outline',
        link: '/quantity-type'
      },
    ]
  },
  {
    title: 'OPERATIONS',
    icon: 'arrow-right',
    group: true,
  },
  {
    title: 'Depot',
    icon: 'shopping-cart-outline',
    home: true,
    children: [
      {
        title: 'Entry',
        icon: 'car-outline',
        link: '/entry'
      },
      {
        title: 'Stock',
        icon: 'archive-outline',
        link: '/stock'
      }
    ]

  },
  {
    title: 'Transaction',
    icon: 'car-outline',
    home: true,
    children: [
      {
        title: 'Transactions',
        icon: 'layers-outline',
        link: '/transaction',
      },
      {
        title: 'Transaction Type',
        icon: 'layers-outline',
        link: '/transaction-type',
      },
      {
        title: 'Sells',
        icon: 'corner-up-right-outline',
        link: '/sell',
      },
      {
        title: 'period',
        icon: 'clock-outline',
        link: '/period',
      },
      {
        title: 'buyer type',
        icon: 'people-outline',
        link: '/buyer-type',
      },

    ],
  },
  {
    title: 'Organisation',
    icon: 'people-outline',
    home: true,
    children: [
      {
        title: 'Company',
        icon: 'at-outline',
        link: '/company',
      },
      {
        title: 'Employees',
        icon: 'people-outline',
        link: '/employees',
      },
    ],
  },
  {
    title: 'Profile',
    icon: 'person-outline',
    link: '/auth/profile'
  },
  {
    title: 'Logout',
    icon: 'log-out-outline',
    link: '/auth/logout'
  },

]
export const MAIN_MENU = MENU_ITEMS;
