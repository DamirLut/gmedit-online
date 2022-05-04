///@ts-nocheck
export default class VirtualProject {
  constructor() {
    this.project = new $gmedit['gml.Project']('', false);
    this.project.isVirtual = true;

    $gmedit['gml.Project'].current = this.project;
  }
}
