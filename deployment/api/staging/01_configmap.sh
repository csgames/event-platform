BASEDIR=$(dirname "$0")
kubectl create configmap api-configmap-staging --from-env-file=$BASEDIR/.env