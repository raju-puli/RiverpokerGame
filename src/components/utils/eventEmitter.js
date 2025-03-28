// import EventEmitter from "events";
// export const Emitter = new EventEmitter();
import { EventEmitter } from 'events';
const eventBus = new EventEmitter();
const activeTables = new EventEmitter();
const closeTourneyEmit = new EventEmitter();
const Close_profile = new EventEmitter();
const leave_table_emit = new EventEmitter();
export default (eventBus, activeTables, closeTourneyEmit, Close_profile, leave_table_emit);