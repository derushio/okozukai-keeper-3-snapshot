# /bin/bash -eux

## docker imageのbuildとpush

commit=`git rev-parse --short HEAD`
host=''

docker buildx build --network host --target frontend -t $host/okozukai-keeper-3-frontend:$commit .
docker push $host/okozukai-keeper-3-frontend:$commit

docker buildx build --network host --target backend -t $host/okozukai-keeper-3-backend:$commit .
docker push $host/okozukai-keeper-3-backend:$commit
