bash:
	@docker exec -it isomorphic /bin/bash

build:
	@docker-compose build

run:
	@docker-compose up --build

stop:
	@docker-compose stop

clean:
	@docker-compose down --remove-orphans
