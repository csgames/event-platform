BASEDIR=$(dirname "$0")
kubectl create configmap gateway-configmap-staging --from-env-file=$BASEDIR/.env