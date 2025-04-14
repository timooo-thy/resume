"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AWARDS,
  EDUCATIONS,
  EXPERIENCES,
  PROJECTS,
  SKILLS,
} from "@/lib/constants";
import { TypewriterEffect } from "@/components/type-writer";
import { Cover } from "@/components/cover";
import { AuroraBackground } from "@/components/aurora-background";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-4 sm:px-6 space-y-24">
      <section className="w-full">
        <AuroraBackground className="h-[24rem] lg:h-[40rem] mx-[-4rem]">
          <TypewriterEffect
            words={[
              {
                text: "Hello!",
                className:
                  "text-3xl relative z-20 md:text-4xl lg:text-6xl font-bold text-center text-black dark:text-white tracking-wide",
              },
              {
                text: "I'm",
                className:
                  "text-3xl relative z-20 md:text-4xl lg:text-6xl font-bold text-center text-black dark:text-white tracking-wide",
              },
              {
                text: "Timothy",
                className:
                  "text-3xl relative z-20 md:text-4xl lg:text-6xl font-bold text-center text-black dark:text-white tracking-wide ",
              },
              {
                text: "Lee!",
                className:
                  "text-3xl relative z-20 md:text-4xl lg:text-6xl font-bold text-center text-black dark:text-white tracking-wide ",
              },
            ]}
            className="pb-4"
          />
          <Cover className="md:text-xl lg:text-3xl text-muted-foreground">
            Aspiring AI Software Engineer
          </Cover>
        </AuroraBackground>
      </section>

      <section id="education" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block group">
              <span className="relative z-10">Education</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform transition-all duration-300 group-hover:h-2"></span>
              <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-blue-500/20 dark:bg-blue-400/20 blur-sm rounded-full"></span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 max-w-4xl">
            {EDUCATIONS.map((education, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start flex-col sm:flex-row gap-2">
                      <div>
                        <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                          {education.degree}
                        </CardTitle>
                        <CardDescription className="text-md mt-1 font-medium text-gray-700 dark:text-gray-300">
                          {education.school}
                        </CardDescription>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                        {education.year}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      {education.gpa}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {education.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="experiences" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block group">
              <span className="relative z-10">Experience</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transform transition-all duration-300 group-hover:h-2"></span>
              <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-green-500/20 dark:bg-green-400/20 blur-sm rounded-full"></span>
            </h2>
          </motion.div>

          <div className="space-y-8 max-w-4xl">
            {EXPERIENCES.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start flex-col sm:flex-row gap-2">
                      <div>
                        <CardTitle className="text-xl font-bold">
                          {experience.role}
                        </CardTitle>
                        <CardDescription className="text-md font-medium">
                          {experience.company}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="px-3 py-1">
                        {experience.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                      {experience.responsibilities.map((resp, respIndex) => (
                        <li key={respIndex}>{resp}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block group">
              <span className="relative z-10">Projects</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform transition-all duration-300 group-hover:h-2"></span>
              <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-purple-500/20 dark:bg-purple-400/20 blur-sm rounded-full"></span>
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="h-full"
              >
                <Link href={project.url} target="_blank">
                  <Card className="h-full flex flex-col border-none shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
                    <CardHeader className="relative z-10">
                      <CardTitle className="text-xl font-bold">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto relative z-10">
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="bg-gray-100 dark:bg-gray-800"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block group">
              <span className="relative z-10">Skills</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transform transition-all duration-300 group-hover:h-2"></span>
              <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-yellow-500/20 dark:bg-yellow-400/20 blur-sm rounded-full"></span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-50 to-white/80 dark:from-gray-900 dark:to-gray-900/80 p-8 rounded-xl shadow-md backdrop-blur-sm max-w-4xl"
          >
            <div className="flex flex-wrap gap-3">
              {SKILLS.map((skill, index) => {
                // Generate a unique color for each skill badge
                const colors = [
                  "from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900/40 dark:to-blue-800/60 dark:text-blue-200",
                  "from-green-100 to-green-200 text-green-800 dark:from-green-900/40 dark:to-green-800/60 dark:text-green-200",
                  "from-purple-100 to-purple-200 text-purple-800 dark:from-purple-900/40 dark:to-purple-800/60 dark:text-purple-200",
                  "from-yellow-100 to-yellow-200 text-yellow-800 dark:from-yellow-900/40 dark:to-yellow-800/60 dark:text-yellow-200",
                  "from-red-100 to-red-200 text-red-800 dark:from-red-900/40 dark:to-red-800/60 dark:text-red-200",
                  "from-indigo-100 to-indigo-200 text-indigo-800 dark:from-indigo-900/40 dark:to-indigo-800/60 dark:text-indigo-200",
                  "from-teal-100 to-teal-200 text-teal-800 dark:from-teal-900/40 dark:to-teal-800/60 dark:text-teal-200",
                  "from-pink-100 to-pink-200 text-pink-800 dark:from-pink-900/40 dark:to-pink-800/60 dark:text-pink-200",
                  "from-orange-100 to-orange-200 text-orange-800 dark:from-orange-900/40 dark:to-orange-800/60 dark:text-orange-200",
                  "from-cyan-100 to-cyan-200 text-cyan-800 dark:from-cyan-900/40 dark:to-cyan-800/60 dark:text-cyan-200",
                ];
                const colorClass = colors[index % colors.length];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="relative"
                  >
                    <Badge
                      className={`
                      px-4 py-2.5 
                      text-sm font-medium 
                      bg-gradient-to-r ${colorClass}
                      border border-white/20 dark:border-gray-700/50
                      shadow-sm 
                      hover:shadow-md 
                      transition-all duration-300
                      rounded-lg
                    `}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="awards" className="scroll-mt-20 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block group">
              <span className="relative z-10">Awards</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-full transform transition-all duration-300 group-hover:h-2"></span>
              <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-amber-500/20 dark:bg-amber-400/20 blur-sm rounded-full"></span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50/80 to-orange-50/70 dark:from-gray-900/80 dark:to-gray-800/70 p-6 rounded-xl shadow-md backdrop-blur-sm max-w-4xl"
          >
            <div className="flex flex-wrap gap-3">
              {AWARDS.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Badge
                    className="px-4 py-2 
                      text-sm font-medium 
                      bg-gradient-to-r from-amber-100 to-orange-100 
                      text-amber-800 dark:from-amber-900/40 dark:to-orange-800/50 
                      dark:text-amber-200
                      border border-amber-200/30 dark:border-amber-700/40
                      shadow-sm hover:shadow
                      transition-all duration-300
                      rounded-lg flex items-center gap-2"
                  >
                    <span className="text-amber-500 dark:text-amber-400">
                      🏆
                    </span>
                    {award}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
