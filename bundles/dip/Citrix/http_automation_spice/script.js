    async function approveDenyRequisition(sync) {
        console.log('Service action run');
    
    }
    function fullSync(sync) {
        console.log('Service action run');
        const sampleDataInvoice = {
            invoice_id: 3,
            customer_id: 4,
            invoice_num: "4",
            invoice_date: null,
            payment_status: true
        }


        const sampleDataCustomer = {
            customer_id: 343,
            company_name: 'sample name',
            contact_first_name: 'Petr',
            contact_last_naem: 'Tomas',
            phone_number: '54543',
            address_line_1: 'Ryba',
            email: 'fdfs@fdfs.com',
            city: 'Prague',
            postalcode: '432432',
            country: 'Country',
            selfie: 'YES',
            last_modified: null,
        };
        sync.dataStore.save('customer', sampleDataCustomer);
        sync.dataStore.save('invoice', sampleDataInvoice);

    }

    function incrSync(sync) {
        console.log('Service action run');
    }

    integration.define({
        synchronizations: [
            {
                name: 'SyncChanges',
                fullSyncFunction: fullSync,
                incrementalSyncFunction: incrSync,
            },
        ],
        actions: [
            {
                name: 'Invoice Paid',
                parameters: [
                    {
                        name: 'Invoice ID',
                        type: 'LONG',
                        required: false,
                    }
                ],
                function: approveDenyRequisition,
            },
        ],

        'model': {
            "tables": [
                {
                    name: 'customer',
                    columns: [
                        {
                            name: 'customer_id',
                            type: 'LONG',
                            primaryKey: true,
                        },
                        {
                            name: 'company_name',
                            type: 'STRING',
                            length: 32,
                            primaryKey: false,
                        },
                        {
                            name: 'contact_first_name',
                            type: 'STRING',
                            length: 32,
                            primaryKey: false,
                        },
                        {
                            name: 'contact_last_name',
                            type: 'STRING',
                            length: 32,
                            primaryKey: false,
                        },
                        {
                            name: 'phone_number',
                            type: 'STRING',
                            length: 32,
                            primaryKey: false,
                        },
                        {
                            name: 'address_line_1',
                            type: 'STRING',
                            length: 32,
                            primaryKey: false,
                        },
                        {
                            name: 'email',
                            type: 'STRING',
                            length: 32,
                            primaryKey: false,
                        },
                        {
                            name: 'city',
                            type: 'STRING',
                            length: 32,
                            primaryKey: false,
                        },
                        {
                            name: 'zip',
                            type: 'STRING',
                            length: 32,
                            primaryKey: false,
                        },
                        {
                            name: 'postalcode',
                            type: 'STRING',
                            length: 32,
                            primaryKey: false,
                        },
                        {
                            name: 'country',
                            type: 'STRING',
                            length: 32,
                            primaryKey: false,
                        },
                        {
                            name: 'selfie',
                            type: 'STRING',
                            length: 32,
                            primaryKey: false,
                        },
                    ],
                },
                {
                    name: 'invoice',
                    columns: [
                        {
                            name: 'invoice_id',
                            type: 'LONG',
                            primaryKey: true,
                        },
                        {
                            name: 'customer_id',
                            type: 'LONG',
                            primaryKey: false,
                        },
                        {
                            name: 'invoice_num',
                            type: 'STRING',
                            length: 32,
                            primaryKey: false,
                        },
                        {
                            name: 'invoice_date',
                            type: 'DATE',
                            primaryKey: false,
                        },
                        {
                            name: 'payment_status',
                            type: 'BOOLEAN',
                            primaryKey: false,
                        },
                    ],
                },
                {
                    name: 'invoice_line_item',
                    columns: [
                        {
                            name: 'item_id',
                            type: 'LONG',
                            primaryKey: true,
                        },
                        {
                            name: 'invoice_id',
                            type: 'LONG',
                            primaryKey: false,
                        },
                        {
                            name: 'invoice_item_number',
                            type: 'LONG',
                            primaryKey: false,
                        },
                        {
                            name: 'product_id',
                            type: 'LONG',
                            primaryKey: false,
                        },
                        {
                            name: 'quantity',
                            type: 'BOOLEAN',
                            primaryKey: false,
                        },
                        {
                            name: 'cost',
                            type: 'DOUBLE',
                            primaryKey: false,
                        },
                        {
                            name: 'discount',
                            type: 'DOUBLE',
                            primaryKey: false,
                        },
                    ],
                },
                {
                    name: 'product',
                    columns: [
                        {
                            name: 'product_id',
                            type: 'LONG',
                            primaryKey: true,
                        },
                        {
                            name: 'name',
                            type: 'STRING',
                            primaryKey: false,
                        },
                        {
                            name: 'description',
                            type: 'STRING',
                            primaryKey: false,
                        },
                        {
                            name: 'cost',
                            type: 'DOUBLE',
                            primaryKey: false,
                        },
                    ],
                },
                {
                    name: 'stocks',
                    columns: [
                        {
                            name: 'stock_id',
                            type: 'LONG',
                            primaryKey: true,
                        },
                        {
                            name: 'product_id',
                            type: 'LONG',
                            primaryKey: false,
                        },
                        {
                            name: 'warehouse_id',
                            type: 'INTEGER',
                            primaryKey: false,
                        },
                        {
                            name: 'quantity',
                            type: 'LONG',
                            primaryKey: false,
                        },
                    ],
                },
                {
                    name: 'timezone_check',
                    columns: [
                        {
                            name: 'id',
                            type: 'LONG',
                            primaryKey: true,
                        },
                        {
                            name: 'birthdate',
                            type: 'DATE',
                            primaryKey: false,
                        },
                        {
                            name: 'updated',
                            type: 'DATETIME',
                            primaryKey: false,
                        },
                        {
                            name: 'created',
                            type: 'DATETIME',
                            primaryKey: false,
                        },
                        {
                            name: 'lunchtime',
                            type: 'DATETIME',
                            primaryKey: false,
                        },
                        {
                            name: 'info',
                            type: 'STRING',
                            primaryKey: false,
                        },
                    ],
                },
                {
                    name: 'warehouses',
                    columns: [
                        {
                            name: 'warehouse_id',
                            type: 'INTEGER',
                            primaryKey: true,
                        },
                        {
                            name: 'title',
                            type: 'STRING',
                            primaryKey: false,
                        },
                        {
                            name: 'location',
                            type: 'STRING',
                            primaryKey: false,
                        },
                        {
                            name: 'note',
                            type: 'STRING',
                            primaryKey: false,
                        },
                    ],
                },
            ],
            "relationships": [
                {
                    "name": 'invoice_customer_id',
                    "primaryTable": 'customer',
                    "foreignTable": 'invoice',
                    "columnPairs": [
                        {
                            "primaryKey": "customer_id",
                            "foreignKey": "customer_id",
                        },
                    ],
                },
                {
                    "name": 'invoice_line_invoice_id',
                    "primaryTable": 'invoice',
                    "foreignTable": 'invoice_line_item',
                    "columnPairs": [
                        {
                            "primaryKey": 'invoice_id',
                            "foreignKey": 'invoice_id',
                        },
                    ],
                },
                {
                    "name": 'invoice_line_product_id',
                    "primaryTable": 'product',
                    "foreignTable": 'invoice_line_item',
                    "columnPairs": [
                        {
                            "primaryKey": 'product_id',
                            "foreignKey": 'product_id',
                        },
                    ],
                },
                {
                    "name": 'stocks_product_id',
                    "primaryTable": 'product',
                    "foreignTable": 'stocks',
                    "columnPairs": [
                        {
                            "primaryKey": 'product_id',
                            "foreignKey": 'product_id',
                        },
                    ],
                },
                {
                    "name": 'stocks_warehouse_id',
                    "primaryTable": 'warehouses',
                    "foreignTable": 'stocks',
                    "columnPairs": [
                        {
                            "primaryKey": 'warehouse_id',
                            "foreignKey": 'warehouse_id',
                        },
                    ],
                },
            ],
        },
    });
