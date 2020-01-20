BASEDIR=$(dirname "$0")
kubectl create configmap mail-configmap-staging --from-env-file=$BASEDIR/.env