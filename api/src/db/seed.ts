import { env } from "../config/env";
import { createUser, userExists } from "../repositories/userRepository";
import {
  seedAbout,
  seedClientLogo,
  seedFeature,
  seedPortfolioItem,
  seedProcessStep,
  seedService,
  seedSiteSettings,
  seedTestimonial,
} from "../repositories/contentRepository";
import { sampleData } from "../data/sample";

async function seed() {
  console.log("Seeding database...\n");

  const adminExists = await userExists(env.adminEmail);
  if (!adminExists) {
    await createUser(env.adminEmail, env.adminPassword, "Admin", "admin");
    console.log(`Created admin user: ${env.adminEmail}`);
  } else {
    console.log(`Skipping existing admin user: ${env.adminEmail}`);
  }

  await seedSiteSettings(sampleData.settings);
  await seedAbout(sampleData.about);

  for (const [index, service] of sampleData.services.entries()) {
    await seedService(service, index + 1);
  }

  for (const [index, item] of sampleData.portfolio.entries()) {
    await seedPortfolioItem(item, index + 1);
  }

  for (const [index, feature] of sampleData.features.entries()) {
    await seedFeature(feature, index + 1);
  }

  for (const [index, testimonial] of sampleData.testimonials.entries()) {
    await seedTestimonial(testimonial, index + 1);
  }

  for (const step of sampleData.processSteps) {
    await seedProcessStep(step);
  }

  for (const [index, logo] of sampleData.clientLogos.entries()) {
    await seedClientLogo(logo, index + 1);
  }

  console.log("\nSeed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
