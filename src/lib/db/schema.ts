import { relations } from "drizzle-orm";
import { pgTable, text, bigint, date, integer, varchar, primaryKey, foreignKey, unique } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  google_sub: text("google_sub"),
  avatar_url: text("avatar_url"),
  display_name: text("display_name"),
});

export const userSession = pgTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", { mode: "bigint" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: 'bigint' }).notNull(),
});

export const userKey = pgTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  hashedPassword: text("hashed_password"),
});

export const productType = pgTable("product_type", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
});

export type ProductType = typeof productType.$inferSelect;

export type ProductTypeWithSizes = ProductType & {
  sizes: ProductSize[];
};

export const productTypeRelations = relations(productType, ({ many }) => ({
  sizes: many(productSize),
}));

export const productSize = pgTable("product_size", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  productTypeId: text("product_type_id").references(() => productType.id).notNull(),
});

export type ProductSize = typeof productSize.$inferSelect;

export const productSizeRelations = relations(productSize, ({ one }) => ({
  type: one(productType, { fields: [productSize.productTypeId], references: [productType.id] }),
}));

export const productColor = pgTable("product_color", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  color: text("color").notNull(),
});

export type ProductColor = typeof productColor.$inferSelect;

export const productInStock = pgTable("product_in_stock", {
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  quantity: integer("quantity").notNull(),
  productTypeId: text("product_type_id").references(() => productType.id).notNull(),
  productSizeId: text("product_size_id").references(() => productSize.id).notNull(),
  productColorId: text("product_color_id").references(() => productColor.id).notNull(),
}, (form) => {
  return {
    pk: primaryKey({ columns: [form.productTypeId, form.productSizeId, form.productColorId] })
  }
})

export type ProductInStock = typeof productInStock.$inferSelect;

export const productInStockRelations = relations(productInStock, ({ one }) => ({
  type: one(productType, { fields: [productInStock.productTypeId], references: [productType.id] }),
  size: one(productSize, { fields: [productInStock.productSizeId], references: [productSize.id] }),
  color: one(productColor, { fields: [productInStock.productColorId], references: [productColor.id] }),
}));

export const buy = pgTable("buy", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  description: text("description").notNull(),
  date: date("date").notNull(),
  timeZone: varchar('time_zone').notNull()
});

export const buyRelations = relations(buy, ({ many }) => ({
  registers: many(buyRegister),
  // expenses: many(buyExpense)
}));

export type Buy = typeof buy.$inferSelect;

// export type BuyWithExpenses = Buy & {
//   expenses: BuyExpense[];
// };

// export const buyExpense = pgTable("buy_expense", {
//   buyId: text("buy_id").references(() => buy.id).notNull(),
//   amount: integer("amount").notNull(),
//   description: text("description").notNull()
// });

// export const buyExpenseRelations = relations(buyExpense, ({ one }) => ({
//   buy: one(buy, { fields: [buyExpense.buyId], references: [buy.id] }),
// }));

// export type BuyExpense = typeof buyExpense.$inferSelect;

export const buyRegister = pgTable("buy_register", {
  buyId: text("buy_id").references(() => buy.id).notNull(),
  amount: integer("amount").notNull(),
  quantity: integer("quantity").notNull(),
  productTypeId: text("product_type_id").references(() => productType.id).notNull(),
  productSizeId: text("product_size_id").references(() => productSize.id).notNull(),
  productColorId: text("product_color_id").references(() => productColor.id).notNull(),
}, (form) => {
  return {
    unq: unique().on(form.productTypeId, form.productSizeId, form.productColorId, form.buyId)
  }
});

export const buyRegisterRelations = relations(buyRegister, ({ one }) => ({
  buy: one(buy, { fields: [buyRegister.buyId], references: [buy.id] }),
  type: one(productType, { fields: [buyRegister.productTypeId], references: [productType.id] }),
  size: one(productSize, { fields: [buyRegister.productSizeId], references: [productSize.id] }),
  color: one(productColor, { fields: [buyRegister.productColorId], references: [productColor.id] }),
}));

export type BuyRegister = typeof buyRegister.$inferSelect;

export type BuyRegisterWithProduct = BuyRegister & {
  type: ProductType;
  size: ProductSize;
  color: ProductColor;
};

export const sell = pgTable("sell", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  description: text("description").notNull(),
  date: date("date").notNull(),
  timeZone: varchar('time_zone').notNull()
});

export const sellRelations = relations(sell, ({ many }) => ({
  registers: many(sellRegister)
}));

export type Sell = typeof sell.$inferSelect;

export const sellRegister = pgTable("sell_register", {
  sellId: text("sell_id"),
  amount: integer("amount").notNull(),
  quantity: integer("quantity").notNull(),
  productTypeId: text("product_type_id").references(() => productType.id).notNull(),
  productSizeId: text("product_size_id").references(() => productSize.id).notNull(),
  productColorId: text("product_color_id").references(() => productColor.id).notNull(),
}, (form) => {
  return {
    unq: unique().on(form.productTypeId, form.productSizeId, form.productColorId, form.sellId)
  }
});

export const sellRegisterRelations = relations(sellRegister, ({ one }) => ({
  sell: one(sell, { fields: [sellRegister.sellId], references: [sell.id] }),
  type: one(productType, { fields: [sellRegister.productTypeId], references: [productType.id] }),
  size: one(productSize, { fields: [sellRegister.productSizeId], references: [productSize.id] }),
  color: one(productColor, { fields: [sellRegister.productColorId], references: [productColor.id] }),
}))

export type SellRegister = typeof sellRegister.$inferSelect;

export type SellRegisterWithProduct = SellRegister & {
  type: ProductType;
  size: ProductSize;
  color: ProductColor;
};