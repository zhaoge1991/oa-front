export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'sale',
        data: {
          menu: {
            title: '销售管理',
            icon: 'ion-ios-cart',
            selected: false,
            expanded: false,
            order: 20,
          }
        },
        children: [
          {
            path: 'order',
            data: {
              menu: {
                title: '订单管理'
              }
            }
          },
          {
            path: 'director',
            data: {
              menu: {
                title: '主管审核订单'
              }
            }
          },
          {
            path: 'balance_payment',
            data: {
              menu: {
                title: '欠尾款订单'
              }
            }
          },
          {
            path: 'balance_transport',
            data: {
              menu: {
                title: '欠运费订单'
              }
            }
          }
        ]
      },
      {
        path: 'finance',
        data: {
          menu: {
            title: '财务管理',
            icon: 'ion-cash',
            selected: false,
            expanded: false,
            order: 0
          }
        },
        children: [
          {
            path: 'order',
            data: {
              menu: {
                title: '订单'
              }
            }
          },
          {
            path: 'balance_payment',
            data: {
              menu: {
                title: '欠尾款订单'
              }
            }
          },
          {
            path: 'balance_transport',
            data: {
              menu: {
                title: '欠运费订单'
              }
            }
          }
        ]
      },
       {
        path: 'procurement',
        data: {
          menu: {
            title: '采购管理',
            icon: 'ion-ios-bookmarks',
            selected: false,
            expanded: false,
            order: 0
          }
        },
        children: [
          {
            path: 'order',
            data: {
              menu: {
                title: '订单管理'
              }
            }
          },
          {
            path: 'procurement_order',
            data: {
              menu: {
                title: '采购单'
              }
            }
          },
          {
            path: 'freeze_order',
            data: {
              menu: {
                title: '冻结库存单'
              }
            }
          },

        ]
      },
      {
        path: 'depot',
        data: {
          menu: {
            title: '仓库管理',
            icon: 'ion-cube',
            selected: false,
            expanded: false,
            order: 0
          }
        },
        children: [
          {
            path: 'order',
            data: {
              menu: {
                title: '订单管理'
              }
            }
          }
        ]
      },
      {
        path: 'shipping',
        data: {
          menu: {
            title: '货运管理',
            icon: 'ion-plane',
            selected: false,
            expanded: false,
            order: 0
          }
        },
        children: [
          {
            path: 'order',
            data: {
              menu: {
                title: '订单管理'
              }
            }
          }
        ]
      },
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'editors',
        data: {
          menu: {
            title: 'Editors',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'ckeditor',
            data: {
              menu: {
                title: 'CKEditor',
              }
            }
          }
        ]
      },
      {
        path: 'components',
        data: {
          menu: {
            title: 'Components',
            icon: 'ion-gear-a',
            selected: false,
            expanded: false,
            order: 250,
          }
        },
        children: [
          {
            path: 'treeview',
            data: {
              menu: {
                title: 'Tree View',
              }
            }
          }
        ]
      },
      {
        path: 'charts',
        data: {
          menu: {
            title: 'Charts',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'chartist-js',
            data: {
              menu: {
                title: 'Chartist.Js',
              }
            }
          }
        ]
      },
      {
        path: 'ui',
        data: {
          menu: {
            title: 'UI Features',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 300,
          }
        },
        children: [
          {
            path: 'typography',
            data: {
              menu: {
                title: 'Typography',
              }
            }
          },
          {
            path: 'buttons',
            data: {
              menu: {
                title: 'Buttons',
              }
            }
          },
          {
            path: 'icons',
            data: {
              menu: {
                title: 'Icons',
              }
            }
          },
          {
            path: 'modals',
            data: {
              menu: {
                title: 'Modals',
              }
            }
          },
          {
            path: 'grid',
            data: {
              menu: {
                title: 'Grid',
              }
            }
          },
        ]
      },
      {
        path: 'forms',
        data: {
          menu: {
            title: 'Form Elements',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
          }
        },
        children: [
          {
            path: 'inputs',
            data: {
              menu: {
                title: 'Form Inputs',
              }
            }
          },
          {
            path: 'layouts',
            data: {
              menu: {
                title: 'Form Layouts',
              }
            }
          }
        ]
      },
      {
        path: 'tables',
        data: {
          menu: {
            title: 'Tables',
            icon: 'ion-grid',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [
          {
            path: 'basictables',
            data: {
              menu: {
                title: 'Basic Tables',
              }
            }
          },
          {
            path: 'smarttables',
            data: {
              menu: {
                title: 'Smart Tables',
              }
            }
          }
        ]
      },
      {
        path: 'maps',
        data: {
          menu: {
            title: 'Maps',
            icon: 'ion-ios-location-outline',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'googlemaps',
            data: {
              menu: {
                title: 'Google Maps',
              }
            }
          },
          {
            path: 'leafletmaps',
            data: {
              menu: {
                title: 'Leaflet Maps',
              }
            }
          },
          {
            path: 'bubblemaps',
            data: {
              menu: {
                title: 'Bubble Maps',
              }
            }
          },
          {
            path: 'linemaps',
            data: {
              menu: {
                title: 'Line Maps',
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Pages',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: ['/login'],
            data: {
              menu: {
                title: 'Login'
              }
            }
          },
          {
            path: ['/register'],
            data: {
              menu: {
                title: 'Register'
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Menu Level 1',
            icon: 'ion-ios-more',
            selected: false,
            expanded: false,
            order: 700,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'Menu Level 1.1',
                url: '#'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Menu Level 1.2',
                url: '#'
              }
            },
            children: [
              {
                path: '',
                data: {
                  menu: {
                    title: 'Menu Level 1.2.1',
                    url: '#'
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'External Link',
            url: 'http://akveo.com',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
    ]
  }
];
