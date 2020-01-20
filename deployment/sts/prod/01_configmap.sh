BASEDIR=$(dirname "$0")
kubectl create configmap sts-configmap-prod --from-env-file=$BASEDIR/.env