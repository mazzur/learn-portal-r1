export function mockService(Service: any) {
  return jasmine.createSpyObj(Service.name, Object.getOwnPropertyNames(Service.prototype));
}
