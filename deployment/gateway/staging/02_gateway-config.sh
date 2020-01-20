BASEDIR=$(dirname "$0")
kubectl create secret generic proxy-config-staging --from-file=proxy-config.json=$BASEDIR/proxy-config.json