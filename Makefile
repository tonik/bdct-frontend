ifneq (,$(wildcard ./.env))
    include .env
    export
endif

## ====================
## LOCAL DEPLOYMENT
## ====================

VERSION?= $(shell git rev-parse --short HEAD)
GIT_BRANCH?= $(shell git rev-parse --abbrev-ref HEAD)

ci:
	make test publish_pacts can_i_deploy $(DEPLOY_TARGET)

## ====================
## CI DEPLOYMENT
## ====================

publish_pacts:
	@echo "========== STAGE: publish pacts =========="
	docker-compose run publish_pacts

test:
	@echo "========== STAGE: test 🧪 =========="
	yarn run test

can_i_deploy:
	@echo "========== STAGE: can-i-deploy? =========="
	docker-compose run can_i_deploy

deploy:
	@echo "========== STAGE: deploy =========="
	@echo "Deploying to production"

record_deployment:
	docker-compose run record_deployment
