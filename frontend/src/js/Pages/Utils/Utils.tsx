/**
 * @description: For all common functions that can be used across the application.
 */
class Utils {
    /**
     * @description: Returns a concatenated string of class names based on the boolean values of the object passed.
     * @param classes: An object with keys as class names and values as boolean.
     * @returns: A concatenated string of class names.
     */
    className(classes: { [key: string]: boolean }): string {
        let classString = "";
        Object.keys(classes).forEach((key) => {
            if (classes[key]) {
                classString += key + " ";
            }
        });
        return classString.trim();
    }
}

export default Utils;