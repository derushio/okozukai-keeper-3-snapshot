# /bin/bash -eux

## k8sのimageのupdate

commit=`git rev-parse --short HEAD`
kubectl set image deployment/okozukai-keeper-3-frontend okozukai-keeper-3-frontend=localhost:32000/okozukai-keeper-3-frontend:${commit} --namespace=home
kubectl set image deployment/okozukai-keeper-3-backend okozukai-keeper-3-backend=localhost:32000/okozukai-keeper-3-backend:${commit} --namespace=home
kubectl set image cronjob/okozukai-keeper-3-batch okozukai-keeper-3-batch=localhost:32000/okozukai-keeper-3-backend:${commit} --namespace=home
