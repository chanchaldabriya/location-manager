/* Implementation for using IndexedDB to store locations - using Dexie which is a wrapper for IndexedDB */
import Dexie from "dexie";

const DB_NAME = "LocationManager",
  DB_VERSION = 1,
  LOCATIONS_STORE = "locations";

const db = new Dexie(DB_NAME);
db.version(DB_VERSION).stores({
  //   locations: `name, address1, address2, suite_no, city, state, zipcode, phone, timezone, facility_times, appointment_pool`
  [LOCATIONS_STORE]: "++id",
});

const upsertLocation = async (locationObj) => await db[LOCATIONS_STORE].put(locationObj);

const deleteLocation = async (id) => await db[LOCATIONS_STORE].delete(id);

const getLocation = async (id) => await db[LOCATIONS_STORE].get('id').equals(id);

const getAllLocations = async () => await db[LOCATIONS_STORE].toArray();

export { upsertLocation, deleteLocation, getLocation, getAllLocations };
export default db;
