task :openDashboard do
    system("start http://localhost:3000")
end

task :openMailhog do
    system("start http://localhost:8025")
end

task :start do
    system("docker compose -f docker-compose.yml up -d --no-recreate")
end

task :startNew do
    system("docker compose -f docker-compose.yml up -d --force-recreate --build")
end

task :stop do
    system("docker compose stop")
end

task :remove do
    system("docker compose down -v")
end

task :shellApi do
    system("docker compose exec -it api sh")
end

task :shellAdmin do
    system("docker compose exec -it admin_dashboard sh")
end

task :seed do
    system("docker-compose exec api sh -c 'bun run seed'")
end