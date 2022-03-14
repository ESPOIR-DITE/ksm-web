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
    icon: 'expand-outline',
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
    title: 'Entry',
    icon: 'car-outline',
    link: '/entry'
  },
  {
    title: 'Transaction',
    icon: 'expand-outline',
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
    ],
  },
]
export const MAIN_MENU = MENU_ITEMS;
