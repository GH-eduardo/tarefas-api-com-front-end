import { Schema } from "mongoose"

export interface taskType {
    title: { type: String, required: true},
    description: { type: String, required: true},
    creation_date: { type: Date },
    conclusion_date: { type: Date, default: ''},
    status: { type: String, enum: ['pendente','em andamento','concluída'], required: true},
    author: { type: String, required: true },
}