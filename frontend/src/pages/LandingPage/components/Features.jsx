import React from "react";
import { motion } from "framer-motion";
import { employerFeatures, jobSeekerFeatures } from "../../../utils/data";

const Features = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold">
            Everything you need
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            Tools Built for Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Career
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Whether you're searching for your next opportunity or hiring great
            talent, our platform gives you the tools to move faster.
          </p>
        </motion.div>

        {/* Feature Columns */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">

          {/* Job Seekers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl p-7 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <span className="text-white text-xl font-bold">JS</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  For Job Seekers
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Find opportunities that match your skills
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {jobSeekerFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-blue-50/60 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">
                      {feature.title}
                    </h4>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Employers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl p-7 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-200">
                <span className="text-white text-xl font-bold">ER</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  For Employers
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Find and hire the right talent
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {employerFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-purple-100 hover:bg-purple-50/60 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                    <feature.icon className="w-5 h-5 text-purple-600" />
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">
                      {feature.title}
                    </h4>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Features;