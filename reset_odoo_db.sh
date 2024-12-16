#!/bin/bash

# Variables (replace these with your actual values)
PGUSER="odoo_pg"
PGPASSWORD="odoo_pg"
DBNAME="odoo"
DBUSER="odoo_user"
DBUSERPASSWORD="your_password"

# Export PGUSER and PGPASSWORD for psql commands
export PGUSER PGPASSWORD

# Function to execute a SQL command as the PostgreSQL superuser
execute_sql() {
  psql -U $PGUSER -d postgres -c "$1"
}

# Drop the database and user if they exist
echo "Dropping existing database and user if they exist..."
execute_sql "REVOKE CONNECT ON DATABASE $DBNAME FROM public;"
execute_sql "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$DBNAME' AND pid <> pg_backend_pid();"
execute_sql "DROP DATABASE IF EXISTS $DBNAME;"
execute_sql "DROP USER IF EXISTS $DBUSER;"

# Create the new user
echo "Creating new user..."
execute_sql "CREATE USER $DBUSER WITH PASSWORD '$DBUSERPASSWORD';"

# Create the new database
echo "Creating new database..."
execute_sql "CREATE DATABASE $DBNAME;"

# Grant privileges
echo "Granting privileges..."
execute_sql "GRANT CONNECT ON DATABASE $DBNAME TO $DBUSER;"
execute_sql "GRANT CREATE ON DATABASE $DBNAME TO $DBUSER;"
execute_sql "GRANT TEMP ON DATABASE $DBNAME TO $DBUSER;"

# Switch to the new database context and grant further privileges
echo "Granting additional privileges within the database..."
psql -U $PGUSER -d $DBNAME <<EOF
GRANT ALL PRIVILEGES ON SCHEMA public TO $DBUSER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DBUSER;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DBUSER;
EOF

echo "Database and user setup completed."