
from odoo import api, SUPERUSER_ID
from openai import OpenAI
import os
from dotenv import load_dotenv
from ..

load_dotenv()


class LLMService:
    
    def __init__(self, env):
        # Store the Odoo environment
        self.env = env
    
    def execute_db_query(self):
        # Access the database cursor from the environment
        cr = self.env.cr
        
        # Define your raw SQL query
        query = """
            SELECT name, email, phone
            FROM res_partner
            WHERE is_company = TRUE
            LIMIT 10;
        """
        
        # Execute the query
        cr.execute(query)
        
        # Fetch the results
        results = cr.fetchall()
        
        # Optionally format the results
        column_headers = ['name', 'email', 'phone']
        data = [dict(zip(column_headers, row)) for row in results]
        
        return data
    
    
    def call_llm(self, message): 
        client = OpenAI()
        client.api_key = os.getenv('OPENAI_API_KEY')

        completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a funny bloke."},
            {"role": "user", "content": message}
        ]
        )
        
        return(completion.choices[0].message)


    def call_sql_agent(self, message):







