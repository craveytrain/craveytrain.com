# Craveytrain.com blog

This is the software that runs craveytrain.com. It's nothing special, just really a pet project more than anything. Please feel free to dig around, take what ya like, etc. If you have any questions, suggestions, comments, etc, please feel free to use the appropriate mechanisms here on github. Thanks.

# Docker machine

Using docker machine to deploy.

## Steps

If first time running, create the machine. We'll use local dev as an example.

```
docker-machine create --driver virtualbox dev
```

Set your local environment.

```
eval "$(docker-machine env dev)"
```

Build, package, and deploy the containers.

```
make deploy
```
