
const Dashboard = {
    text: 'Dashboard',
    link: '/secure/dashboard',
    icon: 'fa-tachometer'
};

// const Admin = {
//     text: 'Admin',
//     link: '',
//     icon: 'fa-user-circle',
//     level1: [
//         {
//             text: 'Tenant List',
//             link: './tenant/tenantlist',
//             level2: [
//                 {
//                     text: 'Create Form',
//                     link: '/secure/form-builder/create'
//                 }

//             ]
//         },
//         {
//             text: 'List of forms',
//             link: '/secure/form-builder/forms-list'
//         }


//     ]
// };


const Admin = {
    text: 'Admin',
    link: '',
    icon: 'fa-user-circle',
    level1: [
        {
            text: 'Tenant List',
            link: './tenant'


        },
        // {
        //     text: 'Tenant Registration',
        //     link: './tenant/registration'
        // },
        {
            text: 'User List',
            link: './tenant/userslist'
        },
        {
            text: 'User Previlages',
            link: './tenant/usersPP'
        },
        {
            text: 'Moduels',
            link: './tenant/module'
        },


    ]
};


const Supplier = {
    text: 'Supplier\'s',
    link: '/secure/central/supplier-list',
    icon: 'fa-building-o'
};

const MeasuringUnits = {
    text: 'Measuring Units',
    link: '/secure/central/measuring-units',
    icon: 'fa-newspaper-o'
};

const WeatherClassification = {
    text: 'Weather Classification',
    link: '/secure/central/weather-classification',
    icon: 'fa-bolt'
};
const EmployeeClassification = {
    text: 'Employee Classification',
    link: '/secure/central/employee-classification',
    icon: 'fa-users'
};
const PlantClassification = {
    text: 'Plant Classification',
    link: '/secure/central/plant-classification',
    icon: 'fa-building-o'
};
const CostCodeClassification = {
    text: 'Cost Code Classification',
    link: '/secure/central/costcode-classification',
    icon: 'fa-dot-circle-o'
};
const MaterialclassificationComponent = {
    text: 'Material Classification',
    link: '/secure/central/material-classification',
    icon: 'fa-archive'
};
const EmployeeWages = {
    text: 'Employee Wages Classification',
    link: '/secure/central/emp-wage',
    icon: ''
};
const LeaveType = {
    text: 'LeaveType Classification',
    link: '/secure/central/leavetype',
    icon: ''
};
const ProcurementCategory = {
    text: 'ProcurementCategory',
    link: '/secure/central/procurement-category',
    icon: ''
};
const serviceClassification = {
    text: 'serviceClassification',
    link: '/secure/central/service-classification',
    icon: ''
};
const SuppliersList = {
    text: 'SuppliersList',
    link: '/secure/central/supplier-list',
    icon: ''
};
const WarehouseStockyardlist = {
    text: 'WarehouseStockyardlist',
    link: '/secure/central/WarehouseStockyardlist',
    icon: ''
};
const CountryStateProvience = {
    text: 'CountryStateProvience',
    link: '/secure/central/country-state-provience',
    icon: ''
};
const assetscategory = {
    text: 'Immovable Assets Category',
    link: '/secure/central/assetscategory',
    icon: ''
};
const AssetMaintenanceCategory = {
    text: 'AssetMaintenanceCategory',
    link: '/secure/central/asset-maintain',
    icon: ''
};
const plantservicehistory = {
    text: 'Plant Service History',
    link: '/secure/central/plantservicehistory',
    icon: ''
};
const Finance = {
    text: 'Finance',
    link: '/secure/central/finance',
    icon: 'fa-user-circle',
    level2: [
        {
            text: 'Finance Center',
            link: '/secure/central/finance/finance-center'
        },
        {
            text: 'Profit Center',
            link: '/secure/central/finance/profit-center'
        },
        {
            text: 'Tax Codes Types',
            link: '/secure/central/finance/tax-code-types'
        },
        {
            text: 'Tax Codes',
            link: '/secure/central/finance/tax-codes'
        },
        {
            text: 'Tax Country Provisions',
            link: '/secure/central/finance/tax-country-provisions'
        },
        {
            text: 'Tax Types',
            link: '/secure/central/finance/tax-types'
        },
        {
            text: 'Unit Pay Rates',
            link: '/secure/central/finance/unit-pay-rates'
        },

    ]
};
const centralLibrary = {
    text: 'Central Library',
    link: '/secure/central/supplier-list',
    icon: 'fa-building-o',
    level2: [Supplier, MeasuringUnits, WeatherClassification, EmployeeClassification, PlantClassification, CostCodeClassification, MaterialclassificationComponent, EmployeeWages, LeaveType, ProcurementCategory, serviceClassification, SuppliersList, WarehouseStockyardlist, CountryStateProvience, assetscategory, AssetMaintenanceCategory, plantservicehistory, Finance]
}
const Eps = {
    text: 'EPS',
    link: '/secure/eps',
    icon: 'fa-building-o',
}
const epstools = {
    text: 'EPS Tools',
    link: '/secure/epstools',
    icon: 'fa-building-o',
    level2: [{
        text: 'Calenders',
        link: '/secure/epstools/calender'
    }, {
        text: 'Resource Curves',
        link: '/secure/epstools/resource'
    }]
}
const Enterprise = {
    text: 'EnterPrise',
    link: '/secure/eps',
    icon: 'fa-building-o',
    level1: [Eps,
        epstools, centralLibrary
    ]

}

const Projects = {
    text: 'Projects',
    icon: 'fa fa-list',
    link: '/secure/projects',
    level1: [
        {
            text: 'Project List',
            icon: 'fa fa-list',
            link: '/secure/projects',
        },
        {
            text: 'Project Library',
            icon: 'fa fa-sticky-note',
            link: '/secure/projects/project-library',
            level2: [{
                text: 'Employee Classification',
                icon: '',
                link: '/secure/projects/project-library/employee',
            }, {
                text: 'Material Transfer',
                icon: '',
                link: '/secure/projects/project-library/material',
            }, {
                text: 'Warehouse Stackyard',
                icon: '',
                link: '/secure/projects/project-library/warehouse',
            }, {
                text: 'Plant Classification',
                icon: '',
                link: '/secure/projects/project-library/plant',
            }, {
                text: 'Working Shifts',
                icon: '',
                link: '/secure/projects/project-library/workshifts',
            }, {
                text: 'Crew List',
                icon: '',
                link: '/secure/projects/project-library/crewlist',
            }, {
                text: 'Schedule Estimated',
                icon: '',
                link: '/secure/projects/project-library/schedule',
            }, {
                text: 'Schedule Rates',
                icon: '',
                link: '/secure/projects/project-library/schedule-rates',
            }, {
                text: 'Cost Code Schedule',
                icon: '',
                link: '/secure/projects/project-library/costcode-schedule',
            }, {
                text: 'Scope Works',
                icon: '',
                link: '/secure/projects/project-library/scope-works',
            }]
        }
        ,
        {
            text: 'Project Settings',
            icon: 'fa fa-cogs',
            link: '/secure/projects/project-settings'
        }, {
            text: 'Project Budgets',
            icon: 'fa fa-money',
            link: '/secure/projects/project-budget'
        }, {
            text: 'Project Status',
            icon: '',
            link: '/secure/projects/project-status'
        }, {
            text: 'Notes',
            icon: 'fa fa-sticky-note',
            link: '/secure/projects/project-notes'
        }

    ]
}

const Logout = {
    text: 'Logout',
    icon: 'fa-sign-out',
    click: 'logout()'
};
const ChangePassword = {
    text: 'Change Password',
    icon: 'fa-key',
    link: '/secure/myaccount',
};

const Myaccount = {
    text: 'My Account',
    icon: 'fa fa-user',
    level1: [
        ChangePassword,
        Logout
    ]
}
const Schedule = {
    text: 'Project Schedules',
    icon: 'fa fa-indent',
    link: '/secure/schedule'

}
const documets = {
    text: 'Documents',
    icon: 'fa fa-folder-open',
    link: '/secure/documents',
    level1: [
        {
            text: 'Project Folders',
            icon: 'fa fa-folder',
            link: '/secure/documents/folders',
        },
        {
            text: 'Project Documents',
            icon: 'fa fa-file',
            link: '/secure/documents/documents',
        }
    ]
};
const resources = {
    text: 'Resources',
    icon: 'fa fa-users',
    link: '/secure/resources',
    level1: [{
        text: 'Employee',
        icon: 'fa fa-users',
        link: '/secure/resources/employee',
    }, {
        text: 'Plant & Equipment',
        icon: 'fa fa-users',
        link: '/secure/resources/plantequip',
    }, {
        text: 'Material',
        icon: 'fa fa-users',
        link: '/secure/resources/material',
    }, {
        text: 'Fixed Assets',
        icon: 'fa fa-users',
        link: '/secure/resources/fixedasset',
    }]
}
const procurement = {
    text: 'Procurement',
    icon: 'fa fa-shopping-cart',
    link: '/secure/procurement',
    level1: [{
        text: 'Pre_Contracts',
        icon: 'fa fa-users',
        link: '/secure/procurement/precontract',
        level2: [
            {
                text: 'List',
                icon: 'fa fa-users',
                link: '/secure/procurement/precontract',
            }, {
                text: 'Stage1 Request & Approvals',
                icon: 'fa fa-users',
                link: '/secure/procurement/precontract/stg1req',
            }
            , {
                text: 'RFQ',
                icon: 'fa fa-users',
                link: '/secure/procurement/precontract/rfq',
            }
            , {
                text: 'Stage2 Request & Approvals',
                icon: 'fa fa-users',
                link: '/secure/procurement/precontract/stg2req',
            }
        ]
    }, {
        text: 'Purchase Orders',
        icon: 'fa fa-users',
        link: '/secure/procurement/purchaseorder',
    }]
};
const asbuilt = {
    text: 'AsBuilt Records',
    icon: 'fa fa-user-circle',
    link: '/secure/asbuilt',
    level1: [{
        text: 'Attendance Records',
        icon: 'fa fa-users',
        link: '/secure/asbuilt/attendance',
        level2: [
            {
                text: 'Employee Attendance',
                icon: 'fa fa-users',
                link: '/secure/asbuilt/attendance/employee',
            }, {
                text: 'Plant Attendance',
                icon: 'fa fa-users',
                link: '/secure/asbuilt/attendance/plant',
            }
        ]
    },
    {
        text: 'Work Dairy',
        icon: 'fa fa-users',
        link: '/secure/asbuilt/workdairy',
        level2: [
            {
                text: 'Create',
                icon: 'fa fa-users',
                link: '/secure/asbuilt/workdairy/create',
            }, {
                text: 'Approve',
                icon: 'fa fa-users',
                link: '/secure/asbuilt/workdairy/approve',
            }, {
                text: 'Client Approval',
                icon: 'fa fa-users',
                link: '/secure/asbuilt/workdairy/clientapprove',
            }
        ]
    },
    {
        text: 'Time Sheets',
        icon: 'fa fa-users',
        link: '/secure/asbuilt/timesheet',
        level2: [
            {
                text: 'Create',
                icon: 'fa fa-users',
                link: '/secure/asbuilt/timesheet/create',
            }, {
                text: 'Approve',
                icon: 'fa fa-users',
                link: '/secure/asbuilt/timesheet/approve',
            }
        ]
    }]
};
const Dashboards = {
    text: 'Dash Boards',
    icon: 'fa fa-tachometer',
    link: '/secure/dashboards',
}
const Reports = {
    text: 'Reports',
    icon: 'fa fa-file',
    link: '/secure/reports',
}
const ReqApp = {
    text: 'Request & Approvals',
    icon: 'fa fa-file',
    link: '/secure/reqapprove',
    level1: [
        {
            text: 'Requests',
            icon: 'fa fa-file',
            link: '/secure/reqapprove/requests',
            level2: [
                {
                    text: 'Employee Transfer',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/requests/emptrans',
                },
                {
                    text: 'Plant Transfer',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/requests/plantrans',
                },
                {
                    text: 'Material Transfer',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/requests/materialtrans',
                },
                {
                    text: 'Procurement Stage1',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/requests/procurment1',
                },
                {
                    text: 'Procurement Stage2',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/requests/procurment2',
                },
                {
                    text: 'Leave Request',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/requests/leave',
                },
            ]
        },
        {
            text: 'Approvals',
            icon: 'fa fa-file',
            link: '/secure/reqapprove/approvals',
            level2: [
                {
                    text: 'Work Dairy',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/approvals/workdairy',
                },
                {
                    text: 'Time Sheet',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/approvals/timesheet',
                },
                {
                    text: 'Employee Transfer',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/approvals/emptrans',
                },
                {
                    text: 'Plant Transfer',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/approvals/plantrans',
                },
                {
                    text: 'Material Transfer',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/approvals/materialtrans',
                },
                {
                    text: 'Procurement Stage1',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/approvals/procurment1',
                },
                {
                    text: 'Procurement Stage2',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/approvals/procurment2',
                },
                {
                    text: 'Leave Request',
                    icon: 'fa fa-file',
                    link: '/secure/reqapprove/approvals/leave',
                },
            ]
        }

    ]
}
const Notifications = {
    text: 'Notifications',
    icon: 'fa fa-file',
    link: '/secure/notifications',
    level1: [
        {
            text: 'Work Dairy',
            icon: 'fa fa-file',
            link: '/secure/notifications/workdairy',
        },
        {
            text: 'Time Sheet',
            icon: 'fa fa-file',
            link: '/secure/notifications/timesheet',
        },
        {
            text: 'Attendence',
            icon: 'fa fa-file',
            link: '/secure/notifications/attendence',
        },
        {
            text: 'Procurement',
            icon: 'fa fa-file',
            link: '/secure/notifications/procurement',
        },
        {
            text: 'Employee Transfer',
            icon: 'fa fa-file',
            link: '/secure/notifications/emptransfer',
        },
        {
            text: 'Plant Transfer',
            icon: 'fa fa-file',
            link: '/secure/notifications/planttransfer',
        },
        {
            text: 'Material Transfer',
            icon: 'fa fa-file',
            link: '/secure/notifications/materialtransfer',
        }

    ]
}
const Help = {
    text: 'Help & Tutorials',
    icon: 'fa fa-info-circle',
    link: '/help'
}
export const menu = [

    Dashboard,
    Admin,
    Enterprise,
    Projects,
    Schedule,
    documets,
    resources,
    procurement,
    asbuilt,
    Dashboards,
    Reports,
    ReqApp,
    Notifications,
    Myaccount,
    Help

];
