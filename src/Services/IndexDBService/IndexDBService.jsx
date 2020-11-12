import Dexie from 'dexie';

const db = new Dexie('db');
const DB_VERSION = 1;

db.version(DB_VERSION).stores({
    chatRooms: `name`
});

export default db;