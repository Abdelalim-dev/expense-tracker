import { z } from "zod"

export const ZodExpenseSchema = z.object({
    amount: z.number().gt(0, "Set an amount"),
    subcategory: z.string().min(1, "Select a subcategory"),
    wallet: z.string().min(1, "Select a wallet"),
    description: z.string().optional(),
    date: z.number().optional(),
})

export type ExpenseProps = z.infer<typeof ZodExpenseSchema>