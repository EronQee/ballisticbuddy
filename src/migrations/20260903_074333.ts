import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_trust_band_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_trust_band_items_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_vehicle_diagram_callouts_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_trust_band_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_trust_band_items_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_vehicle_diagram_callouts_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"title" varchar,
  	"intro" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_tiers_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_tiers_details_locales" (
  	"detail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_tiers_locales" (
  	"name" varchar,
  	"description" varchar,
  	"price_range" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_locales" (
  	"title" varchar,
  	"intro" jsonb,
  	"disclaimer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_spec_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_spec_table_columns_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_spec_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_spec_table_rows_cells_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_spec_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_spec_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spec_table_locales" (
  	"title" varchar,
  	"intro" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stat_band_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stat_band_stats_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stat_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stat_band_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_trust_band_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"link_type" "enum_pages_blocks_trust_band_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_trust_band_items_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_trust_band_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_trust_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_band_locales" (
  	"title" varchar,
  	"intro" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vehicle_diagram_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"x" numeric,
  	"y" numeric,
  	"link_type" "enum_pages_blocks_vehicle_diagram_callouts_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_vehicle_diagram_callouts_locales" (
  	"label" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vehicle_diagram" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"diagram_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_vehicle_diagram_locales" (
  	"title" varchar,
  	"intro" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_locales" (
  	"title" varchar,
  	"intro" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_tiers_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_tiers_details_locales" (
  	"detail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_tiers_locales" (
  	"name" varchar,
  	"description" varchar,
  	"price_range" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_locales" (
  	"title" varchar,
  	"intro" jsonb,
  	"disclaimer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_spec_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spec_table_columns_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_spec_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spec_table_rows_cells_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_spec_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spec_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spec_table_locales" (
  	"title" varchar,
  	"intro" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stat_band_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stat_band_stats_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stat_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stat_band_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_trust_band_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"link_type" "enum__pages_v_blocks_trust_band_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_trust_band_items_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_band_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_trust_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_band_locales" (
  	"title" varchar,
  	"intro" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_vehicle_diagram_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"x" numeric,
  	"y" numeric,
  	"link_type" "enum__pages_v_blocks_vehicle_diagram_callouts_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vehicle_diagram_callouts_locales" (
  	"label" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_vehicle_diagram" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"diagram_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vehicle_diagram_locales" (
  	"title" varchar,
  	"intro" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages" ADD COLUMN "path" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_path" varchar;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_tiers_details" ADD CONSTRAINT "pages_blocks_pricing_tiers_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_tiers_details_locales" ADD CONSTRAINT "pages_blocks_pricing_tiers_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_tiers_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_tiers" ADD CONSTRAINT "pages_blocks_pricing_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_tiers_locales" ADD CONSTRAINT "pages_blocks_pricing_tiers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_locales" ADD CONSTRAINT "pages_blocks_pricing_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spec_table_columns" ADD CONSTRAINT "pages_blocks_spec_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_spec_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spec_table_columns_locales" ADD CONSTRAINT "pages_blocks_spec_table_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_spec_table_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spec_table_rows_cells" ADD CONSTRAINT "pages_blocks_spec_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_spec_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spec_table_rows_cells_locales" ADD CONSTRAINT "pages_blocks_spec_table_rows_cells_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_spec_table_rows_cells"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spec_table_rows" ADD CONSTRAINT "pages_blocks_spec_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_spec_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spec_table" ADD CONSTRAINT "pages_blocks_spec_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spec_table_locales" ADD CONSTRAINT "pages_blocks_spec_table_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_spec_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_band_stats" ADD CONSTRAINT "pages_blocks_stat_band_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stat_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_band_stats_locales" ADD CONSTRAINT "pages_blocks_stat_band_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stat_band_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_band" ADD CONSTRAINT "pages_blocks_stat_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_band_locales" ADD CONSTRAINT "pages_blocks_stat_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stat_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_band_items" ADD CONSTRAINT "pages_blocks_trust_band_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_band_items" ADD CONSTRAINT "pages_blocks_trust_band_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_band_items_locales" ADD CONSTRAINT "pages_blocks_trust_band_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_band_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_band" ADD CONSTRAINT "pages_blocks_trust_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_band_locales" ADD CONSTRAINT "pages_blocks_trust_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vehicle_diagram_callouts" ADD CONSTRAINT "pages_blocks_vehicle_diagram_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vehicle_diagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vehicle_diagram_callouts_locales" ADD CONSTRAINT "pages_blocks_vehicle_diagram_callouts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vehicle_diagram_callouts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vehicle_diagram" ADD CONSTRAINT "pages_blocks_vehicle_diagram_diagram_id_media_id_fk" FOREIGN KEY ("diagram_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_vehicle_diagram" ADD CONSTRAINT "pages_blocks_vehicle_diagram_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vehicle_diagram_locales" ADD CONSTRAINT "pages_blocks_vehicle_diagram_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vehicle_diagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_tiers_details" ADD CONSTRAINT "_pages_v_blocks_pricing_tiers_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_tiers_details_locales" ADD CONSTRAINT "_pages_v_blocks_pricing_tiers_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_tiers_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_tiers" ADD CONSTRAINT "_pages_v_blocks_pricing_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_tiers_locales" ADD CONSTRAINT "_pages_v_blocks_pricing_tiers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing" ADD CONSTRAINT "_pages_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_locales" ADD CONSTRAINT "_pages_v_blocks_pricing_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spec_table_columns" ADD CONSTRAINT "_pages_v_blocks_spec_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_spec_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spec_table_columns_locales" ADD CONSTRAINT "_pages_v_blocks_spec_table_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_spec_table_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spec_table_rows_cells" ADD CONSTRAINT "_pages_v_blocks_spec_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_spec_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spec_table_rows_cells_locales" ADD CONSTRAINT "_pages_v_blocks_spec_table_rows_cells_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_spec_table_rows_cells"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spec_table_rows" ADD CONSTRAINT "_pages_v_blocks_spec_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_spec_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spec_table" ADD CONSTRAINT "_pages_v_blocks_spec_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spec_table_locales" ADD CONSTRAINT "_pages_v_blocks_spec_table_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_spec_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stat_band_stats" ADD CONSTRAINT "_pages_v_blocks_stat_band_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stat_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stat_band_stats_locales" ADD CONSTRAINT "_pages_v_blocks_stat_band_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stat_band_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stat_band" ADD CONSTRAINT "_pages_v_blocks_stat_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stat_band_locales" ADD CONSTRAINT "_pages_v_blocks_stat_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stat_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_band_items" ADD CONSTRAINT "_pages_v_blocks_trust_band_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_band_items" ADD CONSTRAINT "_pages_v_blocks_trust_band_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_band_items_locales" ADD CONSTRAINT "_pages_v_blocks_trust_band_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_band_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_band" ADD CONSTRAINT "_pages_v_blocks_trust_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_band_locales" ADD CONSTRAINT "_pages_v_blocks_trust_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vehicle_diagram_callouts" ADD CONSTRAINT "_pages_v_blocks_vehicle_diagram_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vehicle_diagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vehicle_diagram_callouts_locales" ADD CONSTRAINT "_pages_v_blocks_vehicle_diagram_callouts_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vehicle_diagram_callouts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vehicle_diagram" ADD CONSTRAINT "_pages_v_blocks_vehicle_diagram_diagram_id_media_id_fk" FOREIGN KEY ("diagram_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vehicle_diagram" ADD CONSTRAINT "_pages_v_blocks_vehicle_diagram_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vehicle_diagram_locales" ADD CONSTRAINT "_pages_v_blocks_vehicle_diagram_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vehicle_diagram"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_tiers_details_order_idx" ON "pages_blocks_pricing_tiers_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_tiers_details_parent_id_idx" ON "pages_blocks_pricing_tiers_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_tiers_details_locales_locale_parent_id_" ON "pages_blocks_pricing_tiers_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_tiers_order_idx" ON "pages_blocks_pricing_tiers" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_tiers_parent_id_idx" ON "pages_blocks_pricing_tiers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_tiers_locales_locale_parent_id_unique" ON "pages_blocks_pricing_tiers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_pricing_locales_locale_parent_id_unique" ON "pages_blocks_pricing_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_spec_table_columns_order_idx" ON "pages_blocks_spec_table_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_spec_table_columns_parent_id_idx" ON "pages_blocks_spec_table_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_spec_table_columns_locales_locale_parent_id_uni" ON "pages_blocks_spec_table_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_spec_table_rows_cells_order_idx" ON "pages_blocks_spec_table_rows_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_spec_table_rows_cells_parent_id_idx" ON "pages_blocks_spec_table_rows_cells" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_spec_table_rows_cells_locales_locale_parent_id_" ON "pages_blocks_spec_table_rows_cells_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_spec_table_rows_order_idx" ON "pages_blocks_spec_table_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_spec_table_rows_parent_id_idx" ON "pages_blocks_spec_table_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spec_table_order_idx" ON "pages_blocks_spec_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_spec_table_parent_id_idx" ON "pages_blocks_spec_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spec_table_path_idx" ON "pages_blocks_spec_table" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_spec_table_locales_locale_parent_id_unique" ON "pages_blocks_spec_table_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stat_band_stats_order_idx" ON "pages_blocks_stat_band_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stat_band_stats_parent_id_idx" ON "pages_blocks_stat_band_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_stat_band_stats_locales_locale_parent_id_unique" ON "pages_blocks_stat_band_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stat_band_order_idx" ON "pages_blocks_stat_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_stat_band_parent_id_idx" ON "pages_blocks_stat_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stat_band_path_idx" ON "pages_blocks_stat_band" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_stat_band_locales_locale_parent_id_unique" ON "pages_blocks_stat_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_trust_band_items_order_idx" ON "pages_blocks_trust_band_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_band_items_parent_id_idx" ON "pages_blocks_trust_band_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_band_items_media_idx" ON "pages_blocks_trust_band_items" USING btree ("media_id");
  CREATE UNIQUE INDEX "pages_blocks_trust_band_items_locales_locale_parent_id_uniqu" ON "pages_blocks_trust_band_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_trust_band_order_idx" ON "pages_blocks_trust_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_band_parent_id_idx" ON "pages_blocks_trust_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_band_path_idx" ON "pages_blocks_trust_band" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_trust_band_locales_locale_parent_id_unique" ON "pages_blocks_trust_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_vehicle_diagram_callouts_order_idx" ON "pages_blocks_vehicle_diagram_callouts" USING btree ("_order");
  CREATE INDEX "pages_blocks_vehicle_diagram_callouts_parent_id_idx" ON "pages_blocks_vehicle_diagram_callouts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_vehicle_diagram_callouts_locales_locale_parent_" ON "pages_blocks_vehicle_diagram_callouts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_vehicle_diagram_order_idx" ON "pages_blocks_vehicle_diagram" USING btree ("_order");
  CREATE INDEX "pages_blocks_vehicle_diagram_parent_id_idx" ON "pages_blocks_vehicle_diagram" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vehicle_diagram_path_idx" ON "pages_blocks_vehicle_diagram" USING btree ("_path");
  CREATE INDEX "pages_blocks_vehicle_diagram_diagram_idx" ON "pages_blocks_vehicle_diagram" USING btree ("diagram_id");
  CREATE UNIQUE INDEX "pages_blocks_vehicle_diagram_locales_locale_parent_id_unique" ON "pages_blocks_vehicle_diagram_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_tiers_details_order_idx" ON "_pages_v_blocks_pricing_tiers_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_tiers_details_parent_id_idx" ON "_pages_v_blocks_pricing_tiers_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pricing_tiers_details_locales_locale_parent_" ON "_pages_v_blocks_pricing_tiers_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_tiers_order_idx" ON "_pages_v_blocks_pricing_tiers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_tiers_parent_id_idx" ON "_pages_v_blocks_pricing_tiers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pricing_tiers_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_pricing_tiers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_order_idx" ON "_pages_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_parent_id_idx" ON "_pages_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_path_idx" ON "_pages_v_blocks_pricing" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_pricing_locales_locale_parent_id_unique" ON "_pages_v_blocks_pricing_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_spec_table_columns_order_idx" ON "_pages_v_blocks_spec_table_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spec_table_columns_parent_id_idx" ON "_pages_v_blocks_spec_table_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_spec_table_columns_locales_locale_parent_id_" ON "_pages_v_blocks_spec_table_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_spec_table_rows_cells_order_idx" ON "_pages_v_blocks_spec_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spec_table_rows_cells_parent_id_idx" ON "_pages_v_blocks_spec_table_rows_cells" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_spec_table_rows_cells_locales_locale_parent_" ON "_pages_v_blocks_spec_table_rows_cells_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_spec_table_rows_order_idx" ON "_pages_v_blocks_spec_table_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spec_table_rows_parent_id_idx" ON "_pages_v_blocks_spec_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spec_table_order_idx" ON "_pages_v_blocks_spec_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spec_table_parent_id_idx" ON "_pages_v_blocks_spec_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spec_table_path_idx" ON "_pages_v_blocks_spec_table" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_spec_table_locales_locale_parent_id_unique" ON "_pages_v_blocks_spec_table_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stat_band_stats_order_idx" ON "_pages_v_blocks_stat_band_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stat_band_stats_parent_id_idx" ON "_pages_v_blocks_stat_band_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_stat_band_stats_locales_locale_parent_id_uni" ON "_pages_v_blocks_stat_band_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stat_band_order_idx" ON "_pages_v_blocks_stat_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stat_band_parent_id_idx" ON "_pages_v_blocks_stat_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stat_band_path_idx" ON "_pages_v_blocks_stat_band" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_stat_band_locales_locale_parent_id_unique" ON "_pages_v_blocks_stat_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_band_items_order_idx" ON "_pages_v_blocks_trust_band_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_band_items_parent_id_idx" ON "_pages_v_blocks_trust_band_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_band_items_media_idx" ON "_pages_v_blocks_trust_band_items" USING btree ("media_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_trust_band_items_locales_locale_parent_id_un" ON "_pages_v_blocks_trust_band_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_band_order_idx" ON "_pages_v_blocks_trust_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_band_parent_id_idx" ON "_pages_v_blocks_trust_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_band_path_idx" ON "_pages_v_blocks_trust_band" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_trust_band_locales_locale_parent_id_unique" ON "_pages_v_blocks_trust_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_vehicle_diagram_callouts_order_idx" ON "_pages_v_blocks_vehicle_diagram_callouts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vehicle_diagram_callouts_parent_id_idx" ON "_pages_v_blocks_vehicle_diagram_callouts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_vehicle_diagram_callouts_locales_locale_pare" ON "_pages_v_blocks_vehicle_diagram_callouts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_vehicle_diagram_order_idx" ON "_pages_v_blocks_vehicle_diagram" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vehicle_diagram_parent_id_idx" ON "_pages_v_blocks_vehicle_diagram" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_vehicle_diagram_path_idx" ON "_pages_v_blocks_vehicle_diagram" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_vehicle_diagram_diagram_idx" ON "_pages_v_blocks_vehicle_diagram" USING btree ("diagram_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_vehicle_diagram_locales_locale_parent_id_uni" ON "_pages_v_blocks_vehicle_diagram_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_tiers_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_tiers_details_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_tiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_tiers_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_spec_table_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_spec_table_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_spec_table_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_spec_table_rows_cells_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_spec_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_spec_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_spec_table_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stat_band_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stat_band_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stat_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stat_band_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_trust_band_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_trust_band_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_trust_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_trust_band_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vehicle_diagram_callouts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vehicle_diagram_callouts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vehicle_diagram" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vehicle_diagram_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_tiers_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_tiers_details_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_tiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_tiers_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_spec_table_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_spec_table_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_spec_table_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_spec_table_rows_cells_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_spec_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_spec_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_spec_table_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stat_band_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stat_band_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stat_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stat_band_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_trust_band_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_trust_band_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_trust_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_trust_band_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_vehicle_diagram_callouts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_vehicle_diagram_callouts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_vehicle_diagram" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_vehicle_diagram_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_tiers_details" CASCADE;
  DROP TABLE "pages_blocks_pricing_tiers_details_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_tiers" CASCADE;
  DROP TABLE "pages_blocks_pricing_tiers_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing" CASCADE;
  DROP TABLE "pages_blocks_pricing_locales" CASCADE;
  DROP TABLE "pages_blocks_spec_table_columns" CASCADE;
  DROP TABLE "pages_blocks_spec_table_columns_locales" CASCADE;
  DROP TABLE "pages_blocks_spec_table_rows_cells" CASCADE;
  DROP TABLE "pages_blocks_spec_table_rows_cells_locales" CASCADE;
  DROP TABLE "pages_blocks_spec_table_rows" CASCADE;
  DROP TABLE "pages_blocks_spec_table" CASCADE;
  DROP TABLE "pages_blocks_spec_table_locales" CASCADE;
  DROP TABLE "pages_blocks_stat_band_stats" CASCADE;
  DROP TABLE "pages_blocks_stat_band_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_stat_band" CASCADE;
  DROP TABLE "pages_blocks_stat_band_locales" CASCADE;
  DROP TABLE "pages_blocks_trust_band_items" CASCADE;
  DROP TABLE "pages_blocks_trust_band_items_locales" CASCADE;
  DROP TABLE "pages_blocks_trust_band" CASCADE;
  DROP TABLE "pages_blocks_trust_band_locales" CASCADE;
  DROP TABLE "pages_blocks_vehicle_diagram_callouts" CASCADE;
  DROP TABLE "pages_blocks_vehicle_diagram_callouts_locales" CASCADE;
  DROP TABLE "pages_blocks_vehicle_diagram" CASCADE;
  DROP TABLE "pages_blocks_vehicle_diagram_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_tiers_details" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_tiers_details_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_tiers" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_tiers_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_spec_table_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_spec_table_columns_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_spec_table_rows_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_spec_table_rows_cells_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_spec_table_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_spec_table" CASCADE;
  DROP TABLE "_pages_v_blocks_spec_table_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stat_band_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stat_band_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stat_band" CASCADE;
  DROP TABLE "_pages_v_blocks_stat_band_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_band_items" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_band_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_band" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_band_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_vehicle_diagram_callouts" CASCADE;
  DROP TABLE "_pages_v_blocks_vehicle_diagram_callouts_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_vehicle_diagram" CASCADE;
  DROP TABLE "_pages_v_blocks_vehicle_diagram_locales" CASCADE;
  DROP INDEX "pages_path_idx";
  DROP INDEX "_pages_v_version_version_path_idx";
  ALTER TABLE "pages" DROP COLUMN "path";
  ALTER TABLE "_pages_v" DROP COLUMN "version_path";
  DROP TYPE "public"."enum_pages_blocks_trust_band_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_trust_band_items_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_vehicle_diagram_callouts_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_trust_band_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_trust_band_items_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_vehicle_diagram_callouts_link_type";`)
}
