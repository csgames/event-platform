BASEDIR=$(dirname "$0")
kubectl create configmap gateway-configmap-prod --from-env-file=$BASEDIR/.env