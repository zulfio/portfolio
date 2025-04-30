ADMIN_URL=http://$(shell docker port inventory_alhilal_admin | cut -d' ' -f3 | sed 's/0.0.0.0/localhost/g')

open-admin:
	@open $(ADMIN_URL)

open-mailhog:
	@open http://localhost:8025

start:
	docker compose -f docker-compose.yml up -d --no-recreate

start-new:
	docker compose -f docker-compose.yml up -d --force-recreate --build

stop:
	docker compose stop $(container)

remove:
	docker compose down -v

shell-api:
	docker compose exec -it api sh

shell-admin:
	docker compose exec -it admin_dashboard sh

seed:
	docker-compose exec api sh -c "bun run seed"