BASEDIR=$(dirname "$0")
kubectl create configmap mail-configmap-prod --from-env-file=$BASEDIR/.env