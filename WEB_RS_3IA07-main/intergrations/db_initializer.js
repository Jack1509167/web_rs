import clientPromise from "../src/lib/mongodb";

export default function dbInitializer() {
  return {
    name: "database_initializer",
    hooks: {
      "astro:server:setup": async ({ logger }) => {
        logger.info("Menghubungkan ke Database MongoDB...");

        try {
          await clientPromise;
          logger.info("✅Berhasil terkoneksi ke Database MongoDB.");
        } catch (e) {
          logger.error("❌Gagal terkoneksi ke Database MongoDB.");
          logger.error(e);
        }
      },
    },
  };
}
