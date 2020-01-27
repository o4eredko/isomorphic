bash:
	@docker exec -it isomorphic /bin/bash

run:
	@docker-compose up --build

stop:
	@docker-compose stop

clean:
	@docker-compose down --remove-orphans
