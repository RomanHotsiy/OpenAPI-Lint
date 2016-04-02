import sway from 'sway';

export default class SwayChecker {
  check(specUrl) {
    return sway.create({definition: specUrl})
    .then((swaggerObj) => {
      let validationResult = swaggerObj.validate();
      return [].concat(validationResult.errors, validationResult.warnings);
    });
  }
}
