# IDP_Project
For AWS Deployment:
docker-machine create --driver amazonec2 --amazonec2-region eu-west-2 --amazonec2-open-port 8080 --amazonec2-open-port 3000 --amazonec2-open-port 3306 --amazonec2-open-port 9090 --amazonec2-open-port 2377 --amazonec2-access-key <ACCESS_KEY> --amazonec2-secret-key <SECRET_KEY> my-aws
