# IDP_Project
For AWS Deployment:

1. Create machines using amazonec2 driver:
    docker-machine create --driver amazonec2 --amazonec2-region eu-central-1 --amazonec2-open-port 8080 --amazonec2-open-port 3000 --amazonec2-open-port 3306 --amazonec2-open-port 9090 --amazonec2-open-port 3500 --amazonec2-open-port 2377 --amazonec2-open-port 7946 --amazonec2-open-port 4789 --amazonec2-access-key <ACCESS_KEY> --amazonec2-secret-key <SECRET_KEY> my-aws

2. Copy db_init, docker-compose.yml and prometheus.yml to manager nodes:
    docker-machine scp docker-compose <manager_name>:.

3. Copy prometheus.yml to all worker nodes:
    docker-machine scp prometheus.yml <worker_name>:.

4. Create a swarm on manager and join from worker nodes:
    sudo docker swarm init
    sudo docker swarm join...

5. Run stack deploy on manager node:
    sudo docker stack deploy -c docker-compose.yml <stack_name>

6. You can check progress with:
    sudo docker stack ps <stack_name>
    sudo docker service ls

7. Use any machine's public IP and specific ports to access services.

8. ???

9. Profit!


For removal of stack and swarm:

1. Remove the stack from manager node:
    sudo docker stack rm <stack_name>

2. Remove workers from swarm:
    sudo docker swarm leave

3. Remove managers from swarm:
    sudo docker swarm leave --force

4. Done!