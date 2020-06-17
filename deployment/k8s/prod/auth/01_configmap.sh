BASEDIR=$(dirname "$0")
kubectl create configmap auth-configmap-prod --from-env-file=$BASEDIR/.env