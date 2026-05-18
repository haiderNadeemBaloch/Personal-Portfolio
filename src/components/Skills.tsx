'use client';

import { motion } from 'framer-motion';

interface Skill {
  name: string;
  category: string;
  level: number; // 1-5
}

const skills: Skill[] = [
  { name: 'Next.js', category: 'Framework', level: 5 },
  { name: 'React', category: 'Library', level: 5 },
  { name: 'TypeScript', category: 'Language', level: 5 },
  { name: 'Tailwind CSS', category: 'Styling', level: 5 },
  { name: 'Framer Motion', category: 'Animation', level: 4 },
  { name: 'Three.js', category: '3D', level: 4 },
  { name: 'Node.js', category: 'Backend', level: 4 },
  { name: 'Git', category: 'Tools', level: 5 },
  { name: 'Jest', category: 'Testing', level: 4 },
  { name: 'Playwright', category: 'Testing', level: 3 },
  { name: 'Prisma', category: 'Database', level: 4 },
  { name: 'PostgreSQL', category: 'Database', level: 3 },
];

const categories = Array.from(new Set(skills.map((s) => s.category)));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Skills() {
  return (
    <section
      id="skills"
      className="bg-gray-50 py-20 dark:bg-gray-900"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          id="skills-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center font-heading text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl"
        >
          Skills & Technologies
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => {
            const categorySkills = skills.filter(
              (s) => s.category === category
            );
            return (
              <motion.div
                key={category}
                variants={itemVariants}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
              >
                <h3 className="mb-4 font-heading text-xl font-semibold text-gray-900 dark:text-white">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {categorySkills.map((skill) => (
                    <li key={skill.name}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {skill.level}/5
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
