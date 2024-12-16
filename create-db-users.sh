#!/bin/bash

# Define roles and passwords
SUPERUSER="odoo_pg"
SUPERUSER_PASSWORD="odoo_pg"
USER="odoo"
USER_PASSWORD="odoo"

# Function to execute SQL commands
execute_sql() {
  local sql="$1"
  psql -U postgres -d postgres -c "$sql"
}

# Check if the superuser exists
echo "Checking if superuser $SUPERUSER exists..."
if ! execute_sql "\du" | grep -qw "$SUPERUSER"; then
  echo "Creating superuser $SUPERUSER..."
  execute_sql "CREATE ROLE $SUPERUSER WITH SUPERUSER LOGIN PASSWORD '$SUPERUSER_PASSWORD';"
else
  echo "Superuser $SUPERUSER already exists."
fi

# Check if the regular user exists
echo "Checking if user $USER exists..."
if ! execute_sql "\du" | grep -qw "$USER"; then
  echo "Creating user $USER..."
  execute_sql "CREATE ROLE $USER WITH LOGIN PASSWORD '$USER_PASSWORD';"
else
  echo "User $USER already exists."
fi

# Grant privileges to the user on the public schema
echo "Granting privileges on schema public to $USER..."
execute_sql "GRANT ALL ON SCHEMA public TO $USER;"

echo "Db users creation complete."