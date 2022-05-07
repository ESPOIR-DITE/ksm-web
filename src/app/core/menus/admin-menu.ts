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
    title: 'User',
    icon: 'expand-outline',
    home: true,
    children: [
      {
        title: 'user',
        icon: 'layers-outline',
        link: '/user',
      },
      {
        title: 'shop',
        icon: 'layers-outline',
        link: '/shop',
      },

    ],
  },
]
export const ADMIN_MENU = MENU_ITEMS;
