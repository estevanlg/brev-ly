import { uuidv7 } from 'uuidv7'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	originalUrl: text('original_url').notNull(),
	shortenedUrl: text('shortened_url').notNull().unique(),
	visitorCounter: integer('visitor_counter').notNull().default(0),
	createdAt: timestamp('created_at').defaultNow().notNull(),
})
