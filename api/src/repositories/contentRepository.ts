import { pool } from "../config/db";
import type {
  AboutContent,
  ClientLogo,
  Feature,
  PageData,
  PortfolioItem,
  ProcessStep,
  Service,
  SiteSettings,
  Testimonial,
} from "../types";

function mapSettings(row: Record<string, unknown>): SiteSettings {
  return {
    siteName: row.site_name as string,
    tagline: (row.tagline as string) ?? "",
    heroHeadline: row.hero_headline as string,
    heroSubheading: row.hero_subheading as string,
    heroVideoUrl: (row.hero_video_url as string) ?? undefined,
    heroPosterUrl: (row.hero_poster_url as string) ?? undefined,
    logoText: row.logo_text as string,
    email: row.email as string,
    phone: (row.phone as string) ?? "",
    address: (row.address as string) ?? "",
    whatsappNumber: (row.whatsapp_number as string) ?? "",
    socialLinks: (row.social_links as SiteSettings["socialLinks"]) ?? [],
  };
}

function mapAbout(row: Record<string, unknown>): AboutContent {
  return {
    title: row.title as string,
    intro: row.intro as string,
    mission: (row.mission as string) ?? "",
    vision: (row.vision as string) ?? "",
    stats: (row.stats as AboutContent["stats"]) ?? [],
  };
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const result = await pool.query("SELECT * FROM site_settings WHERE id = 1");
  return result.rows[0] ? mapSettings(result.rows[0]) : null;
}

export async function updateSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const result = await pool.query(
    `INSERT INTO site_settings (
      id, site_name, tagline, hero_headline, hero_subheading, hero_video_url,
      hero_poster_url, logo_text, email, phone, address, whatsapp_number, social_links, updated_at
    ) VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
    ON CONFLICT (id) DO UPDATE SET
      site_name = EXCLUDED.site_name,
      tagline = EXCLUDED.tagline,
      hero_headline = EXCLUDED.hero_headline,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_video_url = EXCLUDED.hero_video_url,
      hero_poster_url = EXCLUDED.hero_poster_url,
      logo_text = EXCLUDED.logo_text,
      email = EXCLUDED.email,
      phone = EXCLUDED.phone,
      address = EXCLUDED.address,
      whatsapp_number = EXCLUDED.whatsapp_number,
      social_links = EXCLUDED.social_links,
      updated_at = NOW()
    RETURNING *`,
    [
      settings.siteName,
      settings.tagline,
      settings.heroHeadline,
      settings.heroSubheading,
      settings.heroVideoUrl ?? null,
      settings.heroPosterUrl ?? null,
      settings.logoText,
      settings.email,
      settings.phone,
      settings.address,
      settings.whatsappNumber,
      JSON.stringify(settings.socialLinks),
    ]
  );
  return mapSettings(result.rows[0]);
}

export async function getAbout(): Promise<AboutContent | null> {
  const result = await pool.query("SELECT * FROM about WHERE id = 1");
  return result.rows[0] ? mapAbout(result.rows[0]) : null;
}

export async function getServices(): Promise<Service[]> {
  const result = await pool.query(
    "SELECT id, title, slug, description, icon, sub_services FROM services ORDER BY sort_order ASC"
  );
  return result.rows.map((row) => ({
    _id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    description: row.description as string,
    icon: (row.icon as string) ?? "",
    subServices: (row.sub_services as string[]) ?? [],
  }));
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  const result = await pool.query(
    "SELECT id, title, slug, category, client, year, description, image_url FROM portfolio_items ORDER BY year DESC, sort_order ASC"
  );
  return result.rows.map((row) => ({
    _id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    category: row.category as string,
    client: (row.client as string) ?? "",
    year: (row.year as number) ?? 0,
    description: (row.description as string) ?? "",
    imageUrl: (row.image_url as string) ?? "",
  }));
}

export async function getFeatures(): Promise<Feature[]> {
  const result = await pool.query(
    "SELECT id, title, description, icon FROM features ORDER BY sort_order ASC"
  );
  return result.rows.map((row) => ({
    _id: row.id as string,
    title: row.title as string,
    description: row.description as string,
    icon: (row.icon as string) ?? "",
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const result = await pool.query(
    "SELECT id, name, company, quote, photo_url, rating FROM testimonials ORDER BY sort_order ASC"
  );
  return result.rows.map((row) => ({
    _id: row.id as string,
    name: row.name as string,
    company: (row.company as string) ?? "",
    quote: row.quote as string,
    photoUrl: (row.photo_url as string) ?? "",
    rating: (row.rating as number) ?? 5,
  }));
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const result = await pool.query(
    "SELECT id, step, title, description FROM process_steps ORDER BY step ASC"
  );
  return result.rows.map((row) => ({
    _id: row.id as string,
    step: row.step as number,
    title: row.title as string,
    description: row.description as string,
  }));
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  const result = await pool.query(
    "SELECT id, name, logo_url, url FROM client_logos ORDER BY sort_order ASC"
  );
  return result.rows.map((row) => ({
    _id: row.id as string,
    name: row.name as string,
    logoUrl: (row.logo_url as string) ?? "",
    url: (row.url as string) ?? undefined,
  }));
}

export async function getPageData(): Promise<PageData | null> {
  const [settings, about, services, portfolio, features, testimonials, processSteps, clientLogos] =
    await Promise.all([
      getSiteSettings(),
      getAbout(),
      getServices(),
      getPortfolio(),
      getFeatures(),
      getTestimonials(),
      getProcessSteps(),
      getClientLogos(),
    ]);

  if (!settings || !about) return null;

  return {
    settings,
    about,
    services,
    portfolio,
    features,
    testimonials,
    processSteps,
    clientLogos,
  };
}

export async function seedSiteSettings(settings: SiteSettings): Promise<void> {
  const existing = await pool.query("SELECT 1 FROM site_settings WHERE id = 1");
  if (existing.rowCount && existing.rowCount > 0) {
    console.log("Skipping existing site_settings");
    return;
  }
  await updateSiteSettings(settings);
  console.log("Created site_settings");
}

export async function seedAbout(about: AboutContent): Promise<void> {
  const existing = await pool.query("SELECT 1 FROM about WHERE id = 1");
  if (existing.rowCount && existing.rowCount > 0) {
    console.log("Skipping existing about");
    return;
  }
  await pool.query(
    `INSERT INTO about (id, title, intro, mission, vision, stats)
     VALUES (1, $1, $2, $3, $4, $5)`,
    [about.title, about.intro, about.mission, about.vision, JSON.stringify(about.stats)]
  );
  console.log("Created about");
}

export async function seedService(service: Service, sortOrder: number): Promise<void> {
  const existing = await pool.query("SELECT 1 FROM services WHERE slug = $1", [service.slug]);
  if (existing.rowCount && existing.rowCount > 0) {
    console.log(`Skipping existing service: ${service.slug}`);
    return;
  }
  await pool.query(
    `INSERT INTO services (title, slug, description, icon, sub_services, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [service.title, service.slug, service.description, service.icon, JSON.stringify(service.subServices), sortOrder]
  );
  console.log(`Created service: ${service.slug}`);
}

export async function seedPortfolioItem(item: PortfolioItem, sortOrder: number): Promise<void> {
  const existing = await pool.query("SELECT 1 FROM portfolio_items WHERE slug = $1", [item.slug]);
  if (existing.rowCount && existing.rowCount > 0) {
    console.log(`Skipping existing portfolio: ${item.slug}`);
    return;
  }
  await pool.query(
    `INSERT INTO portfolio_items (title, slug, category, client, year, description, image_url, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [item.title, item.slug, item.category, item.client, item.year, item.description, item.imageUrl, sortOrder]
  );
  console.log(`Created portfolio: ${item.slug}`);
}

export async function seedFeature(feature: Feature, sortOrder: number): Promise<void> {
  const existing = await pool.query("SELECT 1 FROM features WHERE title = $1", [feature.title]);
  if (existing.rowCount && existing.rowCount > 0) {
    console.log(`Skipping existing feature: ${feature.title}`);
    return;
  }
  await pool.query(
    `INSERT INTO features (title, description, icon, sort_order) VALUES ($1, $2, $3, $4)`,
    [feature.title, feature.description, feature.icon, sortOrder]
  );
  console.log(`Created feature: ${feature.title}`);
}

export async function seedTestimonial(testimonial: Testimonial, sortOrder: number): Promise<void> {
  const existing = await pool.query("SELECT 1 FROM testimonials WHERE name = $1", [testimonial.name]);
  if (existing.rowCount && existing.rowCount > 0) {
    console.log(`Skipping existing testimonial: ${testimonial.name}`);
    return;
  }
  await pool.query(
    `INSERT INTO testimonials (name, company, quote, photo_url, rating, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [testimonial.name, testimonial.company, testimonial.quote, testimonial.photoUrl, testimonial.rating, sortOrder]
  );
  console.log(`Created testimonial: ${testimonial.name}`);
}

export async function seedProcessStep(step: ProcessStep): Promise<void> {
  const existing = await pool.query("SELECT 1 FROM process_steps WHERE step = $1", [step.step]);
  if (existing.rowCount && existing.rowCount > 0) {
    console.log(`Skipping existing process step: ${step.step}`);
    return;
  }
  await pool.query(
    `INSERT INTO process_steps (step, title, description) VALUES ($1, $2, $3)`,
    [step.step, step.title, step.description]
  );
  console.log(`Created process step: ${step.step}`);
}

export async function seedClientLogo(logo: ClientLogo, sortOrder: number): Promise<void> {
  const existing = await pool.query("SELECT 1 FROM client_logos WHERE name = $1", [logo.name]);
  if (existing.rowCount && existing.rowCount > 0) {
    console.log(`Skipping existing client logo: ${logo.name}`);
    return;
  }
  await pool.query(
    `INSERT INTO client_logos (name, logo_url, url, sort_order) VALUES ($1, $2, $3, $4)`,
    [logo.name, logo.logoUrl, logo.url ?? null, sortOrder]
  );
  console.log(`Created client logo: ${logo.name}`);
}
