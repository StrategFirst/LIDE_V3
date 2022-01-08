global: build-user buildNrun

run:
	docker-compose up -d
buildNrun:
	docker-compose up -d --build



log-back:
	docker container logs lide-back
log-wss:
	docker container logs lide-wss
log-web:
	docker container logs lide-web


build-user:
	cd lide-back/images/ && ./build_images.sh
build-app:
	docker-compose --build

build-full: build-user build-app


stop:
	docker container stop $$(docker container ls --format "{{.Names}}" | grep lide-user- | tr "\n" " ") 2> /dev/null; docker-compose down



clean-containers:
	docker container rm -f lide-back lide-wss lide-web lide-database $$(docker container ls --format "{{.Names}}" | grep lide-user- | tr "\n" " ")
clean-images:
	docker image rm -f $$(docker images --format "{{.Repository}}" | grep lide | tr "\n" " ")
clean-database:
	docker volume rm -f $$(docker volume ls --format "{{.Name}}" | grep lide | tr "\n" " ")

clean-full: clean-containers clean-images clean-database


purge: clean-full
