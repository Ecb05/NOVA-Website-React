import * as motion from "motion/react-client";
import TeamEditorialCard from "./TeamEditorialCard";

export default function PortfolioSlide({ portfolio }) {
  return (
    <motion.section
      className={`
        relative
        min-h-screen
        w-full
        snap-start
        px-6
        ${portfolio.bg}
        flex flex-col
        items-center
        justify-center
        gap-5
      `}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.6 }}
      variants={containerVariants}
    >
      {/* Horizontal Marquee */}
      <div className=" top-8 left-0 w-full overflow-hidden pointer-events-none">
        <motion.div
          className="whitespace-nowrap text-3xl md:text-6xl font-bold opacity-15"
          style={{ color: portfolio.accent }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear",
          }}
        >
          {portfolio.marquee} &nbsp; {portfolio.marquee} &nbsp; {portfolio.marquee}
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <div
        className="
          relative z-10
          w-full max-w-7xl
          flex flex-col gap-8 
        "
      >
        {/* TEAM EDITORIAL ROW */}
        <motion.div
          className="
            flex flex-col gap-8
            md:flex-row md:gap-10 md:flex-wrap
            justify-centerk

          "
          variants={rowVariants}
        >
          {portfolio.team.map((person) => (
            <TeamEditorialCard
              key={person.id}
              person={person}
              accent={portfolio.accent}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ================= ANIMATION VARIANTS ================= */

const containerVariants = {
  offscreen: { opacity: 0 },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const rowVariants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};
