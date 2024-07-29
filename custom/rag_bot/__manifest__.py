# -*- coding: utf-8 -*-
{
    'name': "Rag Bot",

    'summary': """
        Short summary of the module's purpose
    """,

    'description': """
        Long description of the module's purpose
    """,

    'author': "Odoo",
    'website': "https://www.odoo.com/",
    'category': 'Services/RagBot',
    'version': '0.1',
    'application': True,
    'installable': True,
    'depends': ['base', 'web'],

    'data': [
        'views/views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            ('include', 'web._assets_helpers'),
            'web/static/src/scss/pre_variables.scss',
            'web/static/lib/bootstrap/scss/_variables.scss',
            ('include', 'web._assets_bootstrap'),            
            # include base files from framework
            ('include', 'web._assets_core'),

            'web/static/src/core/utils/functions.js',
            'web/static/src/core/browser/browser.js',
            'web/static/src/core/registry.js',
            'web/static/src/core/assets.js',
           
            'rag_bot/static/src/**/*',
        ],
    },
    'license': 'AGPL-3',
}

