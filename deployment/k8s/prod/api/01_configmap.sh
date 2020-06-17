BASEDIR=$(dirname "$0")
kubectl create configmap api-configmap-prod --from-env-file=$BASEDIR/.env