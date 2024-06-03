import { Schema } from "mongoose"

export interface taskType {
    title: { type: String, required: true},
    description: { type: String, required: true},
    creation_date: { type: Date, default: Date.now},
    conclusion_date: { type: Date},
    status: { type: String, enum: ['pendente','em andamento','concluída'], required: true},
    author: { type: String, required: true },
}