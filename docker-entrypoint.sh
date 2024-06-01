./wait-for-it.sh db:3312 --timeout=60 --strict -- echo "Database is up"

npm run migration:run
npm run seed:run

exec "$@"
