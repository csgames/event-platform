#!/bin/bash
BASEDIR=$(dirname "$0")

# Returns env name, convert to lower case (Ex: DB_HOST -> db-host)
function read_env_name {
  IFS='=' read -ra VALUES <<< "$1"
  name=$(echo ${VALUES[0]} | tr '[:upper:]' '[:lower:]')
  echo "${name//\_/-}"
}

function read_env_value {
  IFS='=' read -ra VALUES <<< "$1"
  echo ${VALUES[1]}
}

while IFS= read -r line
do
  # Ignore comments
  [[ $line =~ ^#.* ]] && continue

  # Skip empty line
  [[ -z $line ]] && continue

  name=$(read_env_name $line)
  value=$(read_env_value $line)

  aws ssm put-parameter --name "/event-platform/staging/mail/$name" --value $value --type "SecureString" --overwrite > /dev/null
  echo "Uploaded parameter $name to AWS"
done < "$BASEDIR/.env"