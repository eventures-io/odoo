from odoo import http

class ReactController(http.Controller):
    @http.route('/reactbot', auth='public', website=True)
    def react_view(self, **kwargs):
        return http.request.render('react_bot.view')