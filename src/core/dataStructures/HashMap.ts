/**
 * An extension of ES6's Map with additional methods and JSON serialization.
 */
export class HashMap<K extends string | number | symbol, T> extends Map<K, T | T[]> {
    /**
     * Append a value to the map.
     * If the value already exists a list will be created to hold the values.
     *
     * @param key
     * @param value
     */
    public append(key: K, value: T | T[]): void {
        const appendValue = Array.isArray(value) ? value : [value];

        if (this.has(key)) {
            const storedValue = this.get(key);

            if (Array.isArray(storedValue)) {
                this.set(key, [...appendValue, ...storedValue]);
            } else {
                this.set(key, [...appendValue, storedValue as T]);
            }
        } else {
            this.set(key, value);
        }
    }

    /**
     * Serialize AppendableMap to a JSON object.
     */
    public toJSON<U = T>(): Record<K, U | U[]> {
        const json = Object.create(null);
        this.forEach((value, key) => {
            if (value instanceof HashMap) {
                json[key] = value.toJSON();
            } else {
                json[key] = value;
            }
        });
        return json;
    }
}
