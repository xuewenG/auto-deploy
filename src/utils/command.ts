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
    cd ./repo
    rm -rf ${projectName}
    git clone ${gitURL} -b ${branch} ${projectName}
    cd ${projectName}
    docker-compose down
    docker-compose up -d --build`
}
