export default function getCommand(
  projectName: string,
  gitURL: string,
  branch: string
): string {
  return `
    set -x
    mkdir -p log
    log=./log/${projectName}-$(date "+%Y%m%d-%H%M%S").log
    exec 1> $log
    exec 2> $log
    git clone ${gitURL} -b ${branch} ./repo/${projectName}
    cd ./repo/${projectName}
    docker-compose down
    docker-compose up -d --build`
}
