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

const getLocation = async (id) => await db.table(LOCATIONS_STORE).get(id);

const getAllLocations = async () => await db.table(LOCATIONS_STORE).toArray();

const getPagedLocations = async (offset=0, count=10) => await db.table(LOCATIONS_STORE).orderBy('id').offset(offset).limit(count).toArray();

export { upsertLocation, deleteLocation, getLocation, getAllLocations, getPagedLocations };
export default db;
