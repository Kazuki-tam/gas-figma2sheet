/**
 * Gets a property store that all users can access, but only within this script.
 * @param {string} propertyName The Properties service
 * @return The property value or false if not defined
 * https://developers.google.com/apps-script/reference/properties/properties-service
 */

function getPropertiesService(propertyName: string) {
  const propertyValue: string | null =
    PropertiesService.getScriptProperties().getProperty(propertyName);
  if (!propertyValue) {
    return false;
  }
  return propertyValue;
}

export { getPropertiesService };
