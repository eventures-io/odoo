# -*- coding: utf-8 -*-
import logging
import random

from odoo import http
from odoo.http import request

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')


class ChatController(http.Controller):
    @http.route('/ragbot/chat', type='json', auth='user', methods=['POST'])
    def log_input(self, **kwargs):
        input_text = kwargs.get('input')
        logging.info(f'ChatController input received: {kwargs}, {input_text}');


        return {'status': 'success'}

