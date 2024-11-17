from langchain_core.tools import tool

@tool
def list_db_tables(cr) -> list:
        """
        List all tables in the Odoo database.
        
        :return: A list of table names in the 'public' schema of the database.
        """
        query = """
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        """
        cr.execute(query)
        tables = cr.fetchall()
        # Return a list of table names
        return [table[0] for table in tables]


@tool
def get_table_schema(cr, table_name: str) -> list:
        """
        Get the schema of a specific table in the Odoo database.
        
        :param table_name: The name of the table to describe.
        :return: A list of dictionaries containing column names and their data types.
        """
        query = """
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = %s
            ORDER BY ordinal_position;
        """
        cr.execute(query, (table_name,))
        schema = cr.fetchall()
        # Return a list of dictionaries with column names and data types
        return [{'column_name': column[0], 'data_type': column[1]} for column in schema]



@tool
def db_query_tool(cr, query: str) -> str:
        """
        Execute a SQL query against the Odoo database and return the result.
        If the query is incorrect or fails, return an error message.
        
        :param query: The SQL query to execute
        :return: The result of the query or an error message
        """

        try:
            cr.execute(query)
            result = cr.fetchall()
            return result if result else "No results found."
        except Exception as e:
            return f"Error: Query failed - {str(e)}"



def query_check():
        from langchain_core.prompts import ChatPromptTemplate

        query_check_system = """You are a SQL expert with a strong attention to detail.
        Double check the SQLite query for common mistakes, including:
        - Using NOT IN with NULL values
        - Using UNION when UNION ALL should have been used
        - Using BETWEEN for exclusive ranges
        - Data type mismatch in predicates
        - Properly quoting identifiers
        - Using the correct number of arguments for functions
        - Casting to the correct data type
        - Using the proper columns for joins

        If there are any of the above mistakes, rewrite the query. If there are no mistakes, just reproduce the original query.

        You will call the appropriate tool to execute the query after running this check."""

        query_check_prompt = ChatPromptTemplate.from_messages(
            [("system", query_check_system), ("placeholder", "{messages}")]
        )
        query_check = query_check_prompt | ChatOpenAI(model="gpt-4o", temperature=0).bind_tools(
            [db_query_tool], tool_choice="required"
)