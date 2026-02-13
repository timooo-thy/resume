"use client";

import { Badge } from "@/components/ui/badge";
import {
  AWARDS,
  CONTACT_LINKS,
  EDUCATIONS,
  EXPERIENCES,
  PROJECTS,
  SKILLS,
} from "@/lib/resume-constants";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactIcons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-16 md:mb-24 text-center ${className}`}
    >
      {children}
    </motion.h2>
  );
}

import Image from "next/image";
import { CurrentYear } from "@/components/current-year";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden bg-noise">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20">
        <div className="absolute inset-0 bg-grid-pattern -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] md:leading-[0.85] tracking-tight mb-8">
            Timothy Lee.
            <br />
            <span className="text-muted-foreground/80">
              Aspiring ML Engineer.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mt-8">
            I enjoy solving complex problems and I specialise in building
            scalable applications and machine learning models.
          </p>

          <div className="flex flex-wrap gap-4 mt-12">
            <Button asChild size="lg" className="rounded-full px-8 text-base">
              <Link href="/#projects">View Projects</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-base bg-transparent border-foreground/20 hover:bg-foreground/5"
            >
              <Link href="/#contact">Contact Me</Link>
            </Button>
          </div>
        </motion.div>

        {/* Decorative Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-4 md:left-8 flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/50"
        >
          <span className="h-px w-12 bg-muted-foreground/50" />
          Scroll to explore
        </motion.div>
      </section>

      <div className="px-4 sm:px-6 lg:px-8 space-y-32 md:space-y-48 pb-32 max-w-7xl mx-auto">
        {/* ═══════════ EXPERIENCE (Timeline) ═══════════ */}
        <section id="experiences" className="scroll-mt-32 max-w-5xl mx-auto">
          <SectionHeading>Experience</SectionHeading>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

            <div className="space-y-16">
              {EXPERIENCES.map((experience, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: isLeft ? -32 : 32,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-8 z-10 bg-background p-1">
                      <div className="h-2 w-2 rounded-full bg-foreground" />
                    </div>

                    {/* Content container */}
                    <div
                      className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                        isLeft
                          ? "md:mr-auto md:text-right"
                          : "md:ml-auto md:text-left"
                      }`}
                    >
                      <div
                        className={`flex flex-col gap-2 ${isLeft ? "md:items-end" : "md:items-start"}`}
                      >
                        <h3 className="text-2xl font-display">
                          {experience.role}
                        </h3>
                        <div
                          className={`flex flex-col ${isLeft ? "md:items-end" : "md:items-start"}`}
                        >
                          <span className="text-lg font-medium">
                            {experience.company}
                          </span>
                          <span className="text-sm text-muted-foreground font-mono uppercase tracking-wider">
                            {experience.period}
                          </span>
                        </div>

                        <div
                          className={`mt-4 p-6 bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl hover:bg-card/80 transition-colors duration-300 text-left ${isLeft ? "" : ""}`}
                        >
                          <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed list-disc pl-4 marker:text-primary/50">
                            {experience.responsibilities.map((resp, i) => (
                              <li key={i}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ PROJECTS ═══════════ */}
        <section id="projects" className="scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <SectionHeading className="mb-0 text-left">
              Selected Works
            </SectionHeading>
            <Link
              href="https://github.com/timooo-thy"
              target="_blank"
              className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2"
            >
              View all on GitHub <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {PROJECTS.map((project, index) => {
              // @ts-ignore
              const projectImage = project.image;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex flex-col h-full"
                >
                  <Link
                    href={project.url}
                    target="_blank"
                    className="block h-full"
                  >
                    <div className="bg-muted/30 aspect-video rounded-lg mb-6 overflow-hidden border border-border/40 relative">
                      {projectImage ? (
                        <>
                          <Image
                            src={projectImage}
                            alt={project.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      )}

                      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 z-10">
                        Visit Project
                      </div>

                      {!projectImage && (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/20 font-display text-9xl select-none">
                          {index + 1}
                        </div>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-3xl font-display group-hover:underline decoration-1 underline-offset-4">
                        {project.name}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                    </div>

                    <p className="text-muted-foreground mt-3 mb-6 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.technologies.map((tech, tIndex) => (
                        <Badge
                          key={tIndex}
                          variant="secondary"
                          className="bg-muted/50 font-normal"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="md:hidden mt-12 text-center">
            <Link
              href="https://github.com/timooothy"
              target="_blank"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              View all on GitHub <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ═══════════ EDUCATION ═══════════ */}
        <section id="education" className="scroll-mt-32">
          <SectionHeading className="text-left">Education</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8">
            {EDUCATIONS.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-border/40 p-8 rounded-2xl bg-card/20 hover:bg-card/40 transition-colors flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <h3 className="text-2xl font-display leading-tight">
                      {edu.school}
                    </h3>
                    <Badge
                      variant="outline"
                      className="font-mono whitespace-nowrap shrink-0"
                    >
                      {edu.year}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground font-medium mb-4">
                    {edu.degree}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground/80 text-sm leading-relaxed mb-4">
                    {edu.description}
                  </p>
                  <div className="font-medium text-sm text-primary">
                    GPA: {edu.gpa.split(": ")[1]}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════ SKILLS & AWARDS ═══════════ */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-32">
          <section id="skills" className="scroll-mt-32">
            <SectionHeading className="text-left">Skills</SectionHeading>
            <div className="space-y-10">
              {Object.entries(SKILLS).map(([category, skills], i) => (
                <div key={i}>
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6 border-b border-border/40 pb-2">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, sIndex) => (
                      <span
                        key={sIndex}
                        className="px-4 py-2 bg-muted/30 border border-border/30 rounded-full text-sm hover:bg-muted/50 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="awards" className="scroll-mt-32">
            <SectionHeading className="text-left">Recognition</SectionHeading>
            <ul className="space-y-6">
              {AWARDS.map((award, i) => (
                <li
                  key={i}
                  className="flex items-start gap-6 py-4 border-b border-border/40 last:border-0 group"
                >
                  <span className="font-display text-muted-foreground/30 text-2xl group-hover:text-primary/50 transition-colors">
                    {i > 8 ? i+1 : `0${i + 1}`}
                  </span>
                  <span className="text-lg pt-1 group-hover:text-foreground/80 transition-colors">
                    {award}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ═══════════ CONTACT ═══════════ */}
        <section id="contact" className="scroll-mt-32 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-10"
          >
            <h2 className="font-display text-6xl md:text-8xl">
              Let&apos;s work together.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              I&apos;m currently open to new opportunities in Machine Learning
              and Software Engineering.
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-8">
              {CONTACT_LINKS.map((link) => {
                const Icon = contactIcons[link.icon];
                return (
                  <Button
                    key={link.label}
                    asChild
                    variant="outline"
                    className="h-14 px-8 gap-3 rounded-full text-lg border-foreground/10 hover:border-foreground/30 transition-all"
                  >
                    <Link href={link.href} target="_blank">
                      <Icon className="h-5 w-5" /> {link.label}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </motion.div>

          <footer className="mt-40 text-sm text-muted-foreground/40 font-mono">
          
            <p>&copy; <CurrentYear /> Timothy Lee.</p>
          </footer>
        </section>
      </div>
    </main>
  );
}
