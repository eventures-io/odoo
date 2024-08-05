from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

def sendMessage(message): 
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



