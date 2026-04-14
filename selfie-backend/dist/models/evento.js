"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RecurrenceSchema = new mongoose_1.default.Schema({
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'custom'], required: false },
    daysOfWeek: [String],
    repeatUntil: Date,
    repeatCount: Number
}, { _id: false });
const EventoSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Utente", required: true },
    title: { type: String, required: true },
    location: { type: String },
    start: { type: Date, required: true },
    end: { type: Date },
    durationMinutes: { type: Number, default: 60 },
    allDay: { type: Boolean, default: false },
    isRecurring: { type: Boolean, default: false },
    recurrence: {
        type: RecurrenceSchema,
        required: function () {
            return this.isRecurring;
        },
        default: undefined
    },
    recurrenceId: { type: String, default: null },
    isCancelled: { type: Boolean, default: false },
    overridesOriginalId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Evento", default: null }
});
exports.default = mongoose_1.default.model("Evento", EventoSchema);
