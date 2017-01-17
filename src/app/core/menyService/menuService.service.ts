import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 50
          }
        }
      },
      {
        path: 'work',
        data: {
          menu: {
            title: '工作事项',
            icon: 'ion-clipboard',
            selected: false,
            expanded: false,
            order: 1
          }
        },
        children: [
          {
            path: 'task',
            data: {
              menu: {
                title: '待办事项',
              }
            }
          },
          {
            path: 'task_manager',
            data: {
              menu: {
                title: '事项管理',
              }
            }
          },
          {
            path: 'report',
            data: {
              menu: {
                title: '工作报表'
              }
            },
            children: [
              {
                path: 'week',
                data: {
                  menu: {
                    title: '周报'
                  }
                }
              },
              {
                path: 'month',
                data: {
                  menu: {
                    title: '月报'
                  }
                }
              }
            ]
          }
        ]
      },
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
            path: 'sale-table',
            data: {
              menu: {
                title: '外销表单'
              }
            },
            children: [
              {
                path: 'inquiry',
                data: {
                  menu: {
                    title: '外销报价单'
                  }
                }
              }
            ]
          },
          {
            path: 'order-manager',
            data: {
              menu: {
                title: '订单管理'
              }
            }
          },
          {
            path: 'info',
            data: {
              menu: {
                title: '信息设置'
              }
            },
            children: [
              {
                path: 'provision',
                data:　{
                  menu: {
                    title: '条款管理'
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: 'salescontract',
        data: {
          menu: {
            title: '外销合同',
            icon: 'ion-ios-paper-outline',
            selected: false,
            expanded: false,
            order: 650,
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
      //{
      //  path: 'components',
      //  data: {
      //    menu: {
      //      title: 'Components',
      //      icon: 'ion-gear-a',
      //      selected: false,
      //      expanded: false,
      //      order: 250,
      //    }
      //  },
      //  children: [
      //    {
      //      path: 'treeview',
      //      data: {
      //        menu: {
      //          title: 'Tree View',
      //        }
      //      }
      //    }
      //  ]
      //},
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
@Injectable()
export class MenuService {
  constructor(private http: InterceptorService){}

  private menu;

  getMenu() {
    return this.http.get('/api/menu/menu/get_menus')
  }

  setMenu(){
    this.getMenu().subscribe(
      data => {console.log(data.json());this.menu = PAGES_MENU},
      error => {console.log(error)}
    )
  }
}
