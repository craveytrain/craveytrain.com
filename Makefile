.PHONY: env run deploy

# need a task
default:

# check that docker-machine is selected
env:
ifeq ($(strip $(DOCKER_MACHINE_NAME)),)
	$(error " must run `eval "$$(docker-machine env $$DOCKER_MACHINE_NAME)"` first")
else
	@echo "running on $(DOCKER_MACHINE_NAME)"
endif

# have to rm data otherwise web won't pick up the changes
package: env
	docker-compose rm -f data && docker-compose build data

# if dev, run local version, otherwise run daemonized version
run: env
ifeq ($(strip $(DOCKER_MACHINE_NAME)),dev)
	docker-compose up
else
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
endif

# order matters
deploy: env package run
